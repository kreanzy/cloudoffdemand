import React , { useState } from "react";
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Login from './landing/Login'
import Register from './landing/Register'
import Verify from './landing/Verify'
import ForgetEmail from './landing/ForgetEmail'
import ForgetName from './landing/ForgetName'
import FadeIn from './transition/FadeIn'
import CustomSnackbar from './CustomSnackbar'

const useStyles = makeStyles((theme) => ({
    textField: {
        backgroundColor: '#FFFFFF',
        outline: 'none',
    },
    inputTextField: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        outline: 'none',
    },
    typography: {
        color: '#FFFFFF',
    },
    grid: {
        height: '100%',
    },
    textFieldSmall: {
        marginBottom: 8,
    },
    logo: {
        fontSize: 300
    },
}));

export default function Landing() {

    const classes = useStyles()
    const [state, setState] = useState(0)
    const [alert, setAlert] = useState(false)
    const [alert2, setAlert2] = useState(false)
    /*
    0 = login
    1 = register
    2 = verify
    3 = forget email
    4 = forget name
    */

    const handleSetState = (newState) => {
        if (state == 2 && newState == 0) {
            setAlert(true)
        }
        if (state == 4 && newState == 0) {
            setAlert2(true)
        }
        setState(newState)
    }
    console.log('alert')
    console.log(alert)
    return (
        <Grid container className={classes.grid} justify="space-between">
            <Grid item xs={6}>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    // bgcolor="#800000"
                >
                    <PowerSettingsNewIcon color="primary" className={classes.logo} />
                    <Typography variant="h1" className={classes.typography}>
                        OffDemand
                    </Typography>
                    <Typography variant="h3" className={classes.typography}>
                        Turn off your future
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    height="100%"
                    // bgcolor="#000080"
                >
                    <FadeIn condition={state == 0}>
                        <Login setState={handleSetState} />
                    </FadeIn>
                    <FadeIn condition={state == 1}>
                        <Register setState={handleSetState} />
                    </FadeIn>
                    <FadeIn condition={state == 2}>
                        <Verify setState={handleSetState} />
                    </FadeIn>
                    <FadeIn condition={state == 3}>
                        <ForgetEmail setState={handleSetState} />
                    </FadeIn>
                    <FadeIn condition={state == 4}>
                        <ForgetName setState={handleSetState} />
                    </FadeIn>
                </Box>
            </Grid>
            <CustomSnackbar makeOpen={alert} severity="success" text='Register Successful'/>
            <CustomSnackbar makeOpen={alert2} severity="success" text='Reset Successful'/>
        </Grid>
    )
}