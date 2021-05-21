import React from "react";
import { useRouter } from "next/router";
import { CssBaseline, Typography, Grid, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  redirect: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      marginRight: theme.spacing(1.5),
    },
  },
}));

export default function SessionExpiredCheck() {
  const classes = useStyles();
  // if (!session && typeof window !== "undefined") {
  //   router.push("/login");
  // }

  return (
    <Modal
      className={classes.modal}
      open
      disableAutoFocus
      disableEnforceFocus
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 200,
      }}
    >
      <Fade in>
        <div className={classes.paper}>
          <h2>Logging you out</h2>

          <div className={classes.redirect}>
            <p>Redirecting to login...</p>
            <CircularProgress size={20} />
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
