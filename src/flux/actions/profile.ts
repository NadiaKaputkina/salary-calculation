import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as api from '../../api/login';
import { snackShowAction } from "../../Snackbar/snackAction";

const PREFIX = 'USER'

export const types = {
    USER_LOGIN: `${PREFIX}_LOGIN`,
    USER_LOGOUT: `${PREFIX}_LOGOUT`,
}

export const loginAction: ActionCreator<ThunkAction<Promise<Action>, any, void, any>> = (history: any, values: any) => {
        return async (dispatch: any): Promise<any> => {
            try {
                console.log(values)
                const response = await api.userLogin(values)
                const res = await response.json()
                if (res.length > 0) {
                    dispatch(snackShowAction('Успешно'))
                    dispatch(userLoginAction(true))
                    return history.push('home')
                } else throw "Такого пользователя не существует"
            } catch (e) {
                dispatch(snackShowAction(e))
            }
        }
}

export const logoutAction: ActionCreator<ThunkAction<Promise<Action>, any, void, any>> = (history: any) => {
    {

        return async (dispatch: Dispatch<Action>): Promise<any> => {
            try {
                const response = await api.userLogout()
                const res = await response.json()
                if (res) {

                    dispatch(userLogoutAction(false))
                    return history.push('login')
                }
            } catch (e) {
                console.log('e', e)
            }
        }
    }
}

export const userLoginAction = (payload: boolean) => ({
    type: types.USER_LOGIN,
    payload
})
export const userLogoutAction = (payload: boolean) => ({
    type: types.USER_LOGOUT,
    payload
})