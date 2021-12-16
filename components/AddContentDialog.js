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
  CircularProgress,
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
import { VscSymbolMisc } from "react-icons/vsc";

const allMediaTypes = [
  [<RiArticleFill style={{ marginRight: "0.5em" }} />, "Articles"],
  [<FaBloggerB style={{ marginRight: "0.5em" }} />, "Blogs"],
  [<FaBook style={{ marginRight: "0.5em" }} />, "Books"],
  // [<VscSymbolMisc style={{ marginRight: "0.5em" }} />, "Miscellaneous"],
  [<MdMovie style={{ marginRight: "0.5em" }} />, "Movies"],
  [<HiPhotograph style={{ marginRight: "0.5em" }} />, "Photos"],
  [<FaPodcast style={{ marginRight: "0.5em" }} />, "Podcasts"],
  [<AiFillShopping style={{ marginRight: "0.5em" }} />, "Shopping"],
  [<IoMusicalNotes style={{ marginRight: "0.5em" }} />, "Sound"],
  [<AiFillYoutube style={{ marginRight: "0.5em" }} />, "Videos"],
];
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginBottom: 10,
    marginRight: 20,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddContentDialog({ open, setOpen, currMedium }) {
  const router = useRouter();
  const classes = useStyles();
  const [topic, setTopic] = React.useState(router.query.name);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setTopic(router.query.name);
    // setType(currMedium);
  }, [router.query.name]);
  const [link, setLink] = React.useState("");

  const { addToast } = useToasts();

  const handleClose = () => {
    setOpen(false);
    setLink("");
  };

  const { type, topics, filter } = React.useContext(MyContext);
  const [medium, setMedium] = React.useState(type);
  React.useEffect(() => {
    if (type === "All") {
      setMedium("Articles");
    } else {
      setMedium(type);
    }
  }, [type]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    await Axios.post(`${baseUrl()}/api/add-content`, {
      topic: topic,
      type: medium,
      link: link,
    })
      .then((response) => {
        addToast(response.data.message, { appearance: "success" });
        handleClose();
      })
      .catch((err) => {
        addToast(err.response.data.message, { appearance: "error" });
      });
    mutate(
      `/api/content?topic=${router.query.name}&type=${type}&filter=${filter}`
    );
    mutate(`/api/get-types?topic=${router.query.name}`);
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add content</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <FormControl className={classes.formControl}>
            <InputLabel shrink>Topic</InputLabel>
            <Select
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              className={classes.selectEmpty}
            >
              {topics.map((title) => (
                <MenuItem key={title} value={title}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel shrink>Medium</InputLabel>
            <Select
              value={medium}
              onChange={(event) => setMedium(event.target.value)}
              className={classes.selectEmpty}
            >
              {allMediaTypes.map((mediaType) => (
                <MenuItem value={mediaType[1]} key={mediaType[1]}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {mediaType}
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Link"
            fullWidth
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              {loading ? <CircularProgress size={20} /> : "Add"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
