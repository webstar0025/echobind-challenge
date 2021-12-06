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
        height: "calc(100% - 50px)",
      },
    },
    mainContent: {
      margin: "auto",
      width: "100%",
      height: "100%",
      maxWidth: "calc(1040px + 240px)",
      padding: "0 120px",
      [theme.breakpoints.down("sm")]: {
        padding: "0 60px",
      },
      [theme.breakpoints.down("xs")]: {
        padding: "0 20px",
        height: "calc(100% - 50px)",
      },
    },
    header: {
      margin: "auto",
      width: "100%",
      maxWidth: "calc(1200px + 200px)",
      height: 90,
      padding: "0 100px",
      display: "flex",
      alignItems: "center",
      fontSize: 32,
      fontWeight: "bold",
      color: "rgb(240, 246, 252)",
      [theme.breakpoints.down("sm")]: {
        padding: "0 40px",
      },
      [theme.breakpoints.down("xs")]: {
        padding: "0 12px",
        height: 50,
      },
    },
  })
);

export default Layout;