import { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography , Button , Select ,MenuItem,Avatar } from '@material-ui/core'
import TextFieldSmall from '../TextFieldSmall'
import axios from 'axios';


const useStyles = makeStyles((theme) => ({

    title: {
        color: '#0EED0E',
        marginTop: '1rem',
        marginBottom:'1rem',
        fontWeight:700
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

    paper: {
        padding: theme.spacing(2),
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

    courseImage:{
        margin: 'auto',
        width:'100%',
        height:theme.spacing(20),
        display:'flex'
        
    },


    Button:{
        backgroundColor :'#212121',
        border:'1.5px solid',
        bordercolor:'#0EED0E',
        padding: '3px',
        margin: '1rem',
        color:'primary',
        '&:hover': {
            backgroundColor: '#212121',
            boxShadow: 'none',
          },
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

export default function SearchCourse() {

    const [result,setResult] = useState(false);
    const [searchData, setSearchData] = useState({
        course_name:'',
        tutor_name: '',
        subject: '',
        minprice:'',
        maxprice:''
    });
    const [courses,setCourses] = useState([]);

    const handleChangeSearch = (key) => (event) => {
        setSearchData({
            ...searchData,
            [key]: event.target.value,
        })
        
    }
  
    const handleClick = () => {
      search();
      handleResult();
      console.log( courses);
    };
    const search = async () => {
        
            
        const { data } = await axios.post('/search_course',{
            course_name: searchData.course_name,
            tutor_name: searchData.tutor_name,
            subject : searchData.subject,
            minprice : searchData.minprice==='' ? '0':searchData.minprice ,
            maxprice : searchData.maxprice==='' ? '9999':searchData.maxprice 
            });
        setCourses( data.result );    
        console.log( data.err);
        };

      
    const handleResult = () => {
        result === true ? setResult(false):setResult(true);
        
      };

    const classes = useStyles();

    console.log( courses);
    return (
      <Container fixed>
        <Typography variant="h4"  className={classes.title}>Search Course </Typography>
        <Paper className={classes.paper}>
            <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={3}>
                    <Typography variant = 'h5' className = {classes.typography}> Course Name : </Typography>
                </Grid>
                <Grid item xs={9}>
                <TextFieldSmall
                value={searchData['course_name']}
                onChange={handleChangeSearch('course_name')}

                />
                </Grid>
                <Grid item xs={3}>
                    <Typography variant = 'h5' className = {classes.typography}> Tutor Name : </Typography>
                </Grid>
                <Grid item xs={9}>
                <TextFieldSmall
                value={searchData['tutor_name']}
                onChange={handleChangeSearch('tutor_name')}

                />
                </Grid>
                <Grid item xs={3}>
                    <Typography variant = 'h5' className = {classes.typography}> Subject : </Typography>
                </Grid>
                <Grid item xs={9}>
                <Select fullWidth className={classes.dropdown} defaultValue='' onChange={handleChangeSearch('subject')} >
                    <MenuItem value={''} >
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Mathematics'}>Mathematics</MenuItem>
                    <MenuItem value={'Sciences'} >Sciences</MenuItem>
                    <MenuItem value={'Social Studies'}>Social Studies</MenuItem>
                    <MenuItem value={'Languages'}>Languages</MenuItem>
                    <MenuItem value={'Arts'}>Arts</MenuItem>
                    <MenuItem value={'Others'}>Others</MenuItem>
                </Select>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant = 'h5' className = {classes.typography}> Price : </Typography>
                </Grid>
                <Grid item xs={4}>
                <TextFieldSmall
                    placeholder="Min"
                    value={searchData['minprice']}
                    onChange={handleChangeSearch('minprice')}

                />
                </Grid>
                <Grid item xs={1} alignContent='center'>
                    <Typography variant = 'h5' className = {classes.typography} align='center'> -</Typography>
                </Grid>
                <Grid item xs={4}>
                <TextFieldSmall
                    placeholder="Max"
                    value={searchData['maxprice']}
                    onChange={handleChangeSearch('maxprice')}
                />
                </Grid>
                <Button variant="outlined" color="primary" fullWidth className={classes.Button} onClick={handleClick}  > Search </Button>
            </Grid>
        </Paper>
        {courses.length ===0 ? 
            <Typography variant="h4" className={classes.title} >No Results </Typography>
        
            : <Typography variant="h4" className={classes.title} > Result </Typography>}
        {courses.map((course) => (
                <Paper className = {classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Avatar src= {'data:image/jpg;base64,'+ course.photo_buffer } variant='square' className={classes.courseImage}/>
                        </Grid>
                        <Grid item xs={4} className={classes.gridItem} direction='column' justify='flex-start' alignContent='flex-start' >
                            <Typography variant="h4" className={classes.coursedetail}> {course.name} </Typography>
                            <Typography variant="subtitle1" className={classes.coursedetail}>By {course.tutor} </Typography>
                            <Typography variant="subtitle1" className={classes.coursedetail}>Subject : {course.subject} </Typography>
                            <Typography variant="subtitle1" className={classes.coursedetail}>Price : {course.price} Baht </Typography>
                            <Typography variant="subtitle1" className={classes.coursedetail}>Rating : {course.rating} </Typography>

                        </Grid>
                        <Grid item xs={4} className={classes.gridItem} direction='column' justify='flex-end' alignContent='flex-end'>
                            <Button variant="outlined" color="primary" fullWidth className={classes.detailButton} href={'/course/'+course._id} > see detail </Button>
                        </Grid>
                        
                    </Grid>


                </Paper>

            ))}

      </Container>
    )
}