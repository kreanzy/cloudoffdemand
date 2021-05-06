import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Box,Button, Container, Grid,Avatar, Paper, Typography ,CircularProgress,} from '@material-ui/core'
import axios from 'axios'
import b64toBlob from "../../services/b64toBlob";
import MyDialog from "../MyDialog";
import FormComponents from "../FormComponents/FormComponents.js";
import { useForm } from "../useForm.js";
import MyVideoPlayer from "./MyVideoPlayer";
import GetCourseData from "../../services/getCourseData";
import Rating from '@material-ui/lab/Rating';
import RatingForm from "./RatingForm.js";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#FFFFFF",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  typography: {
    color: "#FFFFFF",
  },
  coursedetail: {
    color: "#FFFFFF",
    marginLeft: "3rem",
    marginTop: "auto",
    marginBottom: "auto",
    variant: "h6",
  },
  grid: {
    height: "100%",
    padding: "1rem",
  },
  textFieldSmall: {
    marginBottom: 8,
  },
  ButtonBlock: {
    display: "flex",
    justifyContent: "flex-end",
  },
  paper: {
    padding: theme.spacing(2),
    marginTop:'3rem',
    background : '#4f4f4f',
  },

    comment: {
        color: '#FFFFFF',
        marginTop: '1rem',
        marginBottom:'1rem'
    },
    typography: {
        color: '#FFFFFF',
    },
    coursedetail: {
        color: '#FFFFFF',
        marginLeft:'3rem',
        marginTop:'auto',
        marginBottom:'auto',
        variant:'h6'
    },
    grid: {
        height: '100%',
        padding : '1rem',
    },
    textFieldSmall: {
        marginBottom: 8,
    },
    ButtonBlock: {
        display:'flex',
        justifyContent:'flex-end',
      },
      "&.Mui-focused fieldset": {
        borderColor: "primary",
        borderWidth: "2px",
        height: 40,
        marginTop: 5,
      },
    
    rating: {
        color:'#0EED0E',

    },
    dropdown: {
        marginBottom: 8,
        width: '100%',
        height:50,
        "& .MuiOutlinedInput-root": {
            "& fieldset": { 
                borderRadius: "10px",
                borderColor: "primary",
                height: 40,
                marginTop: 5,
            },
            "&.Mui-focused fieldset": {
                borderColor: "primary",
                borderWidth: "2px",
                height: 40,
                marginTop: 5,
            },
        },
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },

  courseofweek: {
    height: "auto",
    padding: theme.spacing(1),
    background: "#9f9f9f",
  },
  courseImage: {
    margin: "auto",

    maxWidth: "100%",
  },
  qrcode: {
    marginTop: "2rem",
    maxWidth: "25rem",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  courseText: {
    align: "center",
  },
  margin: {
    marginTop: "2rem",
    marginBottom: "2rem",
    marginLeft: "1rem",
    marginRight: 0,
  },
  Button: {
    backgroundColor: "#212121",
    border: "1.5px solid",
    bordercolor: "#0EED0E",
    padding: "3px",
    marginLeft: "3rem",
    marginTop: "1rem",
    color: "primary",
    width: "10rem",
    "&:hover": {
      backgroundColor: "#212121",
      boxShadow: "none",
    },
  },
  videoFrame: {
    border: "1.5px solid",
    paddingTop: "10",
  },
  ratingPaper: {
    padding: theme.spacing(5),
    margin: theme.spacing(3),
    color: theme.palette.text.secondary,
    backgroundColor: "#424242",
    borderRadius: 15,
  },
    courseImage:{
        margin: 'auto',
        width:'90%',
        height:theme.spacing(25),

        
    },
    qrcode:{
        marginTop: '2rem',
        maxWidth: '25rem',
        display:'block',
        marginLeft:'auto',
        marginRight:'auto'
    },
    courseText:{
        align: 'center'
    },
    margin:{
        marginTop:'2rem',
        marginBottom:'2rem',
        marginLeft:'1rem',
        marginRight:0
    },
    Button:{
        backgroundColor :'#212121',
        border:'1.5px solid',
        bordercolor:'#0EED0E',
        padding: '3px',
        marginLeft: '3rem',
        marginTop: '1rem',
        color:'primary',
        width:'10rem',
        '&:hover': {
            backgroundColor: '#212121',
            boxShadow: 'none',
          },
    },
    videoFrame:{
        border:'1.5px solid',
        width:'80%',
        height:'800',
        paddingTop:'10'
    }
}));

export default function Lesson(props) {
  const classes = useStyles();
  const [course, setCourse] = useState({
    status: "loading",
  });
  const [videos, setVideos] = useState([]);
  const zip = (a, b) => a.map((k, i) => [k, b[i]]);
  const [VIDs, setVIDs] = useState([]);
  const [dialog, setDialog] = useState("");
  const getInitialCourseData = () =>
    GetCourseData({
      CID: props.match.params.id,
      mode: "read",
      student: props.match.params.student,
      setAlert: setDialog,
    });

  useEffect(() => {
    console.log("begin Init");
    getInitialCourseData()
      .then((initData) => {
        console.log(`initialCourseData from useEffect`, initData);
        setCourse(initData);
        console.log("set init Video");
        setVideos(initData.attatch_video);
        let n = initData.total_video;
        let tempID = [];
        for (let i = 0; i < n; i++) {
          tempID.push({
            label: "Video " + (i + 1) + ": " + initData.attatch_video[i].name,
            value: i,
          });
        }
        setVIDs(tempID);
      })
      .catch(async (err) => {
        await new Promise((resolve) => setTimeout(resolve, 20000));
        window.location.href = "/";
      });
  }, [1]);

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm({ id: "0" }, false);

  useEffect(() => {
    console.log(`values.id`, values.id);
  }, [values.id]);

  if (!course) {
    return (
      <Typography variant="h2" align="center" className={classes.typography}>
        Class Not Found
      </Typography>
    );
  }

  const handleClose = () => {
    setDialog({ open: false });
  };

  return (
    <div>
      {course.status == "loading" ? (
        <CircularProgress size={150} />
      ) : (
        <Container fixed>
          <Paper className={classes.paper}>
            <Grid className={classes.margin}>
              <Typography className={classes.typography} variant="h5">
                Course Name : {course.name}
              </Typography>
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
            </Grid>

            <div className='row'padding='1rem'>
                <div className='col'>
                    <Avatar src = {course.attatch_photo.source} variant='square' className={classes.courseImage} />
                </div>
                <div className='col'>
                    <Typography className={classes.coursedetail} >By : { course.tutor }</Typography>
                    <Typography className={classes.coursedetail} >Subject : { course.subject }</Typography>
                    <Typography className={classes.coursedetail} >Price : { course.price } Baht</Typography>
                    <Typography className={classes.coursedetail} >Rating : { course.rating }</Typography>
                    <Typography className={classes.coursedetail} >Number of Video : { VIDs.length }</Typography>

                </div>
                <div className={classes.margin} >
                    <Typography className={classes.typography} variant='h6'>Description :</Typography>
                    
                </div>
                    <Typography className={classes.coursedetail}  > {course.description} </Typography>
                
            </div>
          </Paper>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={6}>
              <FormComponents.Select
                fullWidth
                className={classes.dropdown}
                label="Select Video"
                name="id"
                onChange={handleInputChange}
                value={values.id}
                options={VIDs}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                className={classes.detailButton}
                target="_blank"
                href={course.link} 
              >
                {" "}
                Download course material{" "}
              </Button>
            </Grid>
            <Grid item xs={12}>
              {videos[values.id]?.source && (
                <MyVideoPlayer url={videos[values.id].source} />
              )}
            </Grid>
          </Grid>

        {localStorage.getItem('role') === 'Tutor' &&
            <div>
                <Typography className={classes.typography} variant='h6'>Enrolled students ( {course.student.length} )</Typography>
                {course.student.length>0 && <Paper className={classes.paper}>
                <Grid container spacing={3}>
                {course.student.map((student) => (
                    
                        <Grid item xs={4}>
                            <Typography className={classes.typography} > - {student} </Typography>
                        </Grid>
                       
                    
                 ))} 
                 </Grid>
                </Paper>}
                <Typography className={classes.typography} variant='h6'>Reviews ( {course.score.filter((score)=> score >- 1).length} )</Typography>
                
                {zip(course.review,course.score).filter((review) => review[1] > -1  ).map((review) => 
                    
                    <Paper className={classes.paper}>
                        <Rating name="half-rating " className={classes.rating} defaultValue={parseInt(review[1],10)/2} precision={0.5} readOnly />
                        <Typography className={classes.comment}>{review[0]}</Typography>
                    </Paper>
                    
            
                )} 
                
            </div>
            
        }
        

          {localStorage.getItem("role") === "Student" && (
            <Box>
              <Typography className={classes.typography} variant="h6">
                Rate This Course
              </Typography>
              <Paper
                className={classes.ratingPaper}
                variant="outlined"
                component="div"
                elevation={3}
              >
                <RatingForm
                  CID = {props.match.params.id}
                  student_name = {props.match.params.student}
                />
              </Paper>
            </Box>
          )}
        </Container>
      )}
    </div>
  );
}
