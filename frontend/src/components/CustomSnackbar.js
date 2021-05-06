import React, { useState, useEffect } from "react"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function CustomSnackbar(props) {

    const [open, setOpen] = useState(false);
    const {makeOpen, severity, text, ...prop} = props

    useEffect(() => {
        setOpen(makeOpen)
    }, [makeOpen]);

    const handleClose = (event) => {
        setOpen(false);
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {text}
            </Alert>
        </Snackbar>
    )
}
