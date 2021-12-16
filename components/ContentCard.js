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
import { MyContext } from "./context";
import Axios from "axios";
import { useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";
import { mutate } from "swr";
import baseUrl from "../util/baseUrl";

const useStyles = makeStyles((theme, cardSize) => ({
  root: (props) => ({
    width: props.cardSize,
  }),
  // [theme.breakpoints.only("_lg")]: {
  //   width: 400,
  // },
  media: {
    paddingTop: "56.25%",
    position: "relative",

    backgroundImage:
      theme.palette.type === "light"
        ? "linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)"
        : //"linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)",
          "linear-gradient(60deg, #243949 0%, #517fa4 100%)",
    //"linear-gradient(60deg, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)",
    // "linear-gradient(60deg, #29323c 0%, #485563 100%)",
    // "linear-gradient(to right, #09203f 0%, #537895 100%)",
    // "linear-gradient(to right, #868f96 0%, #596164 100%)",
  },
  logo: {
    position: "absolute",
    // left: "65%",
    // top: "50%",
    // left: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
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
  img: {
    borderRadius: "1em",
  },
  title: {
    height: "4.5em",
    overflow: "hidden",
  },
}));

export default function ContentCard({ data }) {
  const [favourite, setFavourite] = React.useState(data.fave);
  const [later, setLater] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [complete, setComplete] = React.useState(data.consumed);
  const [loading, setLoading] = React.useState(false);
  const [youtube, setYoutube] = React.useState(false);
  const { cardSize } = React.useContext(MyContext);
  const props = { cardSize: cardSize };
  const classes = useStyles(props);
  const { addToast } = useToasts();
  const handleOpen = () => {
    setOpen(true);
  };
  React.useEffect(() => {
    if (data.img.includes("ytimg")) {
      setYoutube(true);
    }
  }, []);
  // console.log(data);

  const router = useRouter();
  const topic = router.query.name;
  const { type, filter } = React.useContext(MyContext);

  const handleFavourite = async () => {
    setFavourite(!favourite);

    await Axios.post(`${baseUrl()}/api/favourite`, {
      _id: data._id,
    }).catch((err) => {
      // console.log(err);
      addToast(err.response.data.message, { appearance: "error" });
    });
    mutate(`/api/content?topic=${topic}&type=${type}&filter=${filter}`);
  };

  const handleComplete = async () => {
    setComplete(!complete);
    await Axios.post(`${baseUrl()}/api/consume`, {
      _id: data._id,
    }).catch((err) => {
      // console.log(err);
      addToast(err.response.data.message, { appearance: "error" });
    });
    mutate(`/api/content?topic=${topic}&type=${type}&filter=${filter}`);
  };
  // React.useEffect(() => {
  //   if (data.fave) {
  //     setFavourite(data.fave);
  //   }
  // }, [data]);

  return (
    <>
      <Card className={classes.root}>
        <a href={data.link} target="_blank" rel="noopener noreferrer">
          <CardActionArea>
            {youtube ? (
              <CardMedia
                image={data.img}
                className={classes.media}
                title={data.title}
              />
            ) : (
              <CardMedia className={classes.media}>
                <div className={classes.logo}>
                  <Image
                    quality="100"
                    width={65}
                    height={65}
                    quality={100}
                    src={data.img}
                    className={classes.img}
                  />
                </div>
              </CardMedia>
            )}
          </CardActionArea>
        </a>

        <CardContent>
          <div className={classes.title}>
            <Typography gutterBottom variant="h6">
              {data.title}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <IconButton
            size="small"
            onClick={handleComplete}
            color={complete ? "primary" : "default"}
          >
            <CheckCircleIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleFavourite}
            color={favourite ? "primary" : "default"}
          >
            <FavoriteIcon />
          </IconButton>
          {/* <IconButton
            size="small"
            onClick={() => setLater(!later)}
            color={later ? "primary" : "default"}
          >
            <WatchLaterIcon />
          </IconButton> */}

          {/* <IconButton
            size="small"
            style={{ marginLeft: "auto" }}
            onClick={() => handleOpen(true)}
          >
            <NotesIcon />
          </IconButton> */}
        </CardActions>
      </Card>

      <ContentDetails setOpen={setOpen} open={open} img={data.img} />
    </>
  );
}
