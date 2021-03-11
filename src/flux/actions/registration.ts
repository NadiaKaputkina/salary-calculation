import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as api from '../../api/registerUser';
import { userLoginAction } from "./profile";

export const registrationActon: ActionCreator<ThunkAction<Promise<Action>, any, void, any>> = (history: any) => {
    {
        return async (dispatch: Dispatch<Action>): Promise<any> => {
            try {

                const response = await api.registerUser()
                const res = await response.json()
                console.log('res', res)
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