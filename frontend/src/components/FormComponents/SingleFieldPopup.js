import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import FormComponents from "./FormComponents.js";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),
        width: theme.spacing(100),
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function SingleFieldPopup(props) {
    const { title, children, open, handleClose } = props;
    const classes = useStyles();

    return (
        <Dialog open={open} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <FormComponents.ActionButton
                        color="secondary"
                        onClick={handleClose}>
                        <CloseIcon />
                    </FormComponents.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
