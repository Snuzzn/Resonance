import Head from "next/head";
import React from "react";
import { CssBaseline, Typography, Grid, Chip } from "@material-ui/core";
import Layout from "../../components/Layout";
import ContentView from "../../components/ContentView";
import Header from "../../components/Header";
import MediaTypes from "../../components/MediaTypes";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

export default function Topic() {
  const [grid, setGrid] = React.useState(true);
  const [currMedium, setCurrMedium] = React.useState("All");

  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Resonance</title>
        <meta name="description" content="Bookmark manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <main>
        <Layout>
          <Header grid={grid} setGrid={setGrid} currMedium={currMedium} />
          <MediaTypes currMedium={currMedium} setCurrMedium={setCurrMedium} />
          <ContentView grid={grid} className={classes.content} />
        </Layout>
      </main>
    </>
  );
}
