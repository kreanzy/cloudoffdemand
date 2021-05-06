import React from 'react'
import { MenuItem, makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        background: "white",
        borderRadius: 10
    },
}))

export default function Select(props) {

    const { className, variant, name, label, value,error=null, onChange, options, ...others } = props;
    const classes = useStyles();

    return (
        <TextField
            select
            className={className || classes.root}
            variant= {variant || "filled"}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...(error && {error:true,helperText:error})}
        >
            {options.map(option => (
            <MenuItem className={className || classes.root} key = {option.label} value={option.value}>
                {option.label}
            </MenuItem>
            ))}
        </TextField>
    )
}