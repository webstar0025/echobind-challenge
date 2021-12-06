import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import MoonLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/react";
import { ArrowDown, ArrowUp } from "react-feather";

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
        }
      }
    }
  }
`;

const HomePage = () => {
  const classes = useStyles();
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

  if (loading)
    return (
      <div className={classes.spinnerContainer}>
        <MoonLoader
          css={override}
          size={100}
          color={"#58a6ff"}
          loading={loading}
          speedMultiplier={1}
        />
      </div>
    );
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <div className={classes.container}>
        {data.locations.results.map((item) => (
          <div key={item.id}>
            <Box
              className="cursor-pointer"
              display="flex"
              flexDirection="column"
              gridRowGap={10}
              flex={1}
              onClick={() => handleOpenContent(item.id)}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gridColumnGap={20}
              >
                <Box
                  flex={1}
                  display="flex"
                  alignItems="center"
                  gridColumnGap={20}
                >
                  <sapn>{item.id}</sapn>
                  <span>Name: {item.name}</span>
                  <span>Type: {item.type}</span>
                </Box>
                {openId === item.id ? <ArrowUp /> : <ArrowDown />}
              </Box>
              {openId === item.id && (
                <Box display="flex" flexDirection="column" gridRowGap={4}>
                  {item.residents.map((resident) => (
                    <div key={resident.id}>{resident.name}</div>
                  ))}
                </Box>
              )}
            </Box>
          </div>
        ))}
      </div>
      <Pagination
        page={page}
        total={data.locations.info.count}
        setPage={setPage}
      />
    </div>
  );
};

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      marginLeft: -20,
      marginRight: -20,
      borderBottom: "1px solid #728385",
      "& > div": {
        padding: "10px 20px",
        display: "flex",
        columnGap: 20,
        transition: "all 0.3s ease-in-out",
        "&:nth-child(odd)": {
          background: "#F4F7F8",
        },
        "&:nth-child(even)": {
          background: "#ffffff",
        },
      },
    },
    spinnerContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      rowGap: 8,
      height: "100%",
    },
  })
);

export default HomePage;
