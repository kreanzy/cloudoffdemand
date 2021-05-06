import { Box, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import FormComponents from "../FormComponents/FormComponents";
import { Form, useForm } from "../useForm";
import MyDialog from "../../components/MyDialog";
import axios from "axios";

const useStyles = makeStyles({
  textMultiline: {
    width: "80%",
  },
});

const RatingForm = (props) => {
  const {CID,student_name} = props;
  const {
    values: ratingData,
    setValues: setRatingData,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm({ star: 2.5, review: "" }, false);
  const [dialog, setDialog] = useState("");

  const classes = useStyles();

  const handleClose = () => {
    setDialog({ open: false });
  };

  const handleSubmit = () => {
    if(ratingData.star < 0.5){
      setDialog({
        title:
          "Rating for this course is too low.",
        open: true,
        message:
          "The minimum start for each course is 0.5 star. Please check your rating again. Thank you."
    });
    }else{
      let sendingData = {review:ratingData.review  ,student_name:localStorage.getItem('username')  ,score:ratingData.star*2 , id:CID}
      console.log("sendingData",sendingData)
      axios
      .post("http://localhost:4000/student_course", sendingData, {
        crossdomain: true,
      })
      .then((response) => {
        console.log("response: ", response);
        var isSuccess = response.data.result;
        if (isSuccess) {
          setDialog({
            title:
              "Thank you for your feedback",
            open: true,
            message:
              "Your rating and review for this coures is successfully submit, Thank you for your feedback.",
            mainMessage: "Go to My Course",
            mainRefTo: '/mycourses',
          });
        } else {
          setDialog({
            title:
              "Submitting rating and review not successfull",
            open: true,
            message:
              "There are some error during sending your review. Please try again later.",
            mainMessage: "Go to My Course",
            submessage: "Error: " + (response.data.error[0].msg || response.data.error),
            mainRefTo: '/mycourses',
          });
        }
      })
      .catch((err) => {
        setDialog({
          title:
          "Submitting rating and review not successfull",
          open: true,
          message:
            "An error occured during sending results to server, Please try again later and make sure that server is on.",
          submessage: err.name + ": " + err.message,
          optionMessage: "Try Again",
        });
        console.error(err);
      });
    }
    
  };

  return (
    <div>
        <MyDialog
          title={dialog.title}
          open={dialog.open}
          handleClose={dialog.handleClose || handleClose}
          message={dialog.message}
          buttonOneRefTo={dialog.mainRefTo}
          buttonOneMessage={dialog.mainMessage}
          buttonTOneOnClick={dialog.mainOnClick}
          buttonTwoRefTo={dialog.optionRefTo}
          buttonTwoMessage={dialog.optionMessage}
          buttonTwoOnClick={dialog.optionOnClick}
          submessage={dialog.submessage}
        />
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <FormComponents.RatingStar
              star={ratingData.star}
              handleInputChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Box>
              <FormComponents.TextInput
                multiline
                rows="4"
                label="Write Review for ths course"
                name="review"
                onChange={handleInputChange}
                value={ratingData.review}
              />
            </Box>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={3}>
            <FormComponents.SimpleButton text="Submit" onClick={handleSubmit} />
          </Grid>
        </Grid>
      </Form>
    </div>
  );
};

export default RatingForm;
