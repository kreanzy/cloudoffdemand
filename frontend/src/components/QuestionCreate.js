import React  from "react"
import { Box,  makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    typography: {
        color: '#FFFFFF',
    },
}));

export default function QuestionCreate() {

    const classes = useStyles()

    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between" width={1} mt={4} mb={2}>
                <Typography variant="h4" className={classes.typography}>
                    Create Question
                </Typography>
            </Box>
            <Box display="flex"  flexDirection="column" bgcolor="background.light2" py={4} px={4} borderRadius={8} mb={2}>
                <Box display="flex">
                    <Typography variant="h6" className={classes.typography} mb={2}>
                        Topic
                    </Typography>
                </Box>
                <Box display="flex">
                    <Typography variant="h6" className={classes.typography} mb={2}>
                        Subject
                    </Typography>
                </Box>
                <Box display="flex">
                    <Typography variant="h6" className={classes.typography} mb={2}>
                        Content
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}