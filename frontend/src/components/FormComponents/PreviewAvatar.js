import React from 'react'
import { Avatar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        margin : theme.spacing(3),
        width: theme.spacing(30),
        height: theme.spacing(30),
    }
}))


const PreviewAvatar = (props) => {
    const {className, src, onChange, alter, defaultSrc, variant, ...others} = props
    const classes = useStyles();
    const rootSrc = "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-620x600.jpg"

    return (
        <Avatar 
            className = {className || classes.root}
            variant= {variant ||"rounded"}
            src = {src || defaultSrc || rootSrc} 
            alt = { alter || "preview" }
            {...others}/>
    )
}

export default PreviewAvatar
