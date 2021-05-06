import React ,{ useState ,useEffect  } from 'react'
import IconButton from '@material-ui/core/IconButton';
import { Card, Grid, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Button ,Box, withStyles, CardHeader, CardContent } from '@material-ui/core';

import CourseCardStudent from './CourseCardStudent'
import MyDialog from "./components/MyDialog";
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    button : {
        padding: '10px',
        paddingLeft: '50px',
        paddingRight: '50px',
        marginButtom: '1rem',
        marginTop:'1rem',
      }

}));



function MyCourseStudent() {
    //const [selectedCourse, selectedCourse] = useState();
    const classes = useStyles();
    const [courseList,setCourseList] = useState([]);
    const [student, setStudent] = useState();
    const [dialog, setDialog] = useState("");

    const handleClose = () => {
        setDialog({ open: false });
      };


    useEffect(async () => {
        
        try {
            var username = localStorage.getItem("username");
            var role = localStorage.getItem("role");
            console.log(JSON.stringify({ name: username, role: role }));
            if (role != "Student") {
                setDialog({
                    title: "How Tutor get into this page.",
                    open: true,
                    message: "!!!! HOW DID YOU GET IN HERE KIDS !!!!",
                    mainMessage: "Login to new account",
                    optionMessage: "Go Home Kids",
                    optionRefTo: "/",
                });
                await new Promise((resolve) => setTimeout(resolve, 20000));
                window.location.href = "/";
            }
            setStudent(username);
        } catch {
            setDialog({
                title: "We are currently don't know you",
                message: "Please Login First",
                open: true,
                mainMessage: "Login to new account",
                optionMessage: "Go Home",
                optionRefTo: "/",
            });
            await new Promise((resolve) => setTimeout(resolve, 20000));
            window.location.href = "/";
        }
    }, [1]);


   
    useEffect(() => {
        axios.get("/student_course", {
            params: {
                username: localStorage.getItem("username")
            }
        }).then(response => {
                console.log(response.data.result)
                setCourseList(response.data.result)
            }).catch(err => {
                console.error(err)
            })
      }, []);


    return(
        <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
        >
            <Grid item xs={12}>
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
                <Typography variant="h2" color='primary' gutterBottom>
                    <Box fontWeight="fontWeightBold" m={1}>
                        My Course
                    </Box>
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h2" color='primary' gutterBottom>
                    <Box fontSize={30}>
                        Total Course : {courseList.length}
                    </Box>
                </Typography>
            </Grid>
            

            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {courseList.map(course => (
                    <Grid item xs={12} key={courseList.indexOf(course)}>
                        
                        <CourseCardStudent course={course} />
                     </Grid>
                ))}
            </Grid>

        </Grid>
    );
}

export default MyCourseStudent