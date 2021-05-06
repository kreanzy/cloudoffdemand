import React from 'react'
import { Button as MuiButton, makeStyles } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        margin : theme.spacing(3),
        width: theme.spacing(20),
        height: theme.spacing(7),
        background: 'linear-gradient(45deg, #00cb00  30%,   #b8ff76 90%)'
    }
}))

export default function SimpleButton(props) {

    const { text, size, color, variant, onClick, className, ...other } = props
    const classes = useStyles();

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            className = {className || classes.root}
            // classes={{ root: classes.root, label: classes.label }}
        >
            {text}
        </MuiButton>
    )
}