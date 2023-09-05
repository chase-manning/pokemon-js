import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface GameState {
  x: number;
  y: number;
  movingUp: boolean;
  movingDown: boolean;
  movingLeft: boolean;
  movingRight: boolean;
}

const initialState: GameState = {
  x: 5,
  y: 10,
  movingUp: false,
  movingDown: false,
  movingLeft: false,
  movingRight: false,
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
    startMovingLeft: (state) => {
      state.movingLeft = true;
    },
    startMovingRight: (state) => {
      state.movingRight = true;
    },
    startMovingUp: (state) => {
      state.movingUp = true;
    },
    startMovingDown: (state) => {
      state.movingDown = true;
    },
    stopMovingLeft: (state) => {
      state.movingLeft = false;
    },
    stopMovingRight: (state) => {
      state.movingRight = false;
    },
    stopMovingUp: (state) => {
      state.movingUp = false;
    },
    stopMovingDown: (state) => {
      state.movingDown = false;
    },
    setX: (state, action: PayloadAction<number>) => {
      state.x = action.payload;
    },
    setY: (state, action: PayloadAction<number>) => {
      state.y = action.payload;
    },
  },
});

export const {
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  startMovingLeft,
  startMovingRight,
  startMovingUp,
  startMovingDown,
  stopMovingLeft,
  stopMovingRight,
  stopMovingUp,
  stopMovingDown,
} = gameSlice.actions;

export const selectX = (state: RootState) => state.game.x;

export const selectY = (state: RootState) => state.game.y;

export const selectMovingLeft = (state: RootState) => state.game.movingLeft;

export const selectMovingRight = (state: RootState) => state.game.movingRight;

export const selectMovingUp = (state: RootState) => state.game.movingUp;

export const selectMovingDown = (state: RootState) => state.game.movingDown;

export default gameSlice.reducer;
