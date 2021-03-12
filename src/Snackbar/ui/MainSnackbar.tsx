import React  from 'react'
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const MainSnackbar = (props: any) => {

    const {
        snackMessage,
        open,
        handleClose
    } = props

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                elevation={6}
                variant="filled"
                onClose={handleClose}
                severity="success"
            >
                {snackMessage}
            </Alert>
        </Snackbar>
    )
}

export default MainSnackbar