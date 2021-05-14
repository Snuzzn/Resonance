import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
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
  const classes = useStyles();
  const [topic, setTopic] = React.useState("");

  const [medium, setMedium] = React.useState(currMedium);
  React.useEffect(() => {
    setMedium(currMedium);
  }, [currMedium]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add content</DialogTitle>
      <DialogContent>
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

        <TextField autoFocus margin="dense" id="name" label="Link" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

{
  /* {title.subItems.length != 0 && (
                  <>
                    {title.subItems.map((subItem) => (
                      <MenuItem value={subItem}>{subItem}</MenuItem>
                    ))}
                  </>
                )} */
}
