import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {authReducer} from './authSlice';

const reducers = combineReducers({
    auth: authReducer,
});

export const store = configureStore({
    reducer: reducers,
});