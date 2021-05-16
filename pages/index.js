import Head from "next/head";
import React from "react";
import { CssBaseline, Typography, Grid, Chip } from "@material-ui/core";
import Layout from "../components/Layout";
import ContentView from "../components/ContentView";
import Header from "../components/Header";
import MediaTypes from "../components/MediaTypes";
import { useAuth } from "../lib/auth";

import nookies from "nookies";
import { verifyIdToken } from "../lib/firebaseAdmin";
import firebaseClient from "../lib/firebaseClient";
import firebase from "firebase/app";
import Link from "next/link";

export default function Home({ session, darkMode, setDarkMode }) {
  firebaseClient();
  const [grid, setGrid] = React.useState(true);
  const [currMedium, setCurrMedium] = React.useState("All");

  const topics = [
    { text: "Productivity", path: "/", subItems: [] },
    { text: "Art", path: "/", subItems: ["Landscape", "Portraits"] },
    { text: "Coding", path: "/", subItems: ["React", "Express"] },
  ];
  const { user } = useAuth();
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
      <main></main>
    </>
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
    return { props: { session: "none, son" } };
  }
}
