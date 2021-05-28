import { makeStyles } from "@material-ui/core";
import Sidebar from "./Sidebar";
import React from "react";

const useStyles = makeStyles((theme) => ({
  page: {
    padding: theme.spacing(3),
    // background: "#2A3957",
    width: "100%",
    height: "100vh",
  },
  root: { display: "flex" },
}));
export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Sidebar />
      <div className={classes.page}>{children}</div>
    </div>
  );
}
