import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { MapType } from "../maps/map-types";
import palletTown from "../maps/pallet-town";

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
  map: MapType;
  text: string[] | null;
  textIndex: number;
}

const initialState: GameState = {
  x: 8,
  y: 13,
  movingUp: false,
  movingDown: false,
  movingLeft: false,
  movingRight: false,
  lastDirection: Direction.Front,
  map: palletTown,
  text: null,
  textIndex: 0,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    moveLeft: (state) => {
      if (state.map.walls[state.y] && state.map.walls[state.y][state.x - 1])
        return;
      state.x -= 1;
      state.lastDirection = Direction.Left;
    },
    moveRight: (state) => {
      if (state.map.walls[state.y] && state.map.walls[state.y][state.x + 1])
        return;
      state.x += 1;
      state.lastDirection = Direction.Right;
    },
    moveUp: (state) => {
      if (state.map.walls[state.y - 1] && state.map.walls[state.y - 1][state.x])
        return;
      state.y -= 1;
      state.lastDirection = Direction.Back;
    },
    moveDown: (state) => {
      if (state.map.walls[state.y + 1] && state.map.walls[state.y + 1][state.x])
        return;
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
    setMap: (state, action: PayloadAction<MapType>) => {
      state.map = action.payload;
    },
    pressA: (state) => {
      if (state.text) {
        state.textIndex += 1;
        if (state.textIndex >= state.text.length) {
          state.text = null;
          state.textIndex = 0;
        }
        return;
      }

      let x = state.x;
      let y = state.y;
      switch (state.lastDirection) {
        case Direction.Front:
          y += 1;
          break;
        case Direction.Back:
          y -= 1;
          break;
        case Direction.Left:
          x -= 1;
          break;
        case Direction.Right:
          x += 1;
          break;
      }
      if (
        state.map.text[y] &&
        state.map.text[y][x] &&
        state.map.text[y][x].length > 0
      ) {
        state.text = state.map.text[y][x];
      }
    },
    closeText: (state) => {
      state.text = null;
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
  setX,
  setY,
  setMap,
  pressA,
  closeText,
} = gameSlice.actions;

export const selectX = (state: RootState) => state.game.x;

export const selectY = (state: RootState) => state.game.y;

export const selectMovingLeft = (state: RootState) => state.game.movingLeft;

export const selectMovingRight = (state: RootState) => state.game.movingRight;

export const selectMovingUp = (state: RootState) => state.game.movingUp;

export const selectMovingDown = (state: RootState) => state.game.movingDown;

export const selectMap = (state: RootState) => state.game.map;

export const selectLastDirection = (state: RootState) =>
  state.game.lastDirection;

export const selectText = (state: RootState) =>
  state.game.text ? state.game.text[state.game.textIndex] : null;

export default gameSlice.reducer;
