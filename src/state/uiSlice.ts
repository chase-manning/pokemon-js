import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UiState {
  startMenu: boolean;
}

const initialState: UiState = {
  startMenu: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showStartMenu: (state) => {
      state.startMenu = true;
    },
    hideStartMenu: (state) => {
      state.startMenu = false;
    },
  },
});

export const { showStartMenu, hideStartMenu } = uiSlice.actions;

export const selectStartMenu = (state: RootState) => state.ui.startMenu;

export const seleceMenuOpen = (state: RootState) => state.ui.startMenu;

export default uiSlice.reducer;
