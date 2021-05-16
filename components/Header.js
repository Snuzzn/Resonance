import { makeStyles } from "@material-ui/core";
import Sidebar from "./Sidebar";
import React from "react";
import { IconButton, Typography, Fab } from "@material-ui/core";
import StatusButton from "./StatusButton";
import AddIcon from "@material-ui/icons/Add";
import TocIcon from "@material-ui/icons/Toc";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AddContentDialog from "./AddContentDialog";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    "& > *": {
      marginRight: theme.spacing(3),
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
      <StatusButton />
      <IconButton size="small" onClick={() => setGrid(!grid)}>
        {grid ? <TocIcon /> : <DashboardIcon />}
      </IconButton>
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
