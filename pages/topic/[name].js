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

  const topics = [
    { text: "Productivity", path: "/", subItems: [] },
    { text: "Art", path: "/", subItems: ["Landscape Painting", "Portraits"] },
    { text: "Coding", path: "/", subItems: ["React", "Express"] },
  ];

  const media = ["All", "Videos", "Articles", "Podcasts"];
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
        <Layout topics={topics}>
          <Header
            grid={grid}
            setGrid={setGrid}
            currMedium={currMedium}
            topics={topics}
          />
          <MediaTypes
            currMedium={currMedium}
            setCurrMedium={setCurrMedium}
            media={media}
          />
          <ContentView grid={grid} className={classes.content} />
        </Layout>
      </main>
    </>
  );
}
