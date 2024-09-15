import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: 'idle',
  message: '',
  title: ''
};

const notification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.title = action.payload.title;
    }
  }
});

export const uiActions = notification.actions;

export default notification.reducer;