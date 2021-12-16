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
import { useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";
import Divider from "@material-ui/core/Divider";
import { FcGoogle } from "react-icons/fc";
import useSWR from "swr";
import fetcher from "../util/fetcher";
import Axios from "axios";
import baseUrl from "../util/baseUrl";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
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
  const { addToast } = useToasts();
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [name, setName] = React.useState("");
  const router = useRouter();

  const handleRegister = () => {
    Axios.post(`${baseUrl()}/api/register`, {
      name: name,
      email: email,
      password: pass,
    })
      .catch((err) => {
        // console.log(err.response.data.message);
        addToast(err.response.data.message, { appearance: "error" });
      })
      .then((response) => {
        handleLogin();
      });
  };

  const handleLogin = async () => {
    await Axios.post(`${baseUrl()}/api/login`, {
      email: email,
      password: pass,
    })
      .then((response) => {
        addToast(response.data.message, { appearance: "success" });
        router.push("/start");
      })
      .catch((err) => {
        addToast(err.response.data.message, { appearance: "error" });
        // console.log(err.response);
      });
  };

  const errorToast = (err) => {
    addToast(err.response.data.message, { appearance: "error" });
  };
  // const { data } = useSWR("/api/login", fetcher);

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            type="string"
            id="string"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            onClick={handleRegister}
          >
            Sign Up
          </Button>

          <Link href="/login">
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </Link>
          {/* <Divider style={{ marginTop: "2em" }} /> */}
        </form>
      </div>
    </Container>
  );
}
