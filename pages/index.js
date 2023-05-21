import Head from "next/head";
import React from "react";
import { CssBaseline, Typography, Button, makeStyles } from "@material-ui/core";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "../util/fetcher";
import { UndrawFileSearching } from "react-undraw-illustrations";
import { RiBookmark3Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import useMediaQuery from "../util/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  centre: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heroBox: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    borderStyle: "solid",
    padding: theme.spacing(3),
    paddingRight: theme.spacing(5),
    borderRadius: theme.spacing(2),
    border: theme.palette.primary.main,
    boxShadow: `0.05em 0.05em 0.5em ${theme.palette.primary.main}`,
    [theme.breakpoints.down(800)]: {
      padding: theme.spacing(1),
      paddingRight: theme.spacing(2),
      borderRadius: theme.spacing(1),
      height: "250px",
    },
  },

  buttons: {
    marginTop: theme.spacing(2),
    display: "flex",
    "& > *": {
      marginRight: theme.spacing(1.5),
    },
  },
  logo: {
    marginRight: theme.spacing(3),
    [theme.breakpoints.down(800)]: {
      width: "100px",
    },
  },
  title: {
    fontSize: "6rem",
    fontWeight: "300",
    lineHeight: "0",
    [theme.breakpoints.down(800)]: {
      fontSize: "3rem",
      fontWeight: "300",
    },
  },
  subtitle: {
    fontSize: "1.5rem",
    fontWeight: "300",
    [theme.breakpoints.down(800)]: {
      fontSize: "1rem",
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  const router = useRouter();

  // if (isLoading) return <>Loading</>;
  // if (isError) return <>Error</>;
  // return <> {data.message} </>;
  return (
    <>
      <Head>
        <title>Resonance</title>
        <meta name="description" content="Bookmark manager" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <CssBaseline />

      <main className={classes.centre}>
        <div className={classes.heroBox}>
          <RiBookmark3Fill
            color="#6267dc"
            size="19em"
            className={classes.logo}
          />
          <div className={classes.heroText}>
            <h1 className={classes.title}>Resonance</h1>
            <h2 className={classes.subtitle}>An elegant bookmark manager.</h2>
            <div className={classes.buttons}>
              <Link href="/login">
                <Button variant="contained" color="primary">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="contained" color="primary">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
