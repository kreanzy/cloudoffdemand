import React , { useState,useEffect } from "react";
import { Button, Grid, makeStyles} from '@material-ui/core'
import EditTextField from './EditTextField'
import axios from "axios";
import { useHistory } from "react-router-dom";
import "@fontsource/roboto";

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

export default function EnterNewEmail(props) {

    const classes = useStyles()
    const history = useHistory()
    const [emailData, setEmailData] = useState({
        'email': '',
    })
    useEffect(() => {
        const fecthEmailData = async () => {
            axios.get('http://localhost:4000/profile',{params:{
                username : localStorage.getItem('username')
            }    
            }).then(response => {
                console.log(response.data["data"][0])
                setEmailData(response.data["data"][0])
            });
            //setProfileData( data.data );
        };
        fecthEmailData();
    },[]);
    const handleChangeEmail = (key) => (event) => {
        setEmailData({
            ...emailData,
            [key]: event.target.value,
        })
        
    }
    const handleResetEmail = () => {
        console.log(emailData)
        axios.post("/profile/change_email", {
            id: emailData._id,
            email: emailData.email,
        }).then(response => {
            console.log(response.data)
            const result = response.data.result
                if (result) {
                    props.setState(1)
                } else {
                    console.log("use same mail or empty")
                }
        }).catch(err => {
            console.error(err)
        })
        // call backend
        // submit สำเร็จ ใส่ props.setState(1) ด้วย
    }
    const handleCancel = () => {
        
        history.push("/profile");
        window.location.reload();
      
  };

    return (
        <React.Fragment>
            <Grid container item>
                <EditTextField
                    display='New E-mail'
                    type='email'
                    onChange={handleChangeEmail('email')}
                />
            </Grid>
            <Grid container item justify='space-between' style={{paddingTop:'5%'}}>
                <Button
                    variant= "contained"
                    color="primary"
                    onClick={() => {handleResetEmail()}}
                    className={classes.roleButton}
                >
                    Submit
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