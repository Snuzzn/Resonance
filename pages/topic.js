import Head from "next/head";
import React from "react";
import { CssBaseline } from "@material-ui/core";
import Layout from "../components/Layout";

import { useRouter } from "next/router";

export default function Topic() {
  const router = useRouter();

  const [grid, setGrid] = React.useState(true);
  const [currMedium, setCurrMedium] = React.useState("All");

  const topics = [];
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
        <Layout topics={topics}></Layout>
      </main>
    </>
  );
}
