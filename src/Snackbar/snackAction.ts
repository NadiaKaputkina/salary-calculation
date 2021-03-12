import { Action, Dispatch } from "redux";
import { ERROR_MESSAGE_UPDATE } from "./snackReducer";

export const snackShowAction = (message: any) => {

    return (dispatch: Dispatch<Action>) => {
        return dispatch(snackAction(message))

    }
}

export const snackAction = (payload: any) => ({
    type: ERROR_MESSAGE_UPDATE,
    payload
})