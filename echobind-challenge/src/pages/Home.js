import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { ChevronDown, ChevronUp, Circle } from "react-feather";

import Spinner from "components/Spinner";
import Pagination from "components/Pagination";

const getLocations = gql`
  query getLocations($page: Int) {
    locations(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        type
        residents {
          id
          name
          status
          image
        }
      }
    }
  }
`;

const HomePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState(null);

  const { loading, error, data } = useQuery(getLocations, {
    variables: { page },
  });

  const handleOpenContent = (id) => {
    if (id === openId) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  if (loading) return <Spinner />;
  if (error) return `Error! ${error.message}`;

  return (
    <div className={classes.container}>
      {data.locations.results.map((item) => (
        <div className={classes.location} key={item.id}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gridColumnGap={8}
            className="cursor-pointer"
            onClick={() => handleOpenContent(item.id)}
          >
            <div className={classes.id}>{item.id}</div>
            <div className={classes.name}>
              {item.name} <span>{item.type}</span>
            </div>
            {openId === item.id ? (
              <ChevronUp cursor="pointer" color="rgb(240, 246, 252)" />
            ) : (
              <ChevronDown cursor="pointer" color="rgb(240, 246, 252)" />
            )}
          </Box>
          {openId === item.id && (
            <div className={classes.residents}>
              {item.residents.map((resident) => (
                <div
                  className={classes.resident}
                  key={resident.id}
                  onClick={() => history.push(`/resident/${resident.id}`)}
                >
                  <img src={resident.image} alt="resident" />
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    gridRowGap={16}
                    pr={1}
                  >
                    <span>{resident.name}</span>
                    <Box display="flex" alignItems="center" gridColumnGap={4}>
                      <Circle
                        size={10}
                        fill={resident.status === "Alive" ? "green" : "red"}
                        color="none"
                      />
                      <span>{resident.status}</span>
                    </Box>
                  </Box>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <Box display="flex" justifyContent="center" mb={3}>
        <Pagination
          page={page}
          total={data.locations.info.count}
          setPage={setPage}
        />
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      rowGap: 8,
    },
    location: {
      border: "1px solid #30363d",
      borderRadius: 6,
      padding: "8px 16px",
      display: "flex",
      flexDirection: "column",
      rowGap: 30,
    },
    id: {
      width: 36,
      display: "flex",
      alignItems: "center",
      fontSize: 16,
      color: "rgb(240, 246, 252)",
      [theme.breakpoints.down("xs")]: {
        width: 24,
      },
    },
    name: {
      color: "#58a6ff",
      fontSize: 20,
      marginRight: 16,
      width: "100%",
      "& > span": {
        fontSize: 16,
        color: "rgb(240, 246, 252)",
      },
    },
    residents: {
      display: "grid",
      gap: 8,
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    },
    resident: {
      display: "flex",
      columnGap: 8,
      width: "100%",
      height: 100,
      background: "rgb(60, 62, 68)",
      borderRadius: 8,
      boxShadow:
        "rgb(0 0 0 / 10%) 0px 4px 6px -1px, rgb(0 0 0 / 6%) 0px 2px 4px -1px",
      cursor: "pointer",
      color: "rgb(240, 246, 252)",
      "&:hover": {
        background: "rgba(60, 62, 68, 0.8)",
      },
      "& > img": {
        width: 100,
        height: 100,
        borderRadius: "8px 0 0 8px",
      },
    },
  })
);

export default HomePage;
