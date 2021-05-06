import React , { useState } from "react"
import { Box, Grid, makeStyles, Typography, Button, MenuItem } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import QuestionCard from './Question/QuestionCard'
import ButtonLink from './ButtonLink'
import TextFieldSmall from './TextFieldSmall'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    typography: {
        color: '#FFFFFF',
    },
}));

export default function QuestionBoard() {

    const classes = useStyles()
    const subjectList = ['All Subject', 'Mathematics', 'Sciences', 'Social Studies', 'Languages', 'Arts', 'Others']

    const [questionData, setQuestionData] = useState({
        result: '',
        isFollow: '',
        error: '',
    })
    const {result, isFollow, error} = questionData
    const questionList = result
    const [searchData, setSearchData] = useState({
        topic: '',
        username: '',
        subject: '',
    })

    const handleChangeQuestion = (key) => (event) => {
        setQuestionData({
            ...questionData,
            [key]: event.target.value,
        })
    }

    const handleChangeSearch = (key) => (event) => {
        setSearchData({
            ...searchData,
            [key]: event.target.value,
        })
    }

    const handleSearchQuestion = async () => {
        console.log(searchData.topic)
        axios.get("http://localhost:4000/question", {
            params: {
                topic: searchData.topic,
                username: searchData.username,
                subject: (searchData.subject == 'All Subject' ? '' : searchData.subject),
                student_name: localStorage.getItem('username')
            }
        }).then(response => {
            setQuestionData(response.data)
        }).catch(err => {
            console.error(err)
        })
    }

    const questionCardList = (Array.from(Array(questionList.length).keys())).map(num => {
        const {topic, subject, creator, _id} = questionList[num]
        return (
            <QuestionCard mb={2} p={2} topic={topic} subject={subject} creator={creator} _id={_id} follow={isFollow[num]} key={_id}/>
        )
    })

    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between" width={1} mt={4} mb={2}>
                <Typography variant="h4" className={classes.typography}>
                    Q & A
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

            <Box bgcolor="background.light2" py={4} px={4} borderRadius={8} mb={2}>
            <Grid container>
                <Grid item xs={1}>
                    <Typography variant="h6" className={classes.typography} mb={2}>
                        Topic :
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <TextFieldSmall
                        value={searchData['topic']}
                        onChange={handleChangeSearch('topic')}
                    />
                </Grid>
                <Grid item xs={1}>

                </Grid>
                <Grid item xs={1}>
                    <Typography variant="h6" className={classes.typography} mb={2}>
                        Creator :
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <TextFieldSmall
                        value={searchData['username']}
                        onChange={handleChangeSearch('username')}
                    />
                </Grid>
                <Grid item xs={1}>

                </Grid>
                <Grid item xs={1}>
                    <Typography variant="h6" className={classes.typography} mb={2}>
                        Subject :
                    </Typography>
                    
                </Grid>
                <Grid item xs={6}>
                    <TextFieldSmall
                        value={searchData['subject']}
                        onChange={handleChangeSearch('subject')}
                        select
                    >
                        {subjectList.map(subject => (
                            <MenuItem key={subject} value={subject}>
                                {subject}
                            </MenuItem>
                        ))}
                    </TextFieldSmall>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {handleSearchQuestion()}}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
            </Box>



            <Typography variant="h4" className={classes.typography}>
                Result ({questionList.length})
            </Typography>
            <Box mt={2}>
                {questionCardList}
            </Box>
        </Box>
    )
}