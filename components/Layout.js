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
export default function Layout({ children, darkMode, setDarkMode, topics }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} topics={topics} />
      <div className={classes.page}>{children}</div>
    </div>
  );
}
