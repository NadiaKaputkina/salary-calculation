export const ERROR_MESSAGE_UPDATE = 'ERROR_MESSAGE_UPDATE'

export interface iInitialState {
    message: string
}

const initialState = {
    message: ''
};

export function snackReducer(state: iInitialState = initialState, {type, payload}: any | string) {
    switch (type) {
        case ERROR_MESSAGE_UPDATE:
            return {...state, message: payload}
        default:
            return state
    }
}