import React from "react";
import { TextField,  makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    textField: {
        "& .MuiOutlinedInput-root": {
            "& fieldset": { 
                borderRadius: "10px",
                borderColor: "primary",
                marginTop: 5,
            },
            "&.Mui-focused fieldset": {
                borderColor: "primary",
                borderWidth: "2px",
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
        marginLeft: 8,
        fontWeight: 'bold'
    },
}));

export default function EditTextField(props) {

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