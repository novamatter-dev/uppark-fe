import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, setCookie, getCookie } from "../../../helpers";
import { authApi } from "../../../services";
import jwt_decode from "jwt-decode";

let token = null;
getCookie({ key: "jwt" }).then((answer) => {
  token = answer;
});

const initialState = {
  jwt: token,
  phoneNumber: "",
  userId: 0,
  error: {
    status: null,
    message: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action) => {
      const { status, message } = action.payload;
      state.error = { status, message };
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload.phoneNumber;
    },
    setToken(state, action) {
      state.jwt = action.payload.jwt;
    },
    clearToken(state) {
      state.jwt = null;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    resetAuthState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.putConfirmPhoneNumber.matchFulfilled,
      (state, { payload }) => {
        state.jwt = payload.jwt;
        setCookie({ key: "jwt", value: payload.jwt });
      }
    );
  },
});

export const {
  setPhoneNumber,
  setToken,
  setError,
  clearToken,
  setUserId,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;
