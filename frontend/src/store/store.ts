import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

// Export RootState and AppDispatch types for type safety
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
