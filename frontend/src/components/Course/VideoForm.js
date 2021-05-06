import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFileUpload } from "use-file-upload";
import { styled } from "@material-ui/core/styles";
import VideoThumbnail from "react-video-thumbnail";
import FormComponents from "../FormComponents/FormComponents.js";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import { green } from "@material-ui/core/colors";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
  Button,
  Grid,
  Box,
  Typography,
  makeStyles,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import RenameForm from "./RenameForm.js";

const myCourseURL = "/mycourses";

const GridIcon = styled(({ color, ...other }) => <IconButton {...other} />)({
  color: (props) => (props.color === "red" ? "red" : " #00ff23 "),
  margin: 3,
});

const useStyles = makeStyles((theme) => ({
  video: {
    margin: theme.spacing(3),
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  icon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  gridicon: {
    color: (props) =>
      props.color === "red"
        ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
        : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  },
  gridroot: {
    margin: theme.spacing(3),
    width: "95%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundColor: "#424242",
    borderRadius: 20,
  },
  gridList: {
    width: 1000,
    height: 500,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  loading: {
    width: 1000,
    height: 500,
  },
  iconBox:{
    display:"flex"
  }
}));

const humanFileSize = (size) => {
  var i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
};

const CourseVideo = (props) => {
  const {
    tutor: curTutor,
    setDialog: setAlert,
    CID,
    mode,
    getInitialCourseData,
    cName,
  } = props;
  const [videos, setVideos] = useState([]);
  const [popup, setPopup] = useState("");
  const [newVideos, selectNewVideos] = useFileUpload();
  const classes = useStyles(props);
  const [initialCourseData, setinitialCourseData] = useState({
    status: "loading",
  });
  const [loading, setLoading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  console.log(CID);
  console.log(`initialCourseData video form`, initialCourseData);

  useEffect(() => {
    console.log("begin Init");
    getInitialCourseData().then((initData) => {
      console.log(`initialCourseData from useEffect`, initData);
      setinitialCourseData(initData);
      if (mode === "edit") {
        console.log("set init Video");
        setVideos(initData.attatch_video);
      } else {
        setinitialCourseData({ ...initData, name: cName });
      }
    }).catch(async (err) => {
      await new Promise((resolve) => setTimeout(resolve, 20000));
      window.location.href = myCourseURL;
    });
  }, [1]);

  useEffect(() => {
    console.log(`videos`, videos);
  }, [videos]);

  const handleSubmit = () => {
    let formData = new FormData();
    var nVideo = videos?.length;
    let total_size = 0;
    for (var i = 0; i < nVideo; i++) {
      total_size += parseInt(videos[i].size);
      formData.append("attatch_video_" + i, videos[i].file);
      formData.append("attatch_video_name_" + i, videos[i].name);
      formData.append("attatch_video_size_" + i, videos[i].size);
      formData.append("attatch_video_type_" + i, videos[i].file.type);
    }
    formData.append("total_video", nVideo);
    formData.append("id", CID);
    if(total_size < 16777215){
    console.log("submited", [...formData]);
    setLoading(true);
    axios
      .post("http://localhost:4000/add_video", formData, {
        crossdomain: true,
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      })
      .then((response) => {
        console.log("response: ", response);
        var isSuccess = response.data.result;
        if (isSuccess) {
          var cid = response.data.id;
          setAlert({
            title: mode === "create" ? "Add Course's Video Success!" : "Edit Course's Video Success!",
            open: true,
            message: mode === "create" ? "Add Video Successfully." : "Edit Video Successfully.",
            optionMessage: "Back",
            optionRefTo: myCourseURL,
          });
        } else {
          setLoading(false);
          setUploadPercentage(0);
          alert.open != true && setAlert({
            title: mode + " Video Fail!" ,
            open: true,
            message: mode + " Video not successful. There're something wrong during uploading video to the server. Please contact admin or try again later.",
            submessage: "Error: " + response.data.error.code,
            optionMessage: "Try Again",
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        setUploadPercentage(0);
        setAlert({
          title: "There are Server Failure",
          open: true,
          message:
            "An error occured during sending results to server, Please try again later and make sure that server is on.",
          submessage: err.name + ": " + err.message,
          optionMessage: "Try Again",
        });
        console.error(err);
      });
    }else{
      setAlert({
        open:true,
        title: "Total Video size Exceeding size Limit. !!",
        message:"The total video size exceed size limit. The maximum size that allow to uploaded videos is 16 Mb. Please make sure that total size of video is below 16 Mb and try again.",
        submessage:"Total video size is " + humanFileSize(total_size) ,
        mainMessage:" ",
        mainOnClick: () => {
          setAlert({ open: false });
        } ,
        optionMessage:""
      })
    }
  };

  const handleClose = () => {
    setPopup({ open: false });
  };

  return (
    <div>
      {initialCourseData.status == "loading" ? (
        <CircularProgress size={150} />
      ) : (
        <Grid
          container
          //direction="column"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography variant="h6" color="primary" gutterBottom>
              <Box fontWeight="fontWeightBold" m={1}>
                Course name: {initialCourseData.name}
              </Box>
            </Typography>
            <FormComponents.SingleFieldPopup
              title="Change Video's Name"
              open={popup.open}
              handleClose={handleClose}
            >
              <RenameForm
                value={popup.value}
                setValue={(newValue) => {
                  setVideos(
                    videos.map((item, id) =>
                      id === popup.index ? { ...item, name: newValue } : item
                    )
                  );
                }}
                handleClose={handleClose}
              />
            </FormComponents.SingleFieldPopup>
          </Grid>
          <Grid item xs={12}>
            {videos?.length > 0 ? (
              <div className={classes.gridroot}>
                <br />
                <br />
                <GridList cellHeight={250} className={classes.gridList}>
                  <GridListTile
                    key="Subheader"
                    cols={2}
                    style={{ height: "auto" }}
                  >
                    <ListSubheader component="div" color="primary" variant="h5">
                      Video List
                    </ListSubheader>
                  </GridListTile>
                  {videos.map((video, index) => (
                    <GridListTile key={`${index}${video.name}`}>
                      <VideoThumbnail
                        videoUrl={video.source}
                        thumbnailHandler={(thumbnail) => console.log(thumbnail)}
                        width={425}
                        height={240}
                      />
                      <GridListTileBar
                        title={video.name}
                        subtitle={
                          <span>size: {humanFileSize(video.size)}</span>
                        }
                        actionIcon={
                          <Box className={classes.iconBox}>
                            <GridIcon
                              id={index}
                              aria-label={`rename id ${index}`}
                              onClick={(event) => {
                                console.log("edit click at ", index);
                                setPopup({
                                  open: true,
                                  value: videos[index].name,
                                  index: index,
                                });
                              }}
                            >
                              <EditTwoToneIcon />
                            </GridIcon>
                            <GridIcon
                              id={video.id}
                              aria-label={`delete id ${video.id}`}
                              color="red"
                              onClick={(event) => {
                                console.log("delete click at ", index);
                                setVideos(
                                  videos.filter((item, id) => id !== index)
                                );
                              }}
                            >
                              <DeleteTwoToneIcon />
                            </GridIcon>
                          </Box>
                        }
                      />
                    </GridListTile>
                  ))}
                </GridList>
              </div>
            ) : (
              <Typography
                variant="h5"
                display="block"
                gutterBottom
                color="secondary"
                align="center"
              >
                <Box m={1}>
                  <br />
                  Currently, No Video Uploaded.
                </Box>
              </Typography>
            )}
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <div className={classes.wrapper}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={async () => {
                  selectNewVideos(
                    { accept: "video/*", multiple: true },
                    (selectvideos) => {
                      let videoLessSize = []
                      let exceedName = []
                      selectvideos.map(({ source, name, size, file }, index) => {
                        console.log({ source, name, size, file });
                        if(size < 16777215){
                          videoLessSize.push({ source, name, size, file });
                        }else{
                          exceedName.push(name)
                        }
                      });
                      if(videoLessSize.length != selectvideos.length){
                        setAlert({
                          open:true,
                          title: "Some Video Exceed size Limit. !!",
                          message:"There are video exceed size limit. The maximumsize that allow to uploaded videos is 16 Mb. The video that exceed the size limit will not uploaded to the server.",
                          submessage:"there are " +  exceedName.length + " video exceed size limit. => " + exceedName,
                          mainMessage:" ",
                          mainOnClick: () => {
                            setAlert({ open: false });
                          } ,
                          optionMessage:""
                        })
                      }
                      setVideos([...videos, ...videoLessSize]);
                    }
                  );
                  //console.log(nVideo)
                  console.log("select Done.");
                }}
                disabled={loading}
              >
                <Typography component="div"> Add More Video </Typography>
                <CloudUploadOutlinedIcon className={classes.icon} />
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </Grid>
          {loading && (
            <Grid item xs={12}>
              <FormComponents.MyProgressBar value={uploadPercentage} />
            </Grid>
          )}
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <FormComponents.SimpleButton
              text="Submit"
              onClick={handleSubmit}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      )}
    </div>
  );
};

export default CourseVideo;
