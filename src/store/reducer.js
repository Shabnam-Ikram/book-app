import { combineReducers } from '@reduxjs/toolkit';
import bookReducer from '../store/bookSlice';
import authReducer from '../store/authSlice';

const rootReducer = combineReducers({
  books: bookReducer,
  auth: authReducer 
});

export default rootReducer;