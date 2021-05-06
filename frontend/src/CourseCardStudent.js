import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button , Grid,Paper,Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
      display: 'flex',
      width: '80%',
      backgroundColor: '#424242',
      color: 'white',
      padding: theme.spacing(1),

      //fontSize: '100%'
  },
  oldbutton: {
    width: theme.spacing(65),
    height: theme.spacing(5),
    margin: theme.spacing(4),
    backgroundColor: theme.palette.background.main,
    //float: 'right'
    color: '#FFF',
      '&:hover': {
          background: theme.palette.primary.main,
          color: '#000',
       },
  },
  header: {
    color: 'white'
  },
  content: {
    color: 'white'
  },
  media: {
    paddingTop: "30%"
  },
  title: {
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
    
    marginBottom:'auto',
    variant:'h6'
},
gridItem: {
    display:'flex',
},
textFieldSmall: {
    marginBottom: 8,
},
gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
paper: {
    padding: theme.spacing(2),
    borderRadius:'1rem',
    margin: '1rem',
    background : '#4f4f4f',
    
    
},
dropdown: {
    marginBottom: 8,
    height:40,
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
    height: 'auto',
    padding : theme.spacing(1),
    background: '#9f9f9f',

},
courseImage:{
    margin: 'auto',
    width:'100%',
    height:theme.spacing(20),
    
},
courseText:{
    align: 'center'
},
margin:{
    margin:theme.spacing(1)
},
Button:{
    backgroundColor :'#212121',
    border:'1.5px solid',
    bordercolor:'#0EED0E',
    padding: '3px',
    marginButtom: '1rem',
    marginTop:'1rem',
    color:'primary',
    '&:hover': {
        backgroundColor: '#212121',
        boxShadow: 'none',
      },
},
}))

export default function CourseCardStudent(props){
    const classes = useStyles();
    const theme = useTheme(); 
    const {_id, name, tutor, price, subject, desc, rating, student, img, ...other} = props.course
    const defaultImage = 
        "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-620x600.jpg"

    return (

        <Paper className = {classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Avatar src= {'data:image/jpg;base64,'+ props.course.photo_buffer } variant='square' className={classes.courseImage}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridItem} direction='column' justify='flex-start' alignContent='flex-start' >
                            <Typography variant="h4" className={classes.coursedetail}> {props.course.name} </Typography>
                            <Typography variant="subtitle1" className={classes.coursedetail}>By {props.course.tutor} </Typography>
                            <Typography variant="subtitle1" className={classes.coursedetail}>Subject : {props.course.subject} </Typography>
                            <Typography variant="subtitle1" className={classes.coursedetail}>Price : {props.course.price} Baht </Typography>
                            <Typography variant="subtitle1" className={classes.coursedetail}>Rating : {props.course.rating} </Typography>

                        </Grid>
                        <Grid item xs={4} className={classes.gridItem} direction='column' justify='flex-end' alignContent='flex-end'>
                        <Button variant="outlined" color="primary" fullWidth className={classes.Button}href={'/Lesson/'+props.course._id}>
                        Go to lesson
                        </Button>
                        <Button variant="outlined" color="primary" fullWidth className={classes.Button} target="_blank" href={props.course.link} >
                        Course Materials
                        </Button>
                        </Grid>
                        
                    </Grid>


                </Paper>
    )
}
