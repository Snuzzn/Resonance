import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";
import Axios from "axios";
import { useToasts } from "react-toast-notifications";
import { mutate } from "swr";
import { useRouter } from "next/router";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import fetcher from "../util/fetcher";
import { MyContext } from "./context";
import baseUrl from "../util/baseUrl";

import YouTubeIcon from "@material-ui/icons/YouTube";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import { IoMusicalNotes } from "react-icons/io5";
import { RiArticleFill } from "react-icons/ri";
import { HiDotsCircleHorizontal, HiPhotograph } from "react-icons/hi";
import { MdMovie } from "react-icons/md";
import { FaBook, FaPodcast, FaBloggerB } from "react-icons/fa";
import { AiFillYoutube, AiFillShopping } from "react-icons/ai";

const allMediaTypes = [
  [<RiArticleFill style={{ marginRight: "0.5em" }} />, "Articles"],
  [<FaBook style={{ marginRight: "0.5em" }} />, "Books"],
  [<FaBloggerB style={{ marginRight: "0.5em" }} />, "Blogs"],
  [<MdMovie style={{ marginRight: "0.5em" }} />, "Movies"],
  [<IoMusicalNotes style={{ marginRight: "0.5em" }} />, "Music"],
  [<HiPhotograph style={{ marginRight: "0.5em" }} />, "Photos"],
  [<FaPodcast style={{ marginRight: "0.5em" }} />, "Podcasts"],
  [<AiFillShopping style={{ marginRight: "0.5em" }} />, "Shopping"],
  [<AiFillYoutube style={{ marginRight: "0.5em" }} />, "Videos"],
];
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginRight: 20,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddTopicDialog({ open, setOpen, currMedium, topics }) {
  const router = useRouter();
  const classes = useStyles();
  const [topic, setTopic] = React.useState("");

  const { addToast } = useToasts();
  const { openAddTopic, setOpenAddTopic } = React.useContext(MyContext);

  const handleClose = () => {
    setOpenAddTopic(false);
    setTopic("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Axios.post(`${baseUrl()}/api/add-topic`, {
      topic: topic,
    })
      .then((response) => {
        addToast(response.data.message, { appearance: "success" });
        handleClose();
      })
      .catch((err) => {
        addToast(err.response.data.message, { appearance: "error" });
      });
    // console.log(`/api/content?topic=${router.query.name}`);
    mutate(`/api/get-topics`);
  };

  return (
    <Dialog open={openAddTopic} onClose={handleClose}>
      <DialogTitle>Add topic</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <FormControl className={classes.formControl}>
            <TextField
              autoFocus
              margin="dense"
              label="Topic"
              fullWidth
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
              }}
            />
          </FormControl>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
