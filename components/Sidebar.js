import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@material-ui/core";
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
import CloseIcon from "@material-ui/icons/Close";
import baseUrl from "../util/baseUrl";
import useMediaQuery from "../util/useMediaQuery";

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

  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down(800)]: {
      justifyContent: "space-between",
      paddingLeft: "15px",
    },
  },
  bottomIcon: {
    marginTop: "auto",
    justifyContent: "center",
  },
  list: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default function Sidebar({ isMenuVisible, setIsMenuVisible }) {
  const classes = useStyles();
  const { darkMode, setDarkMode } = React.useContext(MyContext);
  const { openAddTopic, setOpenAddTopic, topics, setTopics } = React.useContext(
    MyContext
  );

  const isMobile = useMediaQuery("(max-width: 800px)");

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

  const handleLogout = () => {
    Axios.get(`${baseUrl()}/api/logout`)
      .then((response) => {
        addToast(response.data.message, { appearance: "success" });
        router.push("/");
      })
      .catch((err) => {
        console.log(err.response.data.message);
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
      style={
        isMobile
          ? !isMenuVisible
            ? { display: "none" }
            : { position: "absolute" }
          : {}
      }
    >
      <div className={classes.titleContainer}>
        <div className={classes.title}>
          <RiBookmark3Fill
            color="#6267dc"
            size="2em"
            style={{ marginRight: "0.5em" }}
          />
          <Typography variant="h6">Resonance</Typography>
        </div>
        {isMobile && isMenuVisible && (
          <IconButton>
            <CloseIcon onClick={() => setIsMenuVisible(!isMenuVisible)} />
          </IconButton>
        )}
      </div>

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
          <AddIcon style={{ marginRight: "0.25em" }} />
          <ListItemText primary="Add Topic" />
        </ListItem>
      </List>

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
