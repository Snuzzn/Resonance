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
} from "@material-ui/core";
import NotesIcon from "@material-ui/icons/Notes";
import FavoriteIcon from "@material-ui/icons/Favorite";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ContentDetails from "./ContentDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    paddingTop: "56.25%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    borderRadius: "1em",
    alignSelf: "center",
    marginTop: "1em",
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
}));

export default function ContentCard({ img }) {
  const classes = useStyles();
  const [favourite, setFavourite] = React.useState(false);
  const [later, setLater] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [complete, setComplete] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={img}
            title="Contemplative Reptile"
          />
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
