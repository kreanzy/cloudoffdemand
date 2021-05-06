import React from 'react'
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        background: "white",
        borderRadius: 10
    },
}))

export default function TextInput(props) {

    const {className, variant, name, label, value,error=null, onChange, ...others } = props;
    const classes = useStyles();

    return (
        <TextField
            className={className || classes.root}
            variant= {variant || "filled"}
            label={label}
            placeholder={label}
            name={name}
            value={value}
            onChange={onChange}
            {...others}
            {...(error && {error:true,helperText:error})}
        />
    )
}