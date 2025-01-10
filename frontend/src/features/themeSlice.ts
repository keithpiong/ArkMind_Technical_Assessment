import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  activeTheme: string;
}

// Default theme
const initialState: ThemeState = {
  activeTheme: "light", 
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<string>) => {
      state.activeTheme = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
