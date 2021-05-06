import React , { useState } from "react";
import { Grid, makeStyles, Typography } from '@material-ui/core'
import EnterNewEmail from './EnterNewEmail'
import VerifyNewEmail from './VerifyNewEmail'

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
}));

export default function ChangeEmail() {

    const classes = useStyles()
    const [state, setState] = useState(0)
    // state 0 - enternewemail, state 1 - verifynewemail


    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            spacing={3}
        >
            <Typography variant="h3" className={classes.typography} >
                Change Email
            </Typography>
            <Grid
                container
                className={classes.frame}
                direction="column"
                alignItems='center'
                justify='center'
                spacing={10}
            >
                <Grid container item xs={8} direction="column" spacing={2} justify='space-around' alignItems='center' style={{width:450}}>
                {state==0?<EnterNewEmail setState={setState}/>:<VerifyNewEmail setState={setState}/>}
                      
                </Grid>
            </Grid>
    </Grid>
    )
}