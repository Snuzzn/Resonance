import Head from "next/head";
import React from "react";
import { CssBaseline, Typography, Grid, Chip } from "@material-ui/core";
import Layout from "../../components/Layout";
import ContentView from "../../components/ContentView";
import Header from "../../components/Header";
import MediaTypes from "../../components/MediaTypes";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/auth";

import nookies from "nookies";
import { verifyIdToken } from "../../lib/firebaseAdmin";
import firebaseClient from "../../lib/firebaseClient";
import firebase from "firebase/app";
import SessionExpiredCheck from "../../components/SessionExpiredCheck";

export default function Topic({ session, darkMode, setDarkMode }) {
  firebaseClient();
  const { user } = useAuth();
  const [grid, setGrid] = React.useState(true);
  const [currMedium, setCurrMedium] = React.useState("All");

  const topics = [
    { text: "Productivity", path: "/", subItems: [] },
    { text: "Art", path: "/", subItems: ["Landscape Painting", "Portraits"] },
    { text: "Coding", path: "/", subItems: ["React", "Express"] },
  ];

  const media = ["All", "Videos", "Articles", "Podcasts"];
  return (
    <SessionExpiredCheck session={session}>
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
          <div>User ID: {user ? user.uid : "no user signed in"}</div>
          <div>{session}</div>
        </Layout>
      </main>
    </SessionExpiredCheck>
  );
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      props: { session: `Your email is ${email} and your UID is ${uid}.` },
    };
  } catch (err) {
    // context.res.writeHead(302, { Location: "/login" });
    // context.res.end();
    return { props: { session: false } };
  }
}
