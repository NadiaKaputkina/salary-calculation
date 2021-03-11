import buildReducer from './utils/utils';

import { types as profileTypes } from '../actions/profile';

export interface iInitialState {
    authenticate: boolean
}

const initialState = {
    authenticate: false
};

export default buildReducer(initialState, {
    [profileTypes.USER_LOGIN]: (state: iInitialState = initialState, payload: any) => {
        return {...state, authenticate: payload}
    },
    [profileTypes.USER_LOGOUT]: (state: iInitialState = initialState, payload: any) => {
        return {...state, authenticate: payload}
    },
})

