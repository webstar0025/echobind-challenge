import React from "react";
import Modal from "react-modal";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { XCircle } from "react-feather";

Modal.setAppElement("#root");

const EnhancedModal = ({ isModalOpen, closeModal, children, title = "" }) => {
  const classes = useStyles();

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      className={classes.modal}
      overlayClassName={classes.overlay}
      contentLabel="Modal"
    >
      <div className={classes.header}>
        <h2>{title}</h2>
        <XCircle
          size={24}
          color="#787878"
          cursor="pointer"
          onClick={closeModal}
        />
      </div>
      {children}
    </Modal>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      borderRadius: 5,
      width: "calc(100% - 40px)",
      maxWidth: 520,
      background: "#fefefe",
      padding: 30,
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.2)",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      columnGap: 10,
      paddingBottom: 10,
      marginBottom: 20,
      color: "#55a0ee",
    },
  })
);

export default EnhancedModal;
