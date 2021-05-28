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
import { UndrawFileSearching } from "react-undraw-illustrations";
function useHello() {
  const { data, error } = useSWR(`/api/hello`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default function Home() {
  const [grid, setGrid] = React.useState(true);
  const topics = [
    { text: "Productivity", path: "/", subItems: [] },
    { text: "Art", path: "/", subItems: ["Landscape", "Portraits"] },
    { text: "Coding", path: "/", subItems: ["React", "Express"] },
  ];
  const media = ["All", "Videos", "Articles", "Podcasts"];

  const { data, isLoading, isError } = useHello();
  console.log(data);

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
        <Layout topics={topics}>
          {/* <div style={{ marginLeft: "auto", marginRight: "auto" }}>
            <UndrawFileSearching height="30em" />
          </div> */}
        </Layout>
      </main>
    </>
  );
}
