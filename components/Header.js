import { makeStyles } from "@material-ui/core";
import Sidebar from "./Sidebar";
import React from "react";
import {
  IconButton,
  Typography,
  Fab,
  Button,
  Popover,
} from "@material-ui/core";
import FilterOptions from "./FilterOptions";
import AddIcon from "@material-ui/icons/Add";
import TocIcon from "@material-ui/icons/Toc";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AddContentDialog from "./AddContentDialog";
import { useRouter } from "next/router";
import Slider from "@material-ui/core/Slider";
import { MyContext } from "./context";
import PhotoSizeSelectLargeIcon from "@material-ui/icons/PhotoSizeSelectLarge";

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    "& > *": {
      marginRight: theme.spacing(2.5),
    },
  },
  formControl: {
    minWidth: 120,
    marginBottom: 10,
    marginRight: 20,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  slider: {
    width: 400,
    margin: theme.spacing(1),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },

  icon: {
    marginRight: theme.spacing(1),
  },
}));
export default function Header({ grid, setGrid, currMedium, topics }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const router = useRouter();
  const { name } = router.query;

  return (
    <div className={classes.titleContainer}>
      <Typography variant="h4">{name}</Typography>
      <FilterOptions />
      {/* <IconButton
        size="small"
        onClick={() => setGrid(!grid)}
        className={classes.icon}
      >
        {grid ? <TocIcon /> : <DashboardIcon />}
      </IconButton> */}
      <SimplePopover />

      <Fab
        style={{ marginLeft: "auto" }}
        color="primary"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <AddContentDialog
        open={open}
        setOpen={setOpen}
        currMedium={currMedium}
        topics={topics}
      />
    </div>
  );
}

function SimplePopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { cardSize, setCardSize } = React.useContext(MyContext);
  // const [cardSize, setCardSize] = React.useState(345);
  const handleChange = (event, newValue) => {
    setCardSize(newValue);
    // console.log(cardSize);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton size="small" onClick={handleClick} className={classes.icon}>
        <PhotoSizeSelectLargeIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Slider
          min={200}
          max={500}
          value={cardSize}
          onChange={handleChange}
          className={classes.slider}
        />
      </Popover>
    </div>
  );
}
