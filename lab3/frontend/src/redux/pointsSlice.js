import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    points: [],
    };

const pointsSlice = createSlice({
    name: 'points',
    initialState,
    reducers: {
        setPoints: (state, action) => {
            state.points = action.payload;
        },
        addPoint: (state, action) => {
            state.points.push(action.payload);
        },
        deletePoints: (state) => {
            state.points = [];
        },
    },
});

export const { setPoints, addPoint, deletePoints } = pointsSlice.actions;

export const selectPoints = (state) => state.points.points;

export const pointsReducer = pointsSlice.reducer;

