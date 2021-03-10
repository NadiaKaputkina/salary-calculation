const PREFIX = 'USER'

export const types = {
    USER_LOGIN: `${PREFIX}_LOGIN`,
    USER_LOGOUT: `${PREFIX}_LOGOUT`,
}

export const login = (payload: any) => {
    return (dispatch: any) => {
        dispatch({
            type: types.USER_LOGIN,
            payload
        })
    }
}

export const logout = (payload: any) => {
    return (dispatch: any) => {
        dispatch(userLogout(payload))
    }
}

export const userLogout = (payload: boolean) => ({type: types.USER_LOGOUT, payload})