import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import YouTubeIcon from "@material-ui/icons/YouTube";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import { IoMusicalNotes } from "react-icons/io5";
import { RiArticleFill } from "react-icons/ri";
import { FaPodcast } from "react-icons/fa";

const mediaIcons = {
  All: <HiDotsCircleHorizontal />,
  Videos: <YouTubeIcon />,
  Articles: <RiArticleFill />,
  Photos: <PhotoSizeSelectActualIcon />,
  Sound: <IoMusicalNotes />,
  Podcasts: <FaPodcast />,
};

const useStyles = makeStyles((theme) => ({
  mediaContainer: {
    marginBottom: theme.spacing(1),
    "& > *": {
      margin: theme.spacing(0.5),
      padding: theme.spacing(2),
    },
  },

  cardGrid: {},
}));

export default function MediaTypes({ currMedium, setCurrMedium, media }) {
  const classes = useStyles();
  const handleClick = (medium) => {
    setCurrMedium(medium);
  };

  return (
    <div className={classes.mediaContainer}>
      {media.map((medium) => (
        <Chip
          key={medium}
          icon={mediaIcons[medium]}
          size="small"
          label={medium}
          color={currMedium == medium ? "primary" : "default"}
          onClick={() => handleClick(medium)}
        />
      ))}
    </div>
  );
}
