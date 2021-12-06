import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const PAGE_SIZE = 20;

const Pagination = ({ page, total, setPage }) => {
  const classes = useStyles();
  const pageFirstNumber = (page - 1) * PAGE_SIZE + 1;
  const pageLastNumber = Math.min(pageFirstNumber + PAGE_SIZE - 1, total);
  const lastPage = Math.ceil(total / PAGE_SIZE);

  return (
    <div className={classes.container}>
      <span
        onClick={() => setPage(1)}
        className={page === 1 ? "disabled" : undefined}
      >
        First
      </span>
      <span
        onClick={() => page > 1 && setPage(page - 1)}
        className={page === 1 ? "disabled" : undefined}
      >
        Previos
      </span>
      <div className={classes.pageNumbers}>
        {pageFirstNumber} - {pageLastNumber}
      </div>
      <span
        onClick={() => page <= lastPage && setPage(page + 1)}
        className={page >= lastPage ? "disabled" : undefined}
      >
        Next
      </span>
      <span
        onClick={() => setPage(lastPage)}
        className={page >= lastPage ? "disabled" : undefined}
      >
        Last
      </span>
    </div>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginTop: 10,
      display: "flex",
      margin: "auto",
      alignItems: "center",
      columnGap: 10,
      "& > span": {
        cursor: "pointer",
        color: "#58a6ff",
        fontSize: 14,
        fontWeight: 600,
        "&:hover": {
          textDecoration: "underline",
        },
        "&.disabled": {
          cursor: "not-allowed",
          color: "#58a6ffaa",
        },
      },
    },
    pageNumbers: {
      padding: "0 10px",
      color: "#FFFFFF",
    },
  })
);

export default Pagination;
