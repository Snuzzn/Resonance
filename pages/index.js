import Head from "next/head";
import React from "react";
import { CssBaseline, Typography, Grid, Chip } from "@material-ui/core";
import Layout from "../components/Layout";
import ContentView from "../components/ContentView";
import Header from "../components/Header";
import MediaTypes from "../components/MediaTypes";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "../util/fetcher";

function useHello(id) {
  const { data, error } = useSWR(`/api/hello`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default function Home({ darkMode, setDarkMode }) {
  const [grid, setGrid] = React.useState(true);
  const [currMedium, setCurrMedium] = React.useState("All");
  const topics = [
    { text: "Productivity", path: "/", subItems: [] },
    { text: "Art", path: "/", subItems: ["Landscape", "Portraits"] },
    { text: "Coding", path: "/", subItems: ["React", "Express"] },
  ];
  const media = ["All", "Videos", "Articles", "Podcasts"];

  const { data, isLoading, isError } = useHello();

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
      <Link href="/topic">Topic</Link>
      <CssBaseline />

      <main>
        <Layout darkMode={darkMode} setDarkMode={setDarkMode} topics={topics}>
          {data ? data.message : "???"}
        </Layout>
      </main>
    </>
  );
}
