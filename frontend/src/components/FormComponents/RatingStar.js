import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";

const labels = {
  0.5: "Very Useless",
  1: "Useless",
  1.5: "Very Poor",
  2: "Poor",
  2.5: "Slightly Ok",
  3: "Ok",
  3.5: "Good",
  4: "very Good",
  4.5: "Excellent",
  5: "very Excellent",
};

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "320",
    display: "flex",
    alignItems: "center",
  },
  hover: {
    color: "#FFFFFF",
    marginTop: "auto",
    marginBottom: "auto",
  },
  star:{
    color:'#0EED0E'
  }
});

const RatingStar = (props) => {
  const { handleInputChange, star } = props;

  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Rating
        name="star"
        value={star}
        precision={0.5}
        className={classes.star}
        onChange={handleInputChange}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        size="large"
      />
      {star !== null && (
        <Box ml={2}>
          <Typography className={classes.hover} variant='body2' >{labels[hover !== -1 ? hover : star]}</Typography>
        </Box>
      )}
    </div>
  );
};

export default RatingStar;
