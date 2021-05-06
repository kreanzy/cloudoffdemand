import React, { useState } from "react"
import { makeStyles, Box, Button, Typography, TextField } from '@material-ui/core'
import TextFieldSmall from '../TextFieldSmall'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    typography: {
        color: '#FFFFFF',
        marginBottom: 16,
    },
}));

export default function ForgetName(props) {

    const classes = useStyles()
    const [data, setData] = useState({
        fname: '',
        lname: '',
        username: '',
        password: '',
        confirmPassword: '',
        code: '',
    })

    const handleChangeData = (key) => (event) => {
        setData({
            ...data,
            [key]: event.target.value,
        })
    }

    const handleForget = () => {
        if (data.password != data.confirmPassword) {
            console.log('pass not match')
            return
        }
        axios.post("http://localhost:4000/reset_password", {
            fname: data.fname,
            lname: data.lname,
            username: data.username,
            password: data.password,
            code: data.code,
        }).then(response => {
            props.setState(0)
        }).catch(err => {
            console.log("can't reset")
        })
    }

    return (
        <Box display="flex" flexDirection="column">
            <Typography variant="h4" className={classes.typography}>
                Verify Information
            </Typography>
            <Typography variant="h6" className={classes.typography} style={{ marginBottom: 32 }}>
                Enter your First name and Last name to continue. New password will be sent to your registered e-mail.
            </Typography>
            <TextFieldSmall
                display='Firstname'
                value={data['fname']}
                onChange={handleChangeData('fname')}
            />
            <TextFieldSmall
                display='Lastname'
                value={data['lname']}
                onChange={handleChangeData('lname')}
            />
            <TextFieldSmall
                display='Username'
                value={data['username']}
                onChange={handleChangeData('username')}
            />
            <TextFieldSmall
                display='New Password'
                type='password'
                value={data['password']}
                onChange={handleChangeData('password')}
            />
            <TextFieldSmall
                display='Confirm New Password'
                type='password'
                value={data['confirmPassword']}
                onChange={handleChangeData('confirmPassword')}
            />
            <TextFieldSmall
                display='Verification Code'
                value={data['code']}
                onChange={handleChangeData('code')}
                style={{ marginBottom: 32 }}
            />
            <Button
                variant="outlined"
                color="primary"
                onClick={() => {handleForget()}}
            >
                Continue
            </Button>
        </Box>
    )
}