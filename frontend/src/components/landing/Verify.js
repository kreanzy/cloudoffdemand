import React, { useState } from "react"
import { makeStyles, Box, Button, Typography, TextField } from '@material-ui/core'
import TextFieldSmall from '../TextFieldSmall'
import axios from 'axios'
import CustomSnackbar from '../CustomSnackbar'

const useStyles = makeStyles((theme) => ({
    typography: {
        color: '#FFFFFF',
        marginBottom: 16,
    },
}));

export default function Verify(props) {
    
    const classes = useStyles()
    const [code, setCode] = useState('')
    const [alert, setAlert] = useState(false)

    const handleChangeCode = (event) => {
        setCode(event.target.value)
    }

    const handleVerify = () => {
        axios.post("http://localhost:4000/verification", {
                code: code,
            }).then(response => {
                console.log(response.data)
                const result = response.data.result
                if (result) {
                    props.setState(0)
                } else {
                    console.log("can't verify")
                }
            }).catch(err => {
                console.error(err)
            })
    }

    return (
        <Box display="flex" flexDirection="column">
            <Typography variant="h4" className={classes.typography}>
                Verify e-mail address
            </Typography>
            <Typography variant="h6" className={classes.typography} style={{ marginBottom: 32 }}>
                A verification code has been sent to your registered e-mail address. Please enter in the box below.
            </Typography>
            <TextFieldSmall
                style={{ marginBottom: 16 }}
                display='Verification code'
                autoFocus
                value={code}
                onChange={handleChangeCode}
            />
            <Button
                variant="outlined"
                color="primary"
                onClick={() => {handleVerify()}}
            >
                Continue
            </Button>
        </Box>
    )
}