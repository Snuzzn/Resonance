import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import { MyContext } from "./context";
import useSWR from "swr";
import fetcher from "../util/fetcher";
import { useRouter } from "next/router";

import { IoMusicalNotes } from "react-icons/io5";
import { RiArticleFill } from "react-icons/ri";
import { HiDotsCircleHorizontal, HiPhotograph } from "react-icons/hi";
import { MdMovie } from "react-icons/md";
import { FaBook, FaPodcast, FaBloggerB } from "react-icons/fa";
import { AiFillYoutube, AiFillShopping } from "react-icons/ai";

const mediaIcons = {
  All: <HiDotsCircleHorizontal />,
  Videos: <AiFillYoutube />,
  Articles: <RiArticleFill />,
  Photos: <PhotoSizeSelectActualIcon />,
  Sound: <IoMusicalNotes />,
  Podcasts: <FaPodcast />,
  Shopping: <AiFillShopping />,
  Books: <FaBook />,
  Movies: <MdMovie />,
  Blogs: <FaBloggerB />,
};

const useStyles = makeStyles((theme) => ({
  mediaContainer: {
    marginBottom: theme.spacing(2),
    "& > *": {
      margin: theme.spacing(0.5),
      padding: theme.spacing(2),
    },
  },

  cardGrid: {},
}));

export default function MediaTypes({ currMedium, setCurrMedium, media }) {
  const classes = useStyles();

  const { type, setType } = React.useContext(MyContext);
  const router = useRouter();
  const { data, error } = useSWR(
    `/api/get-types?topic=${router.query.name}`,
    fetcher
  );
  const handleClick = (medium) => {
    // console.log(medium + "dsfd");
    setType(medium);
  };
  // console.log(type);

  return (
    <div className={classes.mediaContainer}>
      {data &&
        data.map((medium) => (
          <Chip
            key={medium}
            icon={mediaIcons[medium]}
            size="small"
            label={medium}
            color={type === medium ? "primary" : "default"}
            onClick={() => handleClick(medium)}
          />
        ))}
    </div>
  );
}
