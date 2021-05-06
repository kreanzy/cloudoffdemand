import React , { useState,useEffect } from "react";
import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import EditTextField from './EditTextField'
import { useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    typography: {
        color:"white", 
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

export default function VerfifyNewEmail() {

    const classes = useStyles()
    const history = useHistory()
    const [verifyData, setVerifyData] = useState({
        'code': '',
    })
    useEffect(() => {
        const fecthVerifyData = async () => {
            axios.get('http://localhost:4000/profile',{params:{
                username : localStorage.getItem('username')
            }    
            }).then(response => {
                console.log(response.data["data"][0])
                setVerifyData(response.data["data"][0])
            });
            //setProfileData( data.data );
        };
        fecthVerifyData();
    },[]);
    const handleChangeVerify = (key) => (event) => {
        setVerifyData({
            ...verifyData,
            [key]: event.target.value,
        })
        
    }
    const handleVerifyEmail = () => {
        console.log(verifyData)
        axios.post("/profile/verify_email", {
                id: verifyData._id,
                code: verifyData.code,
            }).then(response => {
                console.log(response.data)
                const result = response.data.result
                if (result) {
                    history.push("/profile");
                    window.location.reload();
                } else {
                    console.log("can't verify")
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
        <React.Fragment>
            <Typography variant='h6' className={classes.typography}>
                A verification code has been sent to your e-mail address. Please enter in the box below.
            </Typography>
            <br/>
            <Grid container item>
                <EditTextField
                    display='Verification Code'
                    onChange={handleChangeVerify('code')}
                />
            </Grid>
            <Grid container item justify='space-between' style={{paddingTop:'5%'}}>
                <Button
                    variant= "contained"
                    color="primary"
                    onClick={() => {handleVerifyEmail()}}
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
        </React.Fragment>
    )
}