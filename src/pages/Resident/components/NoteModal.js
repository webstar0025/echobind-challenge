import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import Modal from "components/Modal";

const NoteModal = ({ isModalOpen, closeModal, onSubmit }) => {
  const classes = useStyles();
  const [note, setNote] = useState("");

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} title="Add a note">
      <form onSubmit={(e) => onSubmit(e, note)}>
        <textarea
          name="note"
          className={classes.textarea}
          rows={6}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button className={classes.button} type="submit">
          Submit
        </button>
      </form>
    </Modal>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    textarea: {
      padding: 8,
      borderRadius: 5,
      fontSize: 20,
      width: "100%",
    },
    button: {
      marginLeft: "auto",
      marginTop: 20,
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

export default NoteModal;
