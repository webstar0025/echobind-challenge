import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import MoonLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/react";

const Spinner = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <MoonLoader
        css={override}
        size={100}
        color={"#58a6ff"}
        loading={true}
        speedMultiplier={1}
      />
    </div>
  );
};

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const useStyles = makeStyles(() =>
  createStyles({
    container: {
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

export default Spinner;
