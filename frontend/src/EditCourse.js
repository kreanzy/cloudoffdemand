import React, { useEffect, useState } from "react";
import { Paper, Typography, Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CourseForm from "./components/Course/CourseForm";
import MyDialog from "./components/MyDialog";
import GetCourseData from "./services/getCourseData";

const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(5),
        margin: theme.spacing(3),
        color: theme.palette.text.secondary,
        backgroundColor: "#424242",
        borderRadius: 15,
    },
}));

export default function EditCourse(props) {
    const search = props.location.search; // returns the URL query String
    const params = new URLSearchParams(search);
    const CID = params.get("cid");
    const classes = useStyles();
    const [tutor, setTutor] = useState();
    const [dialog, setDialog] = useState("");
    const [initialCourseData, setinitialCourseData] = useState(GetCourseData({CID:CID, mode: "edit", setAlert:setDialog}));

    useEffect(async () => {
        console.log(`data from main`, initialCourseData)
        try {
            var username = localStorage.getItem("username");
            var role = localStorage.getItem("role");
            console.log(JSON.stringify({ name: username, role: role }));
            if (role != "Tutor") {
                setDialog({
                    title: "How Student get into this page.",
                    open: true,
                    message: "!!!! HOW DID YOU GET IN HERE KIDS !!!!",
                    mainMessage: "Login to new account",
                    optionMessage: "Go Home Kids",
                    optionRefTo: "/",
                });
                await new Promise((resolve) => setTimeout(resolve, 20000));
                window.location.href = "/";
            }
            setTutor(username);
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

    const handleClose = () => {
        setDialog({ open: false });
    };

    return (
        <Grid
            container
            //direction="column"
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
                <Typography variant="h2" color="primary" gutterBottom>
                    <Box fontWeight="fontWeightBold" m={1}>
                        Edit Course
                    </Box>
                </Typography>
            </Grid>
            <Grid item xs={10}>
                <Paper
                    className={classes.paper}
                    variant="outlined"
                    component="div"
                    elevation={3}
                >
                    <CourseForm
                        className={classes.root}
                        tutor={tutor}
                        setDialog={setDialog}
                        mode="edit"
                        propsCourseData={initialCourseData}
                        noValidate
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}
