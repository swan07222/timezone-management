import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import timeReducer from './timezonReducer';
import manaReducer from './manageReducer';

export default combineReducers({
    auth: authReducer,
    time: timeReducer,
    manage: manaReducer,
    errors: errorReducer
});