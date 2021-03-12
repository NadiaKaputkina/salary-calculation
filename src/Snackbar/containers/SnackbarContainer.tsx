import React from 'react'
import MainSnackbar from "../ui/MainSnackbar";
import { useDispatch, useSelector } from "react-redux";
import { selectSnack } from "../snackSelector";
import { snackCloseAction } from "../snackAction";
import { SnackInterface } from "../snackReducer";

const SnackbarContainer = () => {

    let snack: SnackInterface = useSelector(selectSnack)
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(snackCloseAction())
    }
    return (
        <MainSnackbar
            snack={snack}
            handleClose={handleClose}
        />
    )
}

export default SnackbarContainer