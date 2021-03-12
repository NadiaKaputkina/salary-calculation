import { AlertProps } from '@material-ui/lab/Alert';
export const ERROR_MESSAGE_UPDATE = 'ERROR_MESSAGE_UPDATE'
export const SNACK_MESSAGE_CLOSE = 'SNACK_MESSAGE_CLOSE'

export interface SnackInterface {
    message?: string
    severity?: AlertProps['severity']
    open: boolean
}

const initialState = {
    open: false
};

export function snackReducer(state: SnackInterface = initialState, {type, payload}: any | string) {
    switch (type) {
        case ERROR_MESSAGE_UPDATE:
            return {
                ...state,
                message: payload.message,
                severity: payload.severity,
                open: payload.open,
            }

        case SNACK_MESSAGE_CLOSE:
            return {
                ...state,
                open: payload,
            }
        default:
            return state
    }
}