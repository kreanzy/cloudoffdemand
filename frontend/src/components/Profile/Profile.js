import React, { useEffect, useState } from "react";
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import SplitButton from './SplitButton';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    typography: {
        color: '#FFFFFF',
    },
    frame: {
        margin: 'auto',
        maxWidth: '80%',
        backgroundColor: '#4F4F4F',
        borderRadius: 8,
    },
}));

function FormRow(props) {
    const classes = useStyles()
    return (
        <React.Fragment>
            <Grid item xs={6}>
                <Typography variant="h6" className={classes.typography} style={{ fontWeight: 700 }}>
                    {props.label}:
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h6" className={classes.typography} >
                    {props.value}
                </Typography>
            </Grid>
        </React.Fragment>
    );
  }

export default function Profile() {

    const classes = useStyles()
    /*const [profileData, setProfileData] = useState({
        'firstname': 'Korapin',
        'lastname': 'Thongpud',
        'username': 'phare',
        'email': 'fairphare@gmail.com',
        'promptpay': '0614139956',
        'role': 'Student',
    })
    */
    const [profileData, setProfileData] = useState({
        'fname': '',
        'lname': '',
        'username': '',
        'email': '',
        'ppnumber': '',
        'isTutor': '',
    })


    useEffect(() => {
        const fecthProfileData = async () => {
            axios.get('http://localhost:4000/profile',{params:{
                username : localStorage.getItem('username')
            }    
            }).then(response => {
                setProfileData(response.data["data"][0])
            });
            //setProfileData( data.data );
        };
        fecthProfileData();
    },[]);
    
    return (
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                spacing={5}
            >
                <Typography variant="h3" style={{ color:"#0EED0E", fontWeight: 700, paddingTop: '5%', paddingLeft: '15%'}}>
                    Profile
                </Typography>
                <Grid
                    container
                    className={classes.frame}
                    direction="column"
                    alignItems='center'
                    justify='center'
                    spacing={3}
                    style={{paddingBottom: '5%'}}
                >
                    <SplitButton/>
                    <Grid container item direction="row" spacing={5} justify='center' alignItems='center'>
                        <Grid item>
                            <AccountCircleSharpIcon style={{fontSize: 150, color: '#0EED0E'}}/>
                        </Grid>
                        <Box display="flex" flexDirection="column">
                            <Typography variant="h4" className={classes.typography} style={{ fontWeight: 'bold'}}>
                                {profileData['username']}
                            </Typography>
                            <Typography variant="h6" className={classes.typography}>
                                ({localStorage.getItem('role')})
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid container spacing={3} direction='column' justify='center' style={{width:500, paddingLeft:'4%' }}>
                        <Grid container item>
                            <FormRow label='First Name' value={profileData['fname']}/>
                        </Grid>
                        <Grid container item>
                            <FormRow label='Last Name' value={profileData['lname']}/>
                        </Grid>
                        <Grid container item>
                            <FormRow label='E-mail' value={profileData['email']}/>
                        </Grid>
                        <Grid container item>
                            <FormRow label='Promptpay Number' value={profileData['ppnumber']}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
    )
}