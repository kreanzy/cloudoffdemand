import React, { useEffect, useState } from "react";
import { Paper, Typography, Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MyDialog from "./components/MyDialog";
import QuestionForm from "./components/Question/QuestionForm";

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

const CreateQuestion = () => {
    const classes = useStyles();
    const [dialog, setDialog] = useState("");
    const [user, setUser] = useState()

    useEffect(async () => {
        try {
            var username = localStorage.getItem("username");
            var role = localStorage.getItem("role");
            console.log(JSON.stringify({ name: username, role: role }));
            setUser(username);
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
                        Create Question
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
                    <QuestionForm
                        className={classes.root}
                        mode="create"
                        username={user}
                        setDialog={setDialog}
                        noValidate
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default CreateQuestion
