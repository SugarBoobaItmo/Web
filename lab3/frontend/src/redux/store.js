import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {authReducer} from './authSlice';
import {pointsReducer} from './pointsSlice';

const reducers = combineReducers({
    auth: authReducer,
    points: pointsReducer,
});

export const store = configureStore({
    reducer: reducers,
});