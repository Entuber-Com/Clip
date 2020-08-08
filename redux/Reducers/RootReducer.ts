import { combineReducers } from 'redux';
import UserReducer from './ChildReducers/UserReducer';
import NotificationReducer from './ChildReducers/NotificationReducer';

/**
 * Root Reducer
 */
export default combineReducers({
    user: UserReducer,
    notification: NotificationReducer
});