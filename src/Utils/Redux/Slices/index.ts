import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import notificationsReducer from './notificationSlice'

const rootReducer = combineReducers({
  user: userReducer,
  notifications: notificationsReducer,
});

export default rootReducer;
