import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export enum Direction {
  Front = "front",
  Back = "back",
  Left = "left",
  Right = "right",
}

export interface GameState {
  x: number;
  y: number;
  movingUp: boolean;
  movingDown: boolean;
  movingLeft: boolean;
  movingRight: boolean;
  lastDirection: Direction;
}

const initialState: GameState = {
  x: 8,
  y: 13,
  movingUp: false,
  movingDown: false,
  movingLeft: false,
  movingRight: false,
  lastDirection: Direction.Front,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    moveLeft: (state) => {
      state.x -= 1;
      state.lastDirection = Direction.Left;
    },
    moveRight: (state) => {
      state.x += 1;
      state.lastDirection = Direction.Right;
    },
    moveUp: (state) => {
      state.y -= 1;
      state.lastDirection = Direction.Back;
    },
    moveDown: (state) => {
      state.y += 1;
      state.lastDirection = Direction.Front;
    },
    startMovingLeft: (state) => {
      state.movingLeft = true;
      state.lastDirection = Direction.Left;
    },
    startMovingRight: (state) => {
      state.movingRight = true;
      state.lastDirection = Direction.Right;
    },
    startMovingUp: (state) => {
      state.movingUp = true;
      state.lastDirection = Direction.Back;
    },
    startMovingDown: (state) => {
      state.movingDown = true;
      state.lastDirection = Direction.Front;
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
      state.lastDirection = Direction.Front;
    },
    setY: (state, action: PayloadAction<number>) => {
      state.y = action.payload;
      state.lastDirection = Direction.Front;
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

export const selectLastDirection = (state: RootState) =>
  state.game.lastDirection;

export default gameSlice.reducer;
