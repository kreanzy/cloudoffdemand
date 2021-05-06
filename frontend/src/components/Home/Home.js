import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Grid, Paper, Typography , Button , Avatar } from '@material-ui/core'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import axios from "axios";




const useStyles = makeStyles((theme) => ({

    typography: {
        color: '#FFFFFF',
        marginTop: '1rem',
        marginBottom:'1rem'
    },
 
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
      },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        background : '#4f4f4f',
        
        
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

    detailButton:{
        backgroundColor :'#212121',
        border:'1.5px solid',
        bordercolor:'#0EED0E',
        padding: '3px',
        color:'primary',
        '&:hover': {
            backgroundColor: '#212121',
            boxShadow: 'none',
          },
    }
}));

export default function Home() {

    const classes = useStyles();
    const [promotions,setPromotions] = useState([]);
    const [courseOfTheWeek,setCourseOfTheWeek] = useState([]);

    useEffect(() => {
        const fecthPromotion = async () => {
            const { data } = await axios.get('/home/?element=promotions');
            setPromotions( data.data );
            

            
        };
        fecthPromotion();
    },[]);

    useEffect(() => {
        const fecthCourseOfTheWeek = async () => {
            const { data } = await axios.get('/home/?element=courses');
            setCourseOfTheWeek( data.data );
            
        };
        fecthCourseOfTheWeek();
    },[]);

    return (
      <Container fixed>
          <Box p={2}>
            <Typography variant="h4" className={classes.typography} >
            Up next
            </Typography>
            <GridList className={classes.gridList} cols={1}>
                { promotions.map((promotion) => (
                    <GridListTile >
                    <img src= {'data:image/jpg;base64,'+promotion.photo_buffer.toString('base64')} />
                    <GridListTileBar key={promotion._id} title={promotion.name} />
                </GridListTile>
                ))}
            </GridList>
        </Box>
        <Box p={2}>
            <Paper className={classes.paper}>
            <Typography variant="h5" align="center" className={classes.typography}>
                    สัมผัสประสบการณ์การเรียนรู้ กับ OffDemand 
                ในหลากหลายช่องทาง หลากหลายรูปแบบที่ไร้ขีดจำกัด…
            </Typography>
            </Paper>
        </Box>
        <Box p ={2}>
            <Typography variant="h4" className={classes.typography}>
                Course of the week
            </Typography>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    {courseOfTheWeek.map((course) => (
                        <Grid item xs={3}>
                        <Paper className={classes.courseofweek} key = {course._id}>
                        <Avatar src= {'data:image/jpg;base64,'+course.photo_buffer.toString('base64')} variant='square' fullWidth className={classes.courseImage}/>
                        <Typography align='center' variant="subtitle1" className={classes.typography}> {course.name} </Typography>
                        <Button variant="outlined" color="primary" fullWidth className={classes.detailButton} href={'/course/'+course._id} > see detail </Button>
                        </Paper>
                        </Grid>

                    ))}
                
                </Grid>
            </Paper>
        </Box>
         
      </Container>
    )
}