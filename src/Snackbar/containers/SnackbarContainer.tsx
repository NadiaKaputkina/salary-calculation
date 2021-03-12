import React, { useEffect, useState } from 'react'
import MainSnackbar from "../ui/MainSnackbar";
import { useSelector } from "react-redux";
import { selectSnackMessage } from "../snackSelector";

const SnackbarContainer = (props: any) => {

    const snackMessage = useSelector(selectSnackMessage)
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        setOpen(true)
    },[snackMessage])

    return (
        <MainSnackbar
            snackMessage={snackMessage}
            open={open}
            handleClose={handleClose}
        />
    )
}

export default SnackbarContainer