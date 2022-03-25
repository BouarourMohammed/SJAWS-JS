import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./alert";
import profileSlice from "./profile";

export const store = configureStore({
  reducer: {
    alertSlice,
    profileSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
