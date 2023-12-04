import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    phoneNr: 0,
  },
  reducers: {
    handleUserPhoneNr: (state, action) => {
      state.phoneNr = action.payload;
    },
  },
  extraReducers: {},
});

export const { handleUserPhoneNr } = userSlice.actions;
export const phoneNr = (state) => state.user.phoneNr;

export default userSlice.reducer;
