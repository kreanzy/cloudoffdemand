import React from "react";
import { TextField,  makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    textField: {
        marginBottom: 8,
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
    },
    inputTextField: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
    typography: {
        color: '#FFFFFF',
    },
}));

export default function TextFieldSmall(props) {

    const classes = useStyles();
    const {display, ...prop} = props

    return (
        <>
            <Typography variant="h6" className={classes.typography}>{display}</Typography>
            <TextField
                className={classes.textField}
                variant="outlined"
                size="small"
                color="primary"
                fullWidth
                InputProps={{
                    className: classes.inputTextField,
                }}
                {...prop}
            />
        </>
    )
}