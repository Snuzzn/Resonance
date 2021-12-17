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
import Modal from "@material-ui/core/Modal";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactPlayer from "react-player";

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
  loadingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.8em",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    backgroundColor: "#121426",
    boxShadow: 24,
    padding: 40,
    borderRadius: 30,
    display: "flex",
    flexDirection: "column",
    gap: "2em",
  },
}));

export default function SignIn() {
  const { addToast } = useToasts();
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [name, setName] = React.useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
        setIsLoading(false);
        setOpen(true);
        // handleLogin()
      });
  };

  const handleLogin = () => {
    setIsLoading(true);
    Axios.post(`${baseUrl()}/api/login`, {
      email: email,
      password: pass,
    })
      .then((response) => {
        addToast(response.data.message, { appearance: "success" });
        router.push("/start");
        setIsLoading(false);
      })
      .catch((err) => {
        addToast("Try again", { appearance: "error" });
        setIsLoading(false);
        // console.log(err.response);
      });
  };

  const errorToast = (err) => {
    addToast(err.response.data.message, { appearance: "error" });
  };

  const [open, setOpen] = React.useState(false);

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
        <form className={classes.form} onSubmit={handleRegister} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
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
            type="submit"
          >
            {isLoading ? (
              <div className={classes.loadingContainer}>
                <CircularProgress color="white" size="1em" /> Signing up
              </div>
            ) : (
              <>Sign up</>
            )}
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
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Welcome to Resonance!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Here's a quick demo to show you what you can do.
            </Typography>
          </div>

          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <ReactPlayer
              controls={true}
              width="100%"
              height="100%"
              url="https://sanojan99.wistia.com/medias/rhnyvk1olq"
              style={{ position: "absolute", top: 0, left: 0 }}
              fallback="../../public/images/favicon.svg"
              playing={true}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.6em" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setTimeout(handleLogin, 1000);
              }}
            >
              {isLoading ? (
                <div className={classes.loadingContainer}>
                  <CircularProgress color="white" size="1em" /> Getting ready...
                </div>
              ) : (
                <>Get started</>
              )}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpen(false)}
            >
              Go back
            </Button>
          </div>
        </Box>
      </Modal>
    </Container>
  );
}
