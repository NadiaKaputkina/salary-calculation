import {
    Action,
    Dispatch
} from "redux";
import {
    ERROR_MESSAGE_UPDATE,
    SNACK_MESSAGE_CLOSE
} from "./snackReducer";

export const snackShowAction = (message: string, severity: string, open: boolean) => {

    return (dispatch: Dispatch<Action>) => {
        return dispatch(snackAction({message, severity, open}))

    }
}

export const snackCloseAction = () => {
    return (dispatch: Dispatch<Action>) => {
        return dispatch({
            type: SNACK_MESSAGE_CLOSE,
            payload: false
        })

    }
}

export const snackAction = (payload: any) => ({
    type: ERROR_MESSAGE_UPDATE,
    payload
})