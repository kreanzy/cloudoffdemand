import React ,{ useState ,useEffect, } from 'react'

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { Button ,Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useFileUpload } from "use-file-upload";
import Avatar from '@material-ui/core/Avatar';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '100%',
      },
    },
    filled: {
      background: "white",
      borderRadius: 10
    },
    paper: {
      padding: theme.spacing(5),
      margin : theme.spacing(3),
      color: theme.palette.text.secondary,
      backgroundColor: '#424242',
      borderRadius: 15
    },
    input: {
      display: 'none',
    },
    image: {
      margin : theme.spacing(3),
      width: theme.spacing(30),
      height: theme.spacing(30),
    },
    video: {
      margin : theme.spacing(3),
      width: theme.spacing(30),
      height: theme.spacing(30),
    },
    button: {
      margin : theme.spacing(3),
      width: theme.spacing(20),
      height: theme.spacing(7),
    },
    icon: {
      marginLeft : theme.spacing(2),
      marginRight : theme.spacing(2),
    },
    gridroot: {
      margin : theme.spacing(3),
      width: '95%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: '#424242',
      borderRadius: 20
    },
    gridList: {
      width: 500,
      height: 450,
    },
}));

const initialCourseData = {
  tutor:"",
  name: "",
  subject: "",
  description: "",
  price: "",
  link: ""
}

const subject = [
  {value: 'Mathematics',    label: 'Mathematics',},
  {value: 'Science',        label: 'Science',},
  {value: 'Social Studies', label: 'Social Studies',},
  {value: 'Language',       label: 'Language',},
  {value: 'Arts',           label: 'Arts',},
  {value: 'Other',          label: 'Other',},
];

function AddCourse() {

  const classes = useStyles();
  const [courseData, setCourseData] = useState(initialCourseData);
  const [errors, setErrors] = useState({});
  const [files, selectFiles] = useFileUpload();
  const [videos, selectVideos] = useFileUpload();
  const [alert, setAlert] = React.useState({
    open: false,
    message:"",
    vertical: 'top',
    horizontal: 'center',
  });

  useEffect(() => {
    try {
      var user = JSON.parse( localStorage.getItem('user') )
      if(user.role != 'Tutor'){
        window.alert('!!!! HOW DID YOU GET IN HERE KIDS !!!!')
        window.location.href = "/";
      }
      setCourseData({
        ...courseData,
        tutor: user.username
      })
      console.log(JSON.stringify(user))
    }catch{
      setAlert({
        ...alert,
        message: "Please Login First",
        open: true,
      })
      window.location.href = "/";
    }
  }, [1]);

  const defaultSrc = "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-620x600.jpg"

  const validate = (fieldValues = courseData) => {
    let temp = { ...errors }
    if ('name' in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required."
    if ('tutor' in fieldValues)
      temp.tutor = fieldValues.tutor ? "" : "Please Login First"
    if ('subject' in fieldValues)
      temp.subject = fieldValues.subject ? "" : "This field is required."
    if ('price' in fieldValues){
      temp.price = temp.price || fieldValues.price ? "" : "This field is required."
      temp.price = temp.price || (/^[0-9]{1,10}$/).test(fieldValues.price) ? temp.price : "Price should be integer."
      temp.price = temp.price || fieldValues.price.length < 6 ? temp.price : "Price is too expensive."
      temp.price = temp.price || fieldValues.price ? temp.price : "This field is required."
    }
    if ('link' in fieldValues)
      temp.link = (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/).test(fieldValues.link) || !fieldValues.link ? "" : "URL is not valid."
    if ('attatch_photo' in fieldValues)
      temp.attatch_photo = files ? "" : "Course's Image is required."
    setErrors({
        ...temp
    })

    if (fieldValues == courseData)
        return Object.values(temp).every(x => x == "")
  }

  useEffect(() => {
    files ? validate({ attatch_photo: files}) : validate({ desc: ""} )
  }, [files]);


  const handleChangeInput = e => {
    const {name, value} = e.target
    setCourseData({
      ...courseData,
      [name]: value
    })
    validate({ [name]: value })
  }

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  const handleSubmit = e => {

    e.preventDefault()

    if(errors.tutor){
      window.alert(errors.tutor);
      window.location.href = "/";
    }
    
    if(validate()){
      //await new Promise(resolve => setTimeout(resolve, 2000));
      let formData = new FormData();
      for(let key in courseData){
        formData.append(key,courseData[key]);
      }
      let attatch_videos = [];
      // for(let video in videos){
      //   attatch_video.push(video.file)
      //   formData.append('attatch_video[]', video.file)
      // }
      var nVideo = videos.length;
      for(var i=0; i<nVideo ;i++){
        formData.append('attatch_video_'+i, videos[i].file);
      }
      formData.append('attatch_photo', files.file)
      formData.append('attatch_photo_src', files.source)
      formData.append('attatch_video', videos);
      formData.append('total_video', nVideo);
      //window.alert(JSON.stringify({context:'Creating Course',data:{...courseData, attatch_photo : files.file }}, null, 2));
      console.log(attatch_videos)
      console.log([...formData])
      axios
          .post("http://localhost:4000/create_course", formData, { 
            crossdomain: true, })
          .then(response => {
              /*console.log("response: ", response)
              var isSuccess = response.data.result;
              if(isSuccess){
               alert(`Course Registered !!!`);
               window.location.href = "/course";
              }else{
               alert(`Register Failed\n${response.data.error}`);
              }*/
              setAlert({
                ...alert,
                title:"Create Course Success!" ,
                open : true,
                message : "Create Success !!",
                optionButton:"Add another course"
              });
          })
          .catch(err => {
            setAlert({
              ...alert,
              title:"Create Course Failed" ,
              open : true,
              message : "An Error Occured, Please try again later.\n" + err,
              optionButton:"Try Again"
            });
            console.error(err)
          })
      }else{
        setAlert({
          ...alert,
          title:"Create Course Failed" ,
          open : true,
          message : "Some Fields Are Not Valid",
          optionButton: ""
        });
        //window.alert('Information not valid', JSON.stringify(courseData, null, 2));
      }
  }

  return (
    <Grid
      container
      //direction="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Dialog
        open = {alert.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby = "alert-dialog-slide-title"
        aria-describedby = "alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{alert.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {alert.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => window.location.href = "/courses"} color="primary">
            Go Home
          </Button>
          
          {alert.optionButton == "" ? 
          <Button onClick={handleClose} color="primary">
            Continue
          </Button> : 
          <Button onClick={() => window.location.reload()} color="primary">
            {alert.optionButton}
          </Button>}
        </DialogActions>
      </Dialog>

      <Grid item xs={12}>
        <Typography variant="h2" color='primary' gutterBottom>
          <Box fontWeight="fontWeightBold" m={1}>
            Create Course
          </Box>
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Paper className = {classes.paper} variant="outlined" component='div' elevation={3}>
          <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} >
                <Grid container justify="space-around" alignItems="center">
                  <Grid item xs={12} md={6}>
                    <Avatar 
                    className = {classes.image}
                    src={files?.source || defaultSrc} alt="preview" 
                    onChange = { () => { validate({ attatch_photo : files })} }/>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={1} direction="column" justify="space-between" alignItems="center">
                      <Grid item>
                        <input 
                          accept="image/*" 
                          className={classes.input} 
                          id="icon-button-file" 
                          type="file" 
                          value={courseData.attatch_photo} 
                          onChange = { () => { console.log('image input activated') }} 
                        />
                        <label htmlFor="icon-button-file" color="primary" >
                          <IconButton color="primary" aria-label="upload picture" component="span" variant="contained" 
                            onClick = { () => { 
                              selectFiles({ accept: "image/*" }, ({ name, size, source, file }) => {
                                console.log("Files Selected", { name, size, source, file });
                              })
                              //.then( () => {validate({ attatch_photo : files })} )

                            }}
                          >  
                            <PhotoCamera fontSize="large" className={classes.icon}/>
                            <div> Upload Course Photo  </div>
                          </IconButton>
                        </label>
                      </Grid>
                      <Grid item>
                        <TextField 
                        disabled
                        fullWidth
                        label = {errors.attatch_photo ? "!!    Please Upload Image    !!" : ""}
                        {...(errors.attatch_photo && {error:true,helperText:errors.attatch_photo})}
                        />
                      </Grid>
                    </Grid>
                    
                  </Grid>
                </Grid>
                <br/><br/>
                <Grid item xs={12}>
                  <TextField
                    className={classes.filled}
                    label = "Course Name"
                    value = {courseData.name}
                    name = "name"
                    variant="filled"
                    onChange={handleChangeInput}
                    fullWidth
                    {...(errors.name && {error:true,helperText:errors.name})}
                  />
                </Grid>
                <Grid container spacing={3} justify="space-between">
                  <Grid item xs={5}>
                    <TextField
                      className={classes.filled}
                      variant="filled"
                      label = "Course Price"
                      placeholder="1000"
                      name = "price"
                      onChange={handleChangeInput}
                      value = {courseData.price}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">Baht</InputAdornment>,
                      }}
                      {...(errors.price && {error:true,helperText:errors.price})}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      select
                      variant="filled"
                      className={classes.filled}
                      label="Select Course Subject"
                      name = "subject"
                      onChange={handleChangeInput}
                      value={courseData.subject}
                      {...(errors.subject && {error:true,helperText:errors.subject})}
                    >
                      {subject.map(option => (
                        <MenuItem className={classes.filled} key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.filled}
                    multiline 
                    rows = "4"
                    variant="filled"
                    label = "Course Description"
                    placeholder="Course Description"
                    name = "description"
                    onChange={handleChangeInput}
                    value = {courseData.description}
                    rowsMax={5}
                    fullWidth
                    {...(errors.description && {error:true,helperText:errors.description})}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.filled}
                    label = "Link to your course material (Link or Drive)"
                    name = "link"
                    onChange={handleChangeInput}
                    value = {courseData.link}
                    variant="filled"
                    fullWidth
                    {...(errors.link && {error:true,helperText:errors.link})}
                  />
                </Grid>
                <br/><br/>
                <Grid
                  container
                  direction="column"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick = { () => { 
                        selectVideos({ multiple: true }, (videos) => {
                          // Note callback return an array
                          videos.map(({ source, name, size, file }) =>{
                            console.log({ source, name, size, file })
                          })
                          // Todo: Upload to cloud.
                        })
                        //.then( () => {validate({ attatch_photo : files })} )

                      }}
                    >
                      <Typography component="div"> Upload Course Video </Typography>
                      <CloudUploadOutlinedIcon className={classes.icon}></CloudUploadOutlinedIcon>
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    {videos ? (
                      <div className={classes.gridroot}>
                      <br/><br/>
                      <GridList cellHeight={180} className={classes.gridList}>
                        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                          <ListSubheader component="div" color="primary">Video List</ListSubheader>
                        </GridListTile>
                        {videos.map((video) => (
                          <GridListTile key={video.source}>
                            <img src={video.source} alt={video.name} />
                            <GridListTileBar
                            title={video.name}
                            subtitle={<span>size: {video.size}</span>}
                            /*actionIcon={
                              <IconButton aria-label={`info about ${video.name}`} className={classes.icon}>
                                <InfoIcon />
                              </IconButton>
                            }*/
                            />
                          </GridListTile>
                          ))}
                      </GridList>
                      </div>
                    ) : (
                      <Typography variant="caption" display="block" gutterBottom color='primary'>
                        <Box m={1}>
                        <br/>
                          No File Uploaded.
                        </Box>
                      </Typography>
          
                    )}
                  
                  {//<Grid item xs={3}>
                  }

                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      className={classes.button}
                      text="Submit"
                      onClick={handleSubmit}
                    />
                  </Grid>
                </Grid>

          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AddCourse
