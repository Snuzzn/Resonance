import React from "react";
import ContentCard from "./ContentCard";
import TableView from "../components/TableView";
import { CssBaseline, Typography, Grid } from "@material-ui/core";

const images = [
  "https://i3.ytimg.com/vi/xWMMo1v594Y/maxresdefault.jpg",
  "https://logo.clearbit.com/medium.com",
  "https://i3.ytimg.com/vi/XHprIlkY8Q4/maxresdefault.jpg",
  "https://logo.clearbit.com/reddit.com",
  "https://i3.ytimg.com/vi/4MlWZDx7Zzw/maxresdefault.jpg",
  "https://logo.clearbit.com/notion.com",
  "https://i3.ytimg.com/vi/upxBGNcryRs/maxresdefault.jpg",
  "https://logo.clearbit.com/cgi.cse.unsw.edu.au",
  "https://i3.ytimg.com/vi/_e6wTOuJ20M/maxresdefault.jpg",
  "https://i3.ytimg.com/vi/47evGD6A4Fs/maxresdefault.jpg",
  "https://logo.clearbit.com/spotify.com",
];
export default function ContentView({ grid }) {
  return (
    <>
      {grid ? (
        <Grid container spacing={2}>
          {images.map((image) => (
            <Grid item key={image} _xs={12} _md={6} _lg={4} _xl={3} xxl={1}>
              <ContentCard img={image} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableView />
      )}
    </>
  );
}
