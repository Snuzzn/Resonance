import Head from "next/head";
import React from "react";
import { CssBaseline, Typography, Button, makeStyles } from "@material-ui/core";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "../util/fetcher";
import { UndrawFileSearching } from "react-undraw-illustrations";
import { RiBookmark3Fill } from "react-icons/ri";
import { useRouter } from "next/router";

function useHello(id) {
  const { data, error } = useSWR(`/api/hello`, fetcher);
  return {
    data: data,
    // isLoading: !error && !data,
    // isError: error,
  };
}
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
  },
}));

export default function Home() {
  const { data } = useHello();
  const classes = useStyles();
  const router = useRouter();

  if (data) {
    data.message === "Logged in" && router.push("/start");
  }

  // if (isLoading) return <>Loading</>;
  // if (isError) return <>Error</>;
  // return <> {data.message} </>;
  return (
    <>
      <Head>
        <title>Resonance</title>
        <meta name="description" content="Bookmark manager" />
        <link rel="icon" href="/favicon.ico" />
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
            <Typography variant="h1">Resonance</Typography>
            <Typography variant="h5">An elegant bookmark manager.</Typography>
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
