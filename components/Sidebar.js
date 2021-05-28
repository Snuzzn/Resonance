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
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useRouter } from "next/router";
import Axios from "axios";
import { useToasts } from "react-toast-notifications";
import SessionExpiredCheck from "./SessionExpiredCheck";
import Link from "next/link";
import { MyContext } from "./context";
import AddTopicDialog from "./AddTopicDialog";
import useSWR from "swr";
import fetcher from "../util/fetcher";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import baseUrl from "../util/baseUrl";

const menu = [
  {
    title: "Art",
    children: [
      { title: "Landscape art" },
      { title: "Portrait", children: [{ title: "face" }, { title: "body" }] },
    ],
  },
  {
    title: "Coding",
    children: [
      { title: "Frontend", children: [{ title: "React" }] },
      {
        title: "Backend",
        children: [{ title: "Django" }, { title: "Express" }],
      },
    ],
  },
];

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
    margin: "1em 0 1em",
  },

  bottomIcon: {
    marginTop: "auto",
    justifyContent: "center",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    // color: "white",
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  const { darkMode, setDarkMode } = React.useContext(MyContext);
  const { openAddTopic, setOpenAddTopic, topics, setTopics } = React.useContext(
    MyContext
  );

  const { addToast } = useToasts();
  const router = useRouter();
  const name = router.query.name;
  const [open, setOpen] = React.useState(true);
  const [displayChildren, setDisplayChildren] = React.useState({});
  const [logout, setLogout] = React.useState(false);

  const [selected, setSelected] = React.useState(name);

  const { data, error } = useSWR(`/api/get-topics`, fetcher);

  React.useEffect(() => {
    if (data) {
      let simplifiedTopics = [];
      data.forEach((item) => simplifiedTopics.push(item.title));
      setTopics(simplifiedTopics);
    }
  }, [data]);
  // console.log(topics);

  const handleClick = (index, mainItem) => {
    let newOpenList = open.slice();
    newOpenList[index] = !newOpenList[index];
    setOpen(newOpenList);
    navToTopic(mainItem.text);
  };

  const handleDialogOpen = () => {
    setOpenAddTopic(true);
  };

  const navToTopic = (topic) => {
    setSelected(topic);
    router.push(`/topic/${topic}`);
  };
  function Menu({ items }) {
    return (
      <ul>
        {items.map((item) => (
          <ListItem>
            <Link href={"/topic/" + item.title}>
              <ListItemText
                primary={item.title}
                style={{ cursor: "pointer" }}
              />
            </Link>
            {item.children && (
              <button
                onClick={() => {
                  setDisplayChildren({
                    ...displayChildren,
                    [item.title]: !displayChildren[item.title],
                  });
                  setOpen(false);
                }}
              >
                {displayChildren[item.title] ? "-" : "+"}
              </button>
            )}
            {displayChildren[item.title] && item.children && (
              <Menu items={item.children} />
            )}
          </ListItem>
        ))}
      </ul>
    );
  }
  const handleLogout = () => {
    Axios.get(`${baseUrl}/api/logout`)
      .then((response) => {
        // console.log(response);
        addToast(response.data.message, { appearance: "success" });
        router.push("/");
        // addToast(err.response.data.message, { appearance: "error" });
      })
      .catch((err) => {
        console.log(err.response.data.message);
        // addToast(err.response.data.message, { appearance: "error" });
      });
    setLogout(true);
  };

  return (
    <Drawer
      component="nav"
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.title}>
        <RiBookmark3Fill
          color="#6267dc"
          size="2em"
          style={{ marginRight: "0.5em" }}
        />
        <Typography variant="h6">Resonance</Typography>
      </div>

      {/* {data && <Menu items={data} />} */}

      <List className={classes.list}>
        {topics.map((item) => (
          <Link href={`/topic/${item}`} key={item}>
            <ListItem
              button
              selected={item == selected ? true : false}
              key={item}
              onClick={() => setSelected(item)}
            >
              <ListItemText primary={item} />
            </ListItem>
          </Link>
        ))}
        <ListItem
          button
          style={{ marginBottom: "2em" }}
          onClick={handleDialogOpen}
        >
          {/* <Fab
            size="medium"
            color="secondary"
            variant="extended"
            className={classes.margin}
            onClick={handleDialogOpen}
            style={{ marginRight: "auto" }}
          > */}
          <AddIcon style={{ marginRight: "0.25em" }} />
          <ListItemText primary="Add Topic" />

          {/* </Fab> */}
        </ListItem>
      </List>

      {/* <List className={classes.list}>
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
              selected={selected === mainItem.text}
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
                        onClick={() => navToTopic(subItem)}
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


      </List> */}

      <AddTopicDialog />
      <ListItem className={classes.bottomIcon}>
        <IconButton onClick={handleLogout}>
          <ExitToAppIcon style={{ fontSize: 30 }} />
        </IconButton>
        <IconButton onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? (
            <Brightness7Icon style={{ fontSize: 30 }} />
          ) : (
            <Brightness2Icon style={{ fontSize: 30 }} />
          )}
        </IconButton>
      </ListItem>
      {logout && <SessionExpiredCheck />}
    </Drawer>
  );
}
