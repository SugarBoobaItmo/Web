import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    points: [],
    r: 1,    
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
        setR: (state, action) => {
            state.r = action.payload;
        },
    },
});

export const { setPoints, addPoint, deletePoints, setR } = pointsSlice.actions;

export const selectPoints = (state) => state.points.points;

export const pointsReducer = pointsSlice.reducer;

