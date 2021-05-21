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
const allMediaTypes = [
  "All",
  "Videos",
  "Articles",
  "Photos",
  "Music",
  "Movies",
  "Books",
  "Podcasts",
  "Blogs",
  "Shopping",
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

export default function AddContentDialog({
  open,
  setOpen,
  currMedium,
  topics,
}) {
  const router = useRouter();
  const classes = useStyles();
  const [topic, setTopic] = React.useState("");
  const [link, setLink] = React.useState("");

  const { addToast } = useToasts();

  const [medium, setMedium] = React.useState(currMedium);
  React.useEffect(() => {
    setMedium(currMedium);
  }, [currMedium]);

  const handleClose = () => {
    setOpen(false);
    setLink("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Axios.post("http://localhost:3000/api/add-content", {
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
    console.log(`/api/content?topic=${router.query.name}`);
    mutate(`/api/content?topic=${router.query.name}`);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add content</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Topic
            </InputLabel>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              className={classes.selectEmpty}
            >
              {topics.map((title) => (
                <MenuItem key={title.text} value={title.text}>
                  {title.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Medium
            </InputLabel>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              value={medium}
              onChange={(event) => setMedium(event.target.value)}
              className={classes.selectEmpty}
            >
              {allMediaTypes.map((type) => (
                <MenuItem value={type} key={type}>
                  {type}
                </MenuItem>
              ))}
              <MenuItem value="All">All</MenuItem>
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
              Add
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
