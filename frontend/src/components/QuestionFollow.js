import React , { useState, useEffect } from "react"
import { Box, Grid, makeStyles, Typography, Button, } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import QuestionCard from './Question/QuestionCard'
import ButtonLink from './ButtonLink'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    typography: {
        color: '#FFFFFF',
    },
}));

export default function QuestionFollow() {

    const classes = useStyles()
    const [followQuestion, setFollowQuestion] = useState([])

    useEffect(() => {
        axios.get("http://localhost:4000/following_question", {
            params: {
                username: localStorage.getItem('username')
            }
        }).then(response => {
            setFollowQuestion(response.data.result)
            console.log(response.data.result)
        }).catch(err => {
            console.error(err)
        })
    }, []);

    const questionCardList = followQuestion.map(question => {
        const {topic, subject, creator, _id, ...ques} = question
        return (
            <QuestionCard mb={2} p={2} topic={topic} subject={subject} creator={creator} follow={true} _id={_id} />
        )
    })

    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" width={1} mt={4} mb={2}>
                <Typography variant="h4" className={classes.typography}>
                    Question List
                </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" width={1} mt={4} mb={2}>
                <Typography variant="h4" className={classes.typography}>
                    Total: {followQuestion.length}
                </Typography>
                <ButtonLink
                    variant="contained"
                    color="primary"
                    path='/create_question'
                    startIcon={<AddIcon />}
                    className={classes.navButton}
                >
                    Add Question
                </ButtonLink>
            </Box>
            {questionCardList}
        </Box>
    )
}