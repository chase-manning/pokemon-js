import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface GameState {
  x: number;
  y: number;
}

const initialState: GameState = {
  x: 5,
  y: 10,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    moveLeft: (state) => {
      state.x -= 1;
    },
    moveRight: (state) => {
      state.x += 1;
    },
    moveUp: (state) => {
      state.y -= 1;
    },
    moveDown: (state) => {
      state.y += 1;
    },
    setX: (state, action: PayloadAction<number>) => {
      state.x = action.payload;
    },
    setY: (state, action: PayloadAction<number>) => {
      state.y = action.payload;
    },
  },
});

export const { moveLeft, moveRight, moveUp, moveDown } = gameSlice.actions;

export const selectX = (state: RootState) => state.game.x;

export const selectY = (state: RootState) => state.game.y;

export default gameSlice.reducer;
