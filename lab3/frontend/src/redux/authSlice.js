import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: "",
    token: null
    };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = "";
            state.token = null;
            localStorage.removeItem("token");
        },
    },
});

export const { setToken, setUser, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export const selectToken = (state) => state.auth.token;

export const authReducer = authSlice.reducer;