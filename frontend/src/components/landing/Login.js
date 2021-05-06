import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { Box, Button, Link, TextareaAutosize } from '@material-ui/core'
import TextFieldSmall from '../TextFieldSmall'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import CustomSnackbar from '../CustomSnackbar';

export default function Login(props) {

    const history = useHistory()
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    })
    const [alert, setAlert] = useState(false)
    const [alert2, setAlert2] = useState(false)

    const handleChangeLogin = (key) => (event) => {
        setLoginData({
            ...loginData,
            [key]: event.target.value,
        })
    }

    const handleLogin = async () => {
        axios.post("http://localhost:4000/login", {
                username: loginData.username,
                password: loginData.password
            },{
                params: {
                    username: loginData.username
                }
            }).then(response => {
                const result = response.data.result
                if (result) {
                    setAlert(true)
                    setAlert2(false)
                    localStorage.setItem('username', loginData.username)
                    localStorage.setItem('auth', true)
                    localStorage.setItem('role', response.data.isTutor == "on" ? "Tutor" : "Student")
                    history.push("/home")
                    window.location.reload()
                } else {
                    setAlert(false)
                    setAlert2(false)
                    setAlert2(true)
                    localStorage.setItem('username', '')
                    localStorage.setItem('auth', false)
                    localStorage.setItem('role','')
                }
            }).catch(err => {
                console.error(err)
            })
    }

    return (
        <Box display="flex" flexDirection="column">
            <TextFieldSmall
                display='Username'
                value={loginData['username']}
                onChange={handleChangeLogin('username')}
            />
            <TextFieldSmall
                style={{marginBottom: 4}}
                display='Password'
                type='password'
                value={loginData['password']}
                onChange={handleChangeLogin('password')}
            />
            <Link
                style={{marginBottom: 32}}
                align="right"
                component="button"
                variant="body2"
                onClick={() => {props.setState(3)}}
            >
                Forgot Password?
            </Link>
            <Button
                variant="outlined"
                color="primary"
                style={{marginBottom: 16}}
                onClick={() => {handleLogin()}}
            >
                Login
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {props.setState(1)}}
            >
                Register
            </Button>
            <CustomSnackbar makeOpen={alert} severity="success" text='Login Success - redirect to homepage'/>
            <CustomSnackbar makeOpen={alert2} severity="error" text='Login Fail - The username or password is incorrect'/>
        </Box>
    )
}