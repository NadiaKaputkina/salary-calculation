import { combineReducers } from 'redux';

import profile from './profile';
import { snackReducer } from '../../Snackbar/snackReducer';
import { workersReducer } from '../../pages/employees/employeesReducer';

export default combineReducers({
    profile,
    snack: snackReducer,
    workers: workersReducer,
});