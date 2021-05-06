import React , { useState, useEffect } from "react";
import { Box, Grid, makeStyles, Typography, Button } from '@material-ui/core'
import axios from 'axios'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    typography: {
        color: '#FFFFFF',
    },
    grow: {
        flexGrow: 1,
    },
    buttonMore: {
        background: theme.palette.background.default,
        color: '#FFF',
        '&:hover': {
            background: theme.palette.primary.main,
            color: '#000',
         },
         marginBottom: '8px'
    },
    buttonFollow: {
        color: '#000',
        '&:hover': {
            background: theme.palette.primary.main,
            color: '#FFF',
         },
    }
}));

export default function QuestionCard(props) {
    const {_id, topic, subject, creator, follow, ...prop} = props
    const classes = useStyles()
    const history = useHistory()
    const [isFollow, setIsFollow] = useState(follow)

    const handleFollow = () => {
        axios.post("http://localhost:4000/question", {
            id: _id,
            username: localStorage.getItem('username')
        }).then(response => {
            console.log(response.data)
            if (response.data.description == "follow") {
                setIsFollow(true)
            } else {
                setIsFollow(false)
            }
        }).catch(err => {
            console.error(err)
        })
    }

    const handleMore = () => {
        history.push("/qanda/info?id=" + _id)
        window.location.reload();
    }

    return (
        <Box display="flex" bgcolor="background.light2" borderRadius={8} {...props}>
            <Box display="flex" bgcolor="background.light2" flexDirection="column">
                <Typography variant="h5" className={classes.typography}>
                    {topic}
                </Typography>
                <Typography variant="h6" className={classes.typography}>
                    by {creator}
                </Typography>
                <Typography variant="h6" className={classes.typography}>
                    Subject: {subject}
                </Typography>
            </Box>
            <Box className={classes.grow} />
            <Box display="flex" bgcolor="background.light2" flexDirection="column" alignItems="spacce-between">
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {handleMore()}}
                    className={classes.buttonMore}
                >
                    See more
                </Button>
                <Button
                    variant={isFollow ? "contained" : "outlined"}
                    onClick={handleFollow}
                    className={classes.buttonFollow}
                    style={ {background: (isFollow ? "#0EED0E" : "#191919"), color: (isFollow ? "#191919" : "#FFF")}}
                >
                    {isFollow ? 'Followed' : 'Follow'}
                </Button>
            </Box>
            
        </Box>
    )
}