import { createSlice } from "@reduxjs/toolkit";
import { notificationsApi } from "../../../services";

const initialState = {
  modalTitle: "",
  modalBody: "",
  sentTime: 0,
  messageId: 0,
  parkingId: 0,
  type: "",
  activeLoadingScreen: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setModaltitle: (state, action) => {
      state.modalTitle = action.payload.modalTitle;
      state.modalBody = action.payload.modalBody;
      state.sentTime = action.payload.sentTime;
      state.messageId = action.payload.messageId;
      state.parkingId = action.payload.parkingId;
      state.type = action.payload.type;
    },
    resetNotificationsState: () => {
      return initialState;
    },
    setLoadingScreen: (state, action) => {
      state.activeLoadingScreen = action.payload;
    },
  },
  extraReducers: {},
});

export const { setModaltitle, resetNotificationsState, setLoadingScreen } =
  notificationSlice.actions;

export default notificationSlice.reducer;
