import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UiState {
  startMenu: boolean;
  textMenu: boolean;
}

const initialState: UiState = {
  startMenu: false,
  textMenu: false,
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
    showTextMenu: (state) => {
      state.textMenu = true;
    },
    hideTextMenu: (state) => {
      state.textMenu = false;
    },
  },
});

export const { showStartMenu, hideStartMenu, showTextMenu, hideTextMenu } =
  uiSlice.actions;

export const selectStartMenu = (state: RootState) => state.ui.startMenu;

export const selectTextMenu = (state: RootState) => state.ui.textMenu;

export const selectMenuOpen = (state: RootState) =>
  state.ui.startMenu || state.ui.textMenu;

export default uiSlice.reducer;
