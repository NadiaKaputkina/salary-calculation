import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as api from '../../api/registerUser';
import { userLoginAction } from "./profile";

export const registrationActon: ActionCreator<ThunkAction<Promise<Action>, any, void, any>> = (history: any, values: any) => {
    {
        return async (dispatch: Dispatch<Action>): Promise<any> => {
            try {
                const data = {
                    userName: values.username,
                    email: values.email,
                    password: values.password
                }

                const response = await api.registerUser(data)
                const res = await response.json()
                if (res) {
                    dispatch(userLoginAction(true))
                    return history.push('/login')
                }
            } catch (e) {
                console.log('e', e)
            }
        }
    }
}