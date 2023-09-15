import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UiState {
  startMenu: boolean;
  textMenu: boolean;
  itemsMenu: boolean;
  playerMenu: boolean;
}

const initialState: UiState = {
  startMenu: false,
  textMenu: false,
  itemsMenu: false,
  playerMenu: false,
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
    showItemsMenu: (state) => {
      state.itemsMenu = true;
    },
    hideItemsMenu: (state) => {
      state.itemsMenu = false;
    },
    showPlayerMenu: (state) => {
      state.playerMenu = true;
    },
    hidePlayerMenu: (state) => {
      state.playerMenu = false;
    },
  },
});

export const {
  showStartMenu,
  hideStartMenu,
  showTextMenu,
  hideTextMenu,
  showItemsMenu,
  hideItemsMenu,
  showPlayerMenu,
  hidePlayerMenu,
} = uiSlice.actions;

export const selectStartMenu = (state: RootState) => state.ui.startMenu;

export const selectTextMenu = (state: RootState) => state.ui.textMenu;

export const selectItemsMenu = (state: RootState) => state.ui.itemsMenu;

export const selectPlayerMenu = (state: RootState) => state.ui.playerMenu;

export const selectMenuOpen = (state: RootState) =>
  state.ui.startMenu ||
  state.ui.textMenu ||
  state.ui.itemsMenu ||
  state.ui.playerMenu;

export const selectStartMenuSubOpen = (state: RootState) =>
  state.ui.itemsMenu || state.ui.playerMenu;

export default uiSlice.reducer;
