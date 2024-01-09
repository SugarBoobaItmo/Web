import { createSlice } from "@reduxjs/toolkit";
import { setToken as set, removeToken } from "../token";

const initialState = {
    user: "",
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            set(action.payload);
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = "";
            state.token = null;
            removeToken();
        },
    },
});

export const { setToken, setUser, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export const selectToken = (state) => state.auth.token;

export const authReducer = authSlice.reducer;
