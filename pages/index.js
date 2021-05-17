import Head from "next/head";
import React from "react";
import { CssBaseline, Typography, Grid, Chip } from "@material-ui/core";
import Layout from "../components/Layout";
import ContentView from "../components/ContentView";
import Header from "../components/Header";
import MediaTypes from "../components/MediaTypes";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Home({ darkMode, setDarkMode }) {
  const [session, loading] = useSession();
  const [grid, setGrid] = React.useState(true);
  const [currMedium, setCurrMedium] = React.useState("All");
  console.log(session);
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
      <Link href="/topic">Topic</Link>
      <CssBaseline />
      <main>
        {!session && (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
        {session && (
          <>
            Signed in as {session.user.name} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )}
      </main>
    </>
  );
}
