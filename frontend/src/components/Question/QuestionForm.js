import React, { useEffect, useState } from "react";
import FormComponents from "../FormComponents/FormComponents.js";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import { useFileUpload } from "use-file-upload";
import { Form, useForm } from "../useForm.js";
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
    Avatar
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import axios from "axios";

const myCourseURL = "/myCourse";
const qnaURL = "/";

const useStyles = makeStyles((theme) => ({
    textRoot: {
        //'& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: "100%",
        color: "#fc1919",
        //},
    },
    icon: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    image: {
        margin: theme.spacing(3),
        width: theme.spacing(60),
        height: theme.spacing(30),
        borderRadius: 10
    },
}));

const initialQuestionData = {
    topic: "",
    subject: "",
    content: "",
}

const subject = [
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "Social Studies", label: "Social Studies" },
    { value: "Language", label: "Language" },
    { value: "Arts", label: "Arts" },
    { value: "Other", label: "Other" },
];

const QuestionForm = (props) => {
    const { username, mode, setDialog: setAlert } = props;
    const [photos, selectPhotos] = useFileUpload();
    const classes = useStyles();
    console.log(`cur User question Form ${username}`);

    useEffect(() => {
        photos ? validate({ photo: photos }) : validate({ foo: "" });
    }, [photos]);

    const validate = (fieldValues = { ...questionData, photo: photos }) => {
        let temp = { ...errors };
        if ("topic" in fieldValues)
            temp.topic = fieldValues.topic != "" ? "" : "This field is required.";
        if ("content" in fieldValues)
            temp.content = fieldValues.content != "" ? "" : "This field is required.";
        if ("username" in fieldValues)
            temp.username = fieldValues.username != "" ? "" : "Please Login First";
        if ("subject" in fieldValues)
            temp.subject = fieldValues.subject != "" ? "" : "This field is required.";
        if ("photo" in fieldValues) 
            temp.photo = fieldValues.photo ? "" : "Question's Image is required.";
        setErrors((errors) => ({
            ...temp,
        }));
        console.log("fieldValues", fieldValues);
        //console.log({ ...questionData, photo: photos });
        console.log(`errors from validate${JSON.stringify(errors)}`);
        //console.log(`temp from validate${JSON.stringify(temp)}`);

        if (fieldValues == { ...questionData, photo: photos })
            console.log(
                "Validate Return",
                Object.values(temp).every((x) => x == "")
            );
        return Object.values(temp).every((x) => x == "");
    };

    const {
        values: questionData,
        setValues: setQuestionData,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(initialQuestionData, true, validate);

    useEffect(() => {
        console.log(`cur User question Form useEffect ${username}`);
        setQuestionData({ ...questionData, username: username });
        console.log(`Data's user from useEffect ${JSON.stringify(questionData.username)}`);
    }, [username]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Sumbit Hit");
        console.log(`cur user from course question Submit ${username}`);
        console.log(`Data's user from submit ${JSON.stringify(questionData.username)}`);
        console.log(`Data from submit ${JSON.stringify(questionData)}`);

        if (validate()) {
            let formData = new FormData();
            for (let key in questionData) {
                formData.append(key, questionData[key]);
            }
            formData.append('attatch_photo', photos.file);
            console.log([...formData]);
            axios
                .post("http://localhost:4000/create_question", formData, { crossdomain: true, })
                .then((response) => {
                    console.log("response: ", response);
                    var isSuccess = response.data.result;
                    if (isSuccess) {
                        var cid = response.data.id;
                        setAlert({
                            title: mode === "create" ? "Create Question Success!" : "Edit Question Success!",
                            open: true,
                            message:
                                "Create Successfully. Please wait for the tutor to answer",
                            optionMessage: "Back",
                            optionRefTo: qnaURL,
                            //optionRefTo : `/course_video?cid=${cid}`,
                        });
                    } else {
                        setAlert({
                            title: mode === "create" ? "Create Question Fail!" : "Edit Question Fail!",
                            open: true,
                            message: mode === "create" ? "Create Question Failed" : "Edit Question Failed",
                            submessage: response.data.error,
                            optionMessage: "Try Again",
                        });
                    }
                })
                .catch((err) => {
                    setAlert({
                        title: mode === "create" ? "Create Question Fail!" : "Edit Question Fail!",
                        open: true,
                        message:
                            "An error occured during sending results to server, Please try again later and make sure that server is on.",
                        submessage: err.name + ": " + err.message,
                        optionMessage: "Try Again",
                    });
                    console.error(err);
                });
        } else {
            if (errors.username) {
                setAlert({
                    title: "I don't know who R U",
                    open: true,
                    message: errors.username,
                    mainMessage: "Login",
                    optionMessage: "Go Home",
                    optionRefTo: "/",
                });
                await new Promise((resolve) => setTimeout(resolve, 20000));
                window.location.href = "/";
            } else {
                setAlert({
                    title: mode === "create" ? "Create Question Fail!" : "Edit Question Fail!",
                    open: true,
                    message: "Some Fields Are Not Valid",
                });
            }
            //window.alert( JSON.stringify({context:'Information not valid',data:courseData,error:errors}, null, 2));
        }
    };

    return (
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid item xs={12}>
                <FormComponents.TextInput
                    label="Topic"
                    value={questionData.topic}
                    name="topic"
                    onChange={handleInputChange}
                    error={errors.topic}
                    fullWidth
                />
            </Grid>
            <Grid container spacing={3} justify="space-between">
                <Grid item xs={5}>
                    <FormComponents.Select
                        label="Select Course Subject"
                        name="subject"
                        onChange={handleInputChange}
                        value={questionData.subject}
                        error={errors.subject}
                        options={subject}
                    />
                </Grid>
                <Grid item xs={5}>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <FormComponents.TextInput
                    multiline
                    rows="10"
                    label="Question Content"
                    name="content"
                    onChange={handleInputChange}
                    value={questionData.content}
                    fullWidth
                    error={errors.content}
                />
            </Grid>
            <br />
            <br />
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => {
                            selectPhotos({ accept: "image/*" }, ({ name, size, source, file }) => {
                                // Note callback return an array
                                console.log("Photo Selected", { name, size, source, file });

                                // Todo: Upload to cloud.
                            })

                        }}
                    >
                        <Typography component="div"> Upload Attatch Photo </Typography>
                        <CloudUploadOutlinedIcon className={classes.icon}></CloudUploadOutlinedIcon>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {photos ? (
                        <div>
                            <br />
                            <img className={classes.image} src={photos.source} alt='preview' />
                            <Typography variant="caption" display="block" gutterBottom color='primary'>
                                <Box m={1}>
                                    Name: {photos.name}
                                </Box>
                            </Typography>
                        </div>
                    ) : (
                        <Typography variant="caption" display="block" gutterBottom color='primary'>
                            <Box m={1}>
                                <br />
                          No Photo Uploaded.
                        </Box>
                        </Typography>

                    )}

                    {//<Grid item xs={3}>
                    }

                </Grid>
                <Grid item xs={4}>
                    <FormComponents.SimpleButton
                        text="Create"
                        onClick={handleSubmit}
                    />
                </Grid>
            </Grid>
        </Form >
    )
}

export default QuestionForm
