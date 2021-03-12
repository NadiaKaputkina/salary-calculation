import { combineReducers } from 'redux';

import profile from './profile';
import { snackReducer } from "../../Snackbar/snackReducer";

export default combineReducers({
    profile,
    snack: snackReducer,
});