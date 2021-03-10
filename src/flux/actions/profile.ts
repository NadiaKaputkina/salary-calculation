import userLoginRequest from '../../fetch/requests/login'

const PREFIX = 'USER'

export const types = {
    USER_LOGIN_LOGOUT: `${PREFIX}_LOGIN_LOGOUT`,
}

export const loginLogoutService = (payload: any) => {

    return (dispatch: any, getState: any) => {

        return userLoginRequest(dispatch, getState)
            .then(response => {

                dispatch(userLoginLogout(payload))
                return Promise.resolve(response)
            })
            .catch(error => {

                return Promise.reject(error)
            })
    }
}

export const userLoginLogout = (payload: boolean) => ({
    type: types.USER_LOGIN_LOGOUT,
    payload
})