import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UiState {
  startMenu: boolean;
  textMenu: boolean;
  itemsMenu: boolean;
  playerMenu: boolean;
  titleMenu: boolean;
  loadMenu: boolean;
}

const initialState: UiState = {
  startMenu: false,
  textMenu: false,
  itemsMenu: false,
  playerMenu: false,
  titleMenu: true,
  loadMenu: true,
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
    hideTitleMenu: (state) => {
      state.titleMenu = false;
    },
    hideLoadMenu: (state) => {
      state.loadMenu = false;
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
  hideTitleMenu,
  hideLoadMenu,
} = uiSlice.actions;

export const selectStartMenu = (state: RootState) => state.ui.startMenu;

export const selectTextMenu = (state: RootState) => state.ui.textMenu;

export const selectItemsMenu = (state: RootState) => state.ui.itemsMenu;

export const selectPlayerMenu = (state: RootState) => state.ui.playerMenu;

export const selectTitleMenu = (state: RootState) => state.ui.titleMenu;

export const selectLoadMenu = (state: RootState) => state.ui.loadMenu;

export const selectMenuOpen = (state: RootState) =>
  state.ui.startMenu ||
  state.ui.textMenu ||
  state.ui.itemsMenu ||
  state.ui.playerMenu ||
  state.ui.titleMenu ||
  state.ui.loadMenu;

export const selectStartMenuSubOpen = (state: RootState) =>
  state.ui.itemsMenu || state.ui.playerMenu;

export default uiSlice.reducer;
