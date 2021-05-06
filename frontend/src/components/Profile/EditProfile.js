import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import EditTextField from './EditTextField'
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    typography: {
        color:"#0EED0E", 
        fontWeight: 700, 
        paddingTop: '5%', 
        paddingLeft: '15%'
    },
    frame: {
        margin: 'auto',
        maxWidth: '80%',
        backgroundColor: '#4F4F4F',
        borderRadius: 8,
    },
    roleButton: {
        width: '47.5%',
        textTransform: "none",
        fontWeight: 700,
        backgroundColor:'#191919', 
        color:"#0EED0E",
        fontSize: 18,
        borderRadius: 10
    },
    
}));

export default function EditProfile() {

    const classes = useStyles()
    const history = useHistory()
    /*const [editProfileData, setEditProfileData] = useState({
        _id:'',
        fname: '',
        lname: '',
        username: '',
        ppnumber: '',
    })
    */
    const [editProfileData, setEditProfileData] = useState({});
    useEffect(() => {
        const fecthEditProfileData = async () => {
            axios.get('http://localhost:4000/profile',{params:{
                username : localStorage.getItem('username')
            }    
            }).then(response => {
                console.log(response.data["data"][0])
                setEditProfileData(response.data["data"][0])
            });
            //setProfileData( data.data );
        };
        fecthEditProfileData();
        console.log(editProfileData._id)
    },[]);

    const handleChangeEdit = (key) => (event) => {
        setEditProfileData({
            ...editProfileData,
            [key]: event.target.value,
        })
        
    }
    const handleEditProfile = () => {
        console.log(editProfileData)
        axios.post("http://localhost:4000/profile/edit_profile", {
            fname: editProfileData.fname,
            lname: editProfileData.lname,
            ppnumber: editProfileData.ppnumber,
            id: editProfileData._id,
            username: editProfileData.username,
        }).then(response => {
            console.log(response.data)
            if(response.data.result)
            {
            localStorage.setItem('username',editProfileData.username)
            history.push("/profile");
            window.location.reload();
            }
        }).catch(err => {
            console.error(err)
        })
    }
    const handleCancel = () => {
        
          history.push("/profile");
          window.location.reload();
        
    };
    return (
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                spacing={3}
            >
                <Typography variant="h3" className={classes.typography} >
                    Edit Profile
                </Typography>
                <Grid
                    container
                    className={classes.frame}
                    direction="column"
                    alignItems='center'
                    justify='center'
                    spacing={10}
                    style={{paddingBottom: '1%'}}
                >
                    <Grid container item xs={8} direction="column" spacing={2} justify='space-around' alignItems='center' style={{width:450}}>
                        <Grid container item>
                            <EditTextField
                                display='First Name'
                                type='tel'
                                value={editProfileData['fname']}
                                onChange={handleChangeEdit('fname')}
                            />
                        </Grid>
                        <Grid container item>
                            <EditTextField
                                display='Last Name'
                                type='tel'
                                value={editProfileData['lname']}
                                onChange={handleChangeEdit('lname')}
                            />
                        </Grid>
                        <Grid container item>
                            <EditTextField
                                display='Username'
                                type='tel'
                                value={editProfileData['username']}
                                onChange={handleChangeEdit('username')}
                            />
                        </Grid>
                        <Grid container item>
                            <EditTextField
                                display='Promptpay Number'
                                type='tel'
                                value={editProfileData['ppnumber']}
                                onChange={handleChangeEdit('ppnumber')}
                            />
                        </Grid>
                        <Grid container item justify='space-between' style={{paddingTop:'5%'}}>
                            <Button
                                variant= "contained"
                                color="primary"
                                onClick={() => {handleEditProfile()}}
                                className={classes.roleButton}
                            >
                                Save Changes
                            </Button>
                            <Button
                                variant= "contained"
                                color="primary"
                                className={classes.roleButton}
                                onClick={() => {handleCancel()}}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
    )
}