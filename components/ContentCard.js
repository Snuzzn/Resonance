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
        : //"linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)",
          "linear-gradient(60deg, #243949 0%, #517fa4 100%)",
    //"linear-gradient(60deg, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)",
    // "linear-gradient(60deg, #29323c 0%, #485563 100%)",
    // "linear-gradient(to right, #09203f 0%, #537895 100%)",
    // "linear-gradient(to right, #868f96 0%, #596164 100%)",

    // height: 190,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  modalHeading: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      marginRight: theme.spacing(1.5),
    },
  },
  notesField: {
    marginTop: "1.5em",
  },
  logo: {
    borderRadius: "1em",
  },
}));

export default function ContentCard({ img }) {
  const classes = useStyles();
  const [favourite, setFavourite] = React.useState(false);
  const [later, setLater] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [complete, setComplete] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [youtube, setYoutube] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  React.useEffect(() => {
    if (img.includes("ytimg")) {
      setYoutube(true);
    }
  }, []);

  // const link = "https://docs.react2025.com/dashboard/swr";
  // const apiLink = `image.thum.io/get/width/600/crop/800/${link}`;
  // const getImage = async () => {
  //   const response = await fetch(
  //     "https://docs.react2025.com/feedback/firebase-admin"
  //   );
  //   if (response.ok) {
  //     console.log(response);
  //     // setImage(response);
  //     // console.log(image);
  //     setLoading(false);
  //   }
  // };
  // React.useEffect(() => {
  //   getImage();
  // }, []);

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          {youtube ? (
            <CardMedia
              image={img}
              className={classes.media}
              title="Contemplative Reptile"
            />
          ) : (
            <CardMedia className={classes.media} title="Contemplative Reptile">
              <div
                style={{
                  position: "absolute",
                  // left: "65%",
                  // top: "50%"
                  left: "40%",
                  top: "20%",
                }}
              >
                <Image
                  className={classes.logo}
                  quality="100"
                  width={65}
                  height={65}
                  quality={100}
                  src={img}
                />
              </div>
            </CardMedia>
          )}

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton
            size="small"
            onClick={() => setComplete(!complete)}
            color={complete ? "primary" : "default"}
          >
            <CheckCircleIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setFavourite(!favourite)}
            color={favourite ? "primary" : "default"}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setLater(!later)}
            color={later ? "primary" : "default"}
          >
            <WatchLaterIcon />
          </IconButton>

          <IconButton
            size="small"
            style={{ marginLeft: "auto" }}
            onClick={() => handleOpen(true)}
          >
            <NotesIcon />
          </IconButton>
        </CardActions>
      </Card>

      <ContentDetails setOpen={setOpen} open={open} img={img} />
    </>
  );
}
