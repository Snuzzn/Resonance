import { makeStyles } from "@material-ui/core";
import Sidebar from "./Sidebar";
import React from "react";
import useMediaQuery from "../util/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";
import { Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  page: {
    padding: theme.spacing(3),
    // background: "#2A3957",
    width: "100%",
    height: "100vh",
  },
  menuIcon: {
    "&:hover": {
      color: "#B7B7B7",
      cursor: "pointer",
    },
  },
  root: { display: "flex" },
}));
export default function Layout({ children }) {
  const classes = useStyles();
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  console.log(isMenuVisible);
  const isMobile = useMediaQuery("(max-width: 800px)");
  return (
    <div className={classes.root}>
      <Sidebar
        isMenuVisible={isMenuVisible}
        setIsMenuVisible={setIsMenuVisible}
      />
      <div className={classes.page}>
        {isMobile && (
          <MenuIcon
            className={classes.menuIcon}
            onClick={() => setIsMenuVisible(!isMenuVisible)}
          />
        )}
        {children}
      </div>
    </div>
  );
}
