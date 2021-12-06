import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.header}>Rick & Morty</div>
      <div className={classes.content}>
        <div className={classes.mainContent}>{children}</div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      width: "100%",
      height: "100vh",
      overflow: "hidden",
    },
    content: {
      overflow: "auto",
      height: "calc(100% - 90px)",
      [theme.breakpoints.down("xs")]: {
        height: "calc(100% - 70px)",
      },
    },
    mainContent: {
      margin: "auto",
      width: "100%",
      height: "100%",
      maxWidth: "calc(860px + 240px)",
      padding: "0 120px",
      [theme.breakpoints.down("sm")]: {
        padding: "0 60px",
      },
      [theme.breakpoints.down("xs")]: {
        padding: "0 20px",
      },
      "&::-webkit-scrollbar": {
        width: 12,
        background: "#fefefe",
        border: "1px solid #c3c6c7",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: 5,
        background: "#c3c6c7",
        "&:hover": {
          background: "#728385",
        },
      },
    },
    header: {
      margin: "auto",
      width: "100%",
      maxWidth: "calc(860px + 240px)",
      height: 90,
      padding: "0 120px",
      display: "flex",
      alignItems: "center",
      fontSize: 32,
      fontWeight: "bold",
      color: "rgb(240, 246, 252)",
      [theme.breakpoints.down("sm")]: {
        padding: "0 60px",
      },
      [theme.breakpoints.down("xs")]: {
        padding: "0 20px",
        height: 70,
      },
    },
  })
);

export default Layout;
