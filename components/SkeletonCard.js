import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  makeStyles,
  IconButton,
  CardHeader,
} from "@material-ui/core";
import NotesIcon from "@material-ui/icons/Notes";
import FavoriteIcon from "@material-ui/icons/Favorite";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ContentDetails from "./ContentDetails";
import Skeleton from "@material-ui/lab/Skeleton";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    paddingTop: "56.25%",

    backgroundImage:
      theme.palette.type === "light"
        ? "linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)"
        : "grey",
  },
  cardContent: {
    height: "12em",
    width: 345,
  },
  skeletonBox: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(1),
    "& > *": {
      marginBottom: theme.spacing(0.5),
    },
  },
}));

export default function SkeletonCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Skeleton animation="wave" variant="rect" className={classes.media} />

        <CardContent className={classes.cardContent}>
          <Skeleton animation="wave" height={30} width="50%" />
          <div className={classes.skeletonBox}>
            <Skeleton animation="wave" height={13} width="90%" />
            <Skeleton animation="wave" height={13} />
            <Skeleton animation="wave" height={13} width="80%" />
            <Skeleton animation="wave" height={13} width="70%" />
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Skeleton animation="wave" variant="circle" width={30} height={30} />
        <Skeleton animation="wave" variant="circle" width={30} height={30} />
        <Skeleton animation="wave" variant="circle" width={30} height={30} />
        <Skeleton
          style={{ marginLeft: "auto" }}
          variant="circle"
          width={30}
          height={30}
        />
      </CardActions>
    </Card>
  );
}
