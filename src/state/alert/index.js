import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: null,
  navigation: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
    clearAlert: (state) => {
      state.alert = null;
    },
    setNavigation: (state, action) => {
      state.navigation = action.payload;
    },
  },
});

export const { setAlert, clearAlert, setNavigation } = alertSlice.actions;

export default alertSlice.reducer;
