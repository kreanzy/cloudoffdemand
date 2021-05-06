import React from "react";
import { makeStyles } from "@material-ui/core";
import ReactPlayer from 'react-player'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: "56.25%" /* Player ratio: 100 / (1280 / 720) */,
    justifyItems: "center"
  },
  player: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: 'translate(-50%, -50%)'
  },
}));

const MyVideoPlayer = ({url}) => {
    const classes = useStyles();
  return (
    <div className={classes.wrapper}>
    <ReactPlayer
      className={classes.player}
      url={url}
      controls={true}
      width='80%'
      height='80%'
    />
  </div>
  )
};

export default MyVideoPlayer;
