import Head from "next/head";
import React from "react";
import { CssBaseline } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import firebaseClient from "../lib/firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
import { useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";
import Divider from "@material-ui/core/Divider";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../lib/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(2),
  },
  utils: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function SignIn() {
  const router = useRouter();
  const { addToast } = useToasts();
  firebaseClient();
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  // console.log(pass);
  const { auth } = useAuth();
  console.log(auth);
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <div className={classes.utils}>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Link href="#" variant="body2" style={{ marginLeft: "auto" }}>
              Forgot password?
            </Link>
          </div>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={async () => {
              await auth.signInWithEmail(email, pass).catch(function (error) {
                const message = error.message;
                addToast(message, { appearance: "error" });
              });
            }}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={async () => {
              await firebase
                .auth()
                .createUserWithEmailAndPassword(email, pass)
                .then(function (firebaseUser) {
                  router.push("/topic");
                })
                .catch(function (error) {
                  const message = error.message;
                  addToast(message, { appearance: "error" });
                });
            }}
          >
            Sign Up
          </Button>
          <Divider style={{ marginTop: "2em" }} />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            <FcGoogle size="1.5em" style={{ marginRight: "0.5em" }} />
            Sign in with Google
          </Button>
        </form>
      </div>
    </Container>
  );
}
