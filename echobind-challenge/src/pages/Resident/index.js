import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Circle, ArrowLeft } from "react-feather";

import Spinner from "components/Spinner";
import NoteModal from "./components/NoteModal";

const getResident = gql`
  query getResident($id: ID!) {
    character(id: $id) {
      name
      status
      species
      gender
      image
      location {
        name
      }
    }
  }
`;

const ResidentPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { loading, error, data } = useQuery(getResident, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return `Error! ${error.message}`;

  const addNote = (e, note) => {
    e.preventDefault();
    if (note) {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          note: note,
          residentId: id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setIsModalOpen(false);
          alert(
            `Add a note.
            ${JSON.stringify(json)}`
          );
        });
    }
  };

  const { name, status, species, image, location } = data.character;

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        gridColumnGap={4}
        pt={8}
        pb={2}
        className="cursor-pointer"
        onClick={() => history.push("/")}
      >
        <ArrowLeft /> Back
      </Box>
      <div className={classes.container}>
        <img src={image} className={classes.avatar} alt="resident" />
        <div>
          <Box display="flex" flexDirection="column" gridRowGap={40}>
            <div className={classes.detailsContent}>
              <span className={classes.label}>Name:</span>
              <span className={classes.value}>{name}</span>
            </div>
            <div className={classes.detailsContent}>
              <span className={classes.label}>Location:</span>
              <span className={classes.value}>{location.name}</span>
            </div>
            <div className={classes.detailsContent}>
              <Circle
                size={10}
                fill={status === "Alive" ? "green" : "red"}
                color="none"
              />
              <span className={classes.value}>
                {status} - {species}
              </span>
            </div>
            <button
              className={classes.button}
              onClick={() => setIsModalOpen(true)}
            >
              Add a note
            </button>
          </Box>
        </div>
        {isModalOpen && (
          <NoteModal
            isModalOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            onSubmit={addNote}
          />
        )}
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      width: "100%",
      columnGap: 50,
      rowGap: 50,
      color: "rgb(240, 246, 252)",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    avatar: {
      width: 220,
      height: 220,
      borderRadius: 8,
      [theme.breakpoints.down("xs")]: {
        margin: "auto",
      },
    },
    detailsContent: {
      display: "flex",
      alignItems: "center",
      columnGap: 4,
    },
    label: {
      fontSize: 16,
    },
    value: {
      fontSize: 22,
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 30px",
      height: 42,
      background: "#55a0ee",
      border: "none",
      borderRadius: 4,
      color: "rgb(240, 246, 252)",
      fontSize: 20,
      cursor: "pointer",
      "&:hover": {
        background: "#58a6ff",
      },
    },
  })
);

export default ResidentPage;
