import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography , Button ,Avatar} from '@material-ui/core'
import axios from 'axios'
import Rating from '@material-ui/lab/Rating';


const useStyles = makeStyles((theme) => ({


    typography: {
        marginTop: '1rem',
        color: '#FFFFFF',
    },
    comment: {
        color: '#FFFFFF',
        marginTop: '1rem',
        marginBottom:'1rem'
    },
    coursetitle:{
        color: '#FFFFFF',
        marginLeft:'1rem'
    },
    coursedetail:  {
        color: '#FFFFFF',
        marginLeft:'3rem',
        marginTop:'auto',
        marginBottom:'auto',
        variant:'h2'
    },
    ButtonBlock: {
        display:'flex',
        justifyContent:'flex-end',
      },
    paper: {
        padding: theme.spacing(2),
        marginTop:'3rem',
        background : '#4f4f4f',
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
    rating:{
        color:'#0EEd0E'
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
    }
}));

export default function CourseScreen(props) {

    const classes = useStyles();
    const [course,setCourse] = useState({
        review: [],
        score: []
    });
    const [listener,setListener] = useState(false);
    const [QRcode,setQRcode] = useState([]);
    const [showQRcode,setShowQRcode] = useState(false);
    const zip = (a, b) => a.map((k, i) => [k, b[i]]);

    useEffect(() => {
        const fecthCourse = async () => {
            const { data } = await axios.get('/course',{params:{
                id : props.match.params.id,
                student_name : localStorage.getItem('username')
            }    
            });
            setCourse( data.data );
            
        
        };
        fecthCourse();
        
    },[]);

    const fecthQRcode = async () => {
        const { data } = await axios.post('/payment',{
            tutor: course.tutor,
            price : course.price
            });
        setQRcode( data.data );    
        
        };
        
    const enroll = async () => {
        if (listener === false){
            setListener(true)
            await axios.post('/payment/done',{
                id: props.match.params.id,
                username: localStorage.getItem('username')
                });  
            
        }
            
        
        };


    const handleQRcode =  () => {
        fecthQRcode();
        setShowQRcode(true);
        console.log(QRcode);
        
        
      };
    

    if(!course){
        return (
            <Typography variant='h2' align='center' className={classes.typography}>Class Not Found</Typography>
        )

    }

    return (
      <Container fixed>
        <Paper className={classes.paper}>
            <Grid className={classes.margin} >
                <Typography className={classes.coursetitle} variant='h5'> Course Name : { course.name }</Typography>
            </Grid>

            <div className='row'padding='1rem'>
                <div className='col'>
                    <Avatar src={'data:image/jpg;base64,'+ course.photo_buffer } variant='square' className={classes.courseImage} />
                </div>
                <div className='col'>
                    <Typography className={classes.coursedetail} variant='h6' >By : { course.tutor }</Typography>
                    <Typography className={classes.coursedetail} variant='h6'>Subject : { course.subject }</Typography>
                    <Typography className={classes.coursedetail} variant='h6'>Price : { course.price } Baht</Typography>
                    <Typography className={classes.coursedetail} variant='h6'>Rating : { course.rating }</Typography>
                    <Typography className={classes.coursedetail} variant='h6'>Number of Video : { course.total_video }</Typography>
                    

                </div>
                <div className={classes.margin} >
                    <Typography className={classes.coursetitle} variant='h6'>Description :</Typography>
                    
                </div>
                    <Typography className={classes.coursedetail}  > {course.description} </Typography>
                
            </div>
        </Paper>
    
        <div className={classes.ButtonBlock} >
        
        {localStorage.getItem('role') === 'Tutor' ? 
            <br/>
            :
            course.Isenroll === true ? <br/> : showQRcode === false ?
                    
                    <Button variant="outlined" align='end' color="primary" className={classes.Button} onClick={handleQRcode} >enroll</Button>
                    :
                    <Button variant="outlined" align='end' color="primary" className={classes.Button} onClick={enroll()} href='/mycourses' >done</Button>
                }
        <Button variant="outlined" align='end' color="primary" className={classes.Button}  href='/' >back</Button>

        </div>
        {course.Isenroll === true &&
            <Typography className={classes.typography} >You've already enrolled in this class</Typography>
            
            
        }
        {localStorage.getItem('role') === 'Tutor' &&
            <Typography className={classes.typography} >Tutor cannot enroll to any course </Typography>
            
        }


        {showQRcode === true &&
            <div className='row' display='flex' justifyContent='justify-center'>
                
                <img src={'data:image/jpg;base64,'+ QRcode.qr} className={classes.qrcode} align= 'center' />
                
            </div>
                    }

            <Typography className={classes.typography} variant='h6'>Reviews ( {course.score.filter((score)=> score >- 1).length} )</Typography>
                
                {zip(course.review,course.score).filter((review) => review[1] > -1  ).map((review) => 
                    
                    <Paper className={classes.paper}>
                        <Rating name="half-rating " className={classes.rating} defaultValue={parseInt(review[1],10)/2} precision={0.5} readOnly />
                        <Typography className={classes.comment}>{review[0]}</Typography>
                    </Paper>
                    
            
                )} 
        

      </Container>
    )
}