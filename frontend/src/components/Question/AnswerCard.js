import React from "react";
import { Box, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    typography: {
        color: '#FFFFFF',
    },
    grow: {
        flexGrow: 1,
        marginBottom: '24px',
    },
}));

export default function QuestionMore(props) {

    const classes = useStyles()
    const {content, username, ...prop} = props

    return (
        <>
            <Box display="flex" flexDirection="column" bgcolor="background.light2" borderRadius={8} p={4} {...prop}>
                <Typography variant="h6" className={classes.typography}>
                    {content}
                </Typography>
                <div className={classes.grow} />
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h6" className={classes.typography}>
                        by {username}
                    </Typography>
                </Box>
            </Box>
        </>
    )
}