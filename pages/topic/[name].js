import Head from "next/head";
import React from "react";
import { CssBaseline, Typography, Grid, Chip } from "@material-ui/core";
import Layout from "../../components/Layout";
import ContentView from "../../components/ContentView";
import Header from "../../components/Header";
import MediaTypes from "../../components/MediaTypes";

export default function topic({ darkMode, setDarkMode }) {
  const [grid, setGrid] = React.useState(true);
  const [currMedium, setCurrMedium] = React.useState("All");

  const topics = [
    { text: "Productivity", path: "/", subItems: [] },
    { text: "Art", path: "/", subItems: ["Landscape", "Portraits"] },
    { text: "Coding", path: "/", subItems: ["React", "Express"] },
  ];

  const media = ["All", "Videos", "Articles", "Podcasts"];
  return (
    <>
      <Head>
        <title>Resonance</title>
        <meta name="description" content="Bookmark manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <main>
        <Layout darkMode={darkMode} setDarkMode={setDarkMode} topics={topics}>
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
          <ContentView grid={grid} />
        </Layout>
      </main>
    </>
  );
}
