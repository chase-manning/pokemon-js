import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ItemType } from "../app/use-item-data";

interface UiState {
  text: string[] | null;
  startMenu: boolean;
  itemsMenu: boolean;
  playerMenu: boolean;
  titleMenu: boolean;
  loadMenu: boolean;
  gameboyMenu: boolean;
  pokemonCenterMenu: boolean;
  actionOnPokemon: ((index: number) => void) | null;
  pokeballThrowing?: ItemType | null;
}

const initialState: UiState = {
  text: null,
  startMenu: false,
  itemsMenu: false,
  playerMenu: false,
  titleMenu: true,
  loadMenu: true,
  gameboyMenu: true,
  actionOnPokemon: null,
  pokeballThrowing: null,
  pokemonCenterMenu: false,
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
    hideGameboyMenu: (state) => {
      state.gameboyMenu = false;
    },
    showText: (state, action: PayloadAction<string[]>) => {
      state.text = action.payload;
    },
    hideText: (state) => {
      state.text = null;
    },
    showActionOnPokemon: (
      state,
      action: PayloadAction<(index: number) => void>
    ) => {
      state.actionOnPokemon = action.payload;
    },
    hideActionOnPokemon: (state) => {
      state.actionOnPokemon = null;
    },
    throwPokeball: (state, action: PayloadAction<ItemType>) => {
      state.pokeballThrowing = action.payload;
    },
    stopThrowingPokeball: (state) => {
      state.pokeballThrowing = null;
    },
    showPokemonCenterMenu: (state) => {
      state.pokemonCenterMenu = true;
    },
    hidePokemonCenterMenu: (state) => {
      state.pokemonCenterMenu = false;
    },
  },
});

export const {
  showStartMenu,
  hideStartMenu,
  showItemsMenu,
  hideItemsMenu,
  showPlayerMenu,
  hidePlayerMenu,
  hideTitleMenu,
  hideLoadMenu,
  hideGameboyMenu,
  showText,
  hideText,
  showActionOnPokemon,
  hideActionOnPokemon,
  throwPokeball,
  stopThrowingPokeball,
  showPokemonCenterMenu,
  hidePokemonCenterMenu,
} = uiSlice.actions;

export const selectText = (state: RootState) => state.ui.text;

export const selectStartMenu = (state: RootState) => state.ui.startMenu;

export const selectTextMenu = (state: RootState) => state.ui.text !== null;

export const selectItemsMenu = (state: RootState) => state.ui.itemsMenu;

export const selectPlayerMenu = (state: RootState) => state.ui.playerMenu;

export const selectTitleMenu = (state: RootState) => state.ui.titleMenu;

export const selectLoadMenu = (state: RootState) => state.ui.loadMenu;

export const selectGameboyMenu = (state: RootState) => state.ui.gameboyMenu;

export const selectPokemonCenterMenu = (state: RootState) =>
  state.ui.pokemonCenterMenu;

export const selectActionOnPokemon = (state: RootState) =>
  state.ui.actionOnPokemon;

export const selectMenuOpen = (state: RootState) =>
  state.ui.startMenu ||
  state.ui.text !== null ||
  state.ui.itemsMenu ||
  state.ui.playerMenu ||
  state.ui.titleMenu ||
  state.ui.loadMenu ||
  state.ui.gameboyMenu ||
  state.game.pokemonEncounter !== undefined ||
  state.ui.pokemonCenterMenu;

export const selectStartMenuSubOpen = (state: RootState) =>
  state.ui.itemsMenu || state.ui.playerMenu;

export const selectPokeballThrowing = (state: RootState) =>
  state.ui.pokeballThrowing;

export default uiSlice.reducer;
