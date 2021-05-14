import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  AppBar,
  Toolbar,
  Drawer,
  Divider,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  Collapse,
  Paper,
  IconButton,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import { Palette } from "@material-ui/icons";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import { createMuiTheme } from "@material-ui/core/styles";
import { RiBookmark3Fill } from "react-icons/ri";
import { useRouter } from "next/router";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    // borderRight: theme.palette.type == "light" ? "1px solid #D6D6D6" : "0px",
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.sidebar,
    borderRight: "none",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },

  title: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1em",
  },

  modeToggle: {
    marginTop: "auto",
    justifyContent: "center",
    marginBottom: "1em",
  },
  list: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    // color: "white",
  },
}));

export default function Sidebar({ darkMode, setDarkMode, topics }) {
  const classes = useStyles();

  const openList = new Array(topics.length);
  for (var i = 0; i < openList.length; i++) {
    openList[i] = false;
  }
  const [open, setOpen] = React.useState(openList);
  const [selected, setSelected] = React.useState();

  const router = useRouter();
  const handleClick = (index, mainItem) => {
    let newOpenList = open.slice();
    newOpenList[index] = !newOpenList[index];
    setOpen(newOpenList);
    setSelected(mainItem.text);
    router.push(`${mainItem.text}`);
  };

  return (
    <Drawer
      component="nav"
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{ paper: classes.drawerPaper }}
    >
      <List className={classes.list}>
        <ListItem alignItems="center" className={classes.title}>
          <RiBookmark3Fill
            color="#6267dc"
            size="2em"
            style={{ marginRight: "0.5em" }}
          />
          <Typography variant="h6">Resonance</Typography>
        </ListItem>
        {topics.map((mainItem, index) => (
          <div key={index}>
            <ListItem
              selected={selected === index}
              button
              onClick={() => handleClick(index, mainItem)}
            >
              <ListItemText primary={mainItem.text} />
              {mainItem.subItems.length > 0 && (
                <>{open[index] ? <ExpandLess /> : <ExpandMore />}</>
              )}
            </ListItem>

            {mainItem.subItems.length > 0 && (
              <>
                <Collapse in={open[index]} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {mainItem.subItems.map((subItem) => (
                      <ListItem
                        selected={selected === subItem}
                        key={subItem}
                        button
                        className={classes.nested}
                        onClick={() => setSelected(subItem)}
                      >
                        <ListItemText primary={subItem} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            )}
          </div>
        ))}
        <ListItem className={classes.modeToggle}>
          <IconButton onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
              <Brightness7Icon style={{ fontSize: 30 }} />
            ) : (
              <Brightness2Icon style={{ fontSize: 30 }} />
            )}
          </IconButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
