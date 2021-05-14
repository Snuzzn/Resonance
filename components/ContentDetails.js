import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Typography, TextField } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";

const useStyles = makeStyles((theme) => ({
  image: {
    borderRadius: "0.5em",
    alignSelf: "center",
  },
  modalHeading: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      marginRight: theme.spacing(1.5),
    },
  },
  notesField: {
    marginTop: "1.5em",
  },
  dialog: {
    display: "flex",
    flexDirection: "column",
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: "50vw",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ContentDetails({ open, setOpen, img }) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const [edit, setEdit] = React.useState(false);
  const [notes, setNotes] = React.useState(
    "Cras mattis consectetur purus sit amet fermentum. Cras justo odio,dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."
  );

  const finishEdit = () => {
    setNotes(notes);
    setEdit(!edit);
  };

  const [data, setData] = React.useState("");

  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle onClose={handleClose}>
          <div className={classes.modalHeading}>
            <Typography variant="h5">Fundamentals of Landscapes</Typography>
            <YouTubeIcon size="2em" color="primary" />
          </div>
        </DialogTitle>
        <DialogContent dividers className={classes.dialog}>
          <img width="95%" src={img} className={classes.image} />
          {edit ? (
            <TextField
              label="Notes"
              multiline
              rows={5}
              variant="filled"
              className={classes.notesField}
              defaultValue={notes}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          ) : (
            // <EditorJs data={data} tools={{ paragraph: Paragraph }} />

            <Typography gutterBottom style={{ marginTop: "1.5em" }}>
              {notes}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={finishEdit} color="primary">
            {edit ? "Save changes" : "Edit changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
