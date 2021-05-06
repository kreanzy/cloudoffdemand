import React, { useEffect, useState } from "react";
import FormComponents from "../FormComponents/FormComponents.js";
import { Form, useForm } from "../useForm.js";
import {
    Grid,
    Box,
    makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    button: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        padding: theme.spacing(1)
    }
}));


const RenameForm = (props) => {
    const { value, setValue, handleClose } = props
    const classes = useStyles();

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        temp.name = fieldValues.name != "" ? "" : "Video's name cannot be empty.";
        setErrors((errors) => ({
            ...temp,
        }));
        return Object.values(temp).every((x) => x == "");
    };

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
    } = useForm({ name: value }, true, validate);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate) {
            setValue(values.name)
            handleClose()
        }
    }

    return (
        <Grid
            container
            //direction="column"
            justify="space-between"
            alignItems="center"
        >
            <Grid item xs={12}>
                <FormComponents.TextInput
                    fullWidth
                    label="Video's Name"
                    name="name"
                    onChange={handleInputChange}
                    value={values.name}
                    error={errors.name}
                />
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4} />
            <Grid item xs={4}>
                <FormComponents.SimpleButton
                    text="Save Changes"
                    onClick={handleSubmit}
                />
            </Grid>
        </Grid>
    )
}

export default RenameForm
