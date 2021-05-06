import React, { useState } from "react"
import { makeStyles, Box, Button, Typography } from '@material-ui/core'
import TextFieldSmall from '../TextFieldSmall'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    textFieldSmall: {
        marginBottom: 8,
    },
    typography: {
        color: '#FFFFFF',
    },
    roleButton: {
        width: '47.5%',
    },
}));

export default function Register(props) {

    const classes = useStyles()
    const [registerData, setRegisterData] = useState({
        fname: '',
        lname: '',
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
        ppnumber: '',
        role: '',
    })

    const handleChangeRegister = (key) => (event) => {
        setRegisterData({
            ...registerData,
            [key]: event.target.value,
        })
    }
    console.log(registerData)
    const handleChangeRole = (role) => {
        setRegisterData({
            ...registerData,
            'role': role,
        })
    }

    const handleRegister = () => {
        if (registerData.password != registerData.confirmpassword) {
            console.log('pass not match')
            return
        }
        axios.post("http://localhost:4000/register", {
            username: registerData.username,
            password: registerData.password,
            fname: registerData.fname,
            lname: registerData.lname,
            email: registerData.email,
            ppnumber: registerData.ppnumber,
            isTutor: (registerData.role == 'teacher' ? 'on' : 'off')
        }).then(response => {
            console.log(response.data)
            const result = response.data.result
            if (result) {
                props.setState(2)
            } else {
                console.log("can't reg")
            }
        }).catch(err => {
            console.error(err)
        })
    }

    return (
        <Box display="flex" flexDirection="column">
            <TextFieldSmall
                display="First name"
                type='tel'
                value={registerData['fname']}
                onChange={handleChangeRegister('fname')}
            />
            <TextFieldSmall
                display='Last name'
                type='tel'
                value={registerData['lname']}
                onChange={handleChangeRegister('lname')}
            />
            <TextFieldSmall
                display='Username'
                type='tel'
                value={registerData['username']}
                onChange={handleChangeRegister('username')}
            />
            <TextFieldSmall
                display='E-mail'
                type='email'
                value={registerData['email']}
                onChange={handleChangeRegister('email')}
            />
            <TextFieldSmall
                display='Password'
                type='password'
                value={registerData['password']}
                onChange={handleChangeRegister('password')}
            />
            <TextFieldSmall
                display='Confirm Password'
                type='password'
                value={registerData['confirmpassword']}
                onChange={handleChangeRegister('confirmpassword')}
            />
            <TextFieldSmall
                display='Promptpay Number'
                type='tel'
                value={registerData['ppnumber']}
                onChange={handleChangeRegister('ppnumber')}
            />
            <Typography variant="h6" className={classes.typography}>
                Register as
            </Typography>
            <Box
                display="flex"
                justifyContent="space-between"
                mb={4}
            >
                <Button
                    variant={registerData.role == "student" ? "contained" : "outlined"}
                    color="primary"
                    onClick={() => {handleChangeRole('student')}}
                    className={classes.roleButton}
                >
                    Student
                </Button>
                <Button
                    variant={registerData.role == "teacher" ? "contained" : "outlined"}
                    color="primary"
                    onClick={() => {handleChangeRole('teacher')}}
                    className={classes.roleButton}
                >
                    Tutor
                </Button>
            </Box>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => {handleRegister()}}
                // onClick={() => {props.setState(2)}}
            >
                Create account
            </Button>
        </Box>
    )
}