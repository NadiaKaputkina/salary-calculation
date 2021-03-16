import { combineReducers } from 'redux';

import profile from './profile';
import { snackReducer } from '../../Snackbar/snackReducer';
import { workersReducer } from '../../EmployeeList/employeesReducer';

export default combineReducers({
    profile,
    snack: snackReducer,
    workers: workersReducer,
});