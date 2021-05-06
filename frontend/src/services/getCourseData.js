import React, { useState, useEffect } from "react";
import axios from "axios";
import b64toBlob from "./b64toBlob";

const myCourseURL = "/myCourse";

const initialCourseData = {
  tutor: "",
  name: "",
  subject: "",
  description: "",
  price: "",
  link: "",
  attatch_photo: "",
  attatch_video: "",
  student: [],
  score: [],
  review: [],
};

function GetCourseData(props) { 
  console.log("Calling GetCoureData");
  const { CID, mode, setAlert, setData } = props;
  const student =localStorage.getItem('username');
  return new Promise((resolve, reject) => {
    if (mode == "edit" || mode == "read") {
      console.log("get course edit or read mode from user: ",student)
      console.log(`CID from getData is null:`, CID == 'undefined');
      console.log(`CID from getData`, CID);
      if (CID == 'undefined') {
        setAlert({
          title: "We probably dont know what course you are looking for",
          open: true,
          message:
            "We dont know what course you are looking for. Please try again later. Please contact admin for more information.",
          mainMessage: "Go Home",
          optionMessage: "Go to My Course",
          optionRefTo: myCourseURL,
        });
        resolve({ name: "error CID" });
      } else {
        let apiURL = `http://localhost:4000/course?id=${CID}&student_name=${student}`
        axios
          .get(apiURL, { crossdomain: true })
          .then((response) => {
            console.log("response: ", response);
            var isSuccess = response.data.result;
            if (isSuccess) {
              let tempVideos = [];
              let n = response.data.data.total_video;
              for (let i = 0; i < n; i++) {
                let video = response.data.data.video_buffer[i];
                let video_type = response.data.data.video_type[i];
                const video_blob = b64toBlob(video, video_type);
                const video_blobUrl = URL.createObjectURL(video_blob);
                tempVideos.push({
                  name: response.data.data.video_name[i],
                  source: video_blobUrl,
                  size: response.data.data.video_size[i],
                  file: video_blob,
                  type: video_type,
                });
              }
              let photo = response.data.data.photo_buffer;
              const photo_blob = b64toBlob(photo, "image/jpg");
              const photo_blobUrl = URL.createObjectURL(photo_blob);
              console.log("Found");
              let returnThings = {
                ...response.data.data,
                attatch_photo: {
                  source: photo_blobUrl,
                  file: photo_blob,
                },
                attatch_video: tempVideos,
                photo_buffer: "",
                video_buffer: "",
                id:CID
              };
              console.log(`returnThings`, returnThings);
              resolve(returnThings);
            } else {
              console.log("Not Found");
              resolve(initialCourseData);
            }
          })
          .catch((err) => {
            setAlert({
              title: "Failed to connect the server",
              open: true,
              message:
                "An error occured during sending results to server, Please try again later and make sure that server is on.",
              submessage: err.name + ": " + err.message,
              optionMessage: "Try Again Later",
              optionRefTo: myCourseURL,
            });
            console.error("catch error from getCourseData", err);
            resolve({ name: "error" });
          });
      }
      //return ({ ...initialCourseData, name: "test Edit" });
    } else {
      resolve(initialCourseData);
    }
  });
}

export default GetCourseData;
