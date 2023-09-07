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
  mapHistory: MapType[];
  locationHistory: { x: number; y: number }[];
}

const initialState: GameState = {
  x: palletTown.start.x,
  y: palletTown.start.y,
  movingUp: false,
  movingDown: false,
  movingLeft: false,
  movingRight: false,
  lastDirection: Direction.Front,
  map: palletTown,
  text: null,
  textIndex: 0,
  mapHistory: [],
  locationHistory: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    moveLeft: (state) => {
      if (state.x === 0) return;
      if (state.map.walls[state.y] && state.map.walls[state.y][state.x - 1])
        return;
      state.x -= 1;
      state.lastDirection = Direction.Left;
    },
    moveRight: (state) => {
      if (state.x === state.map.width - 1) return;
      if (state.map.walls[state.y] && state.map.walls[state.y][state.x + 1])
        return;
      state.x += 1;
      state.lastDirection = Direction.Right;
    },
    moveUp: (state) => {
      if (state.y === 0) return;
      if (state.map.walls[state.y - 1] && state.map.walls[state.y - 1][state.x])
        return;
      state.y -= 1;
      state.lastDirection = Direction.Back;
    },
    moveDown: (state) => {
      if (state.y === state.map.height - 1) return;
      if (state.map.walls[state.y + 1] && state.map.walls[state.y + 1][state.x])
        return;
      state.y += 1;
      state.lastDirection = Direction.Front;
    },
    startMovingLeft: (state) => {
      if (state.text) return;
      state.movingLeft = true;
      state.lastDirection = Direction.Left;
    },
    startMovingRight: (state) => {
      if (state.text) return;
      state.movingRight = true;
      state.lastDirection = Direction.Right;
    },
    startMovingUp: (state) => {
      if (state.text) return;
      state.movingUp = true;
      state.lastDirection = Direction.Back;
    },
    startMovingDown: (state) => {
      if (state.text) return;
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
    stopMoving: (state) => {
      state.movingLeft = false;
      state.movingRight = false;
      state.movingUp = false;
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
    setLocation: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
    },
    setMap: (state, action: PayloadAction<MapType>) => {
      state.mapHistory.push(state.map);
      state.map = action.payload;
      state.x = action.payload.start.x;
      state.y = action.payload.start.y;
    },
    exitMap(state) {
      const previousMap = state.mapHistory.pop();
      const newLocation = state.map.exitReturnLocation;
      if (previousMap && newLocation) {
        state.map = previousMap;
        state.x = newLocation.x;
        state.y = newLocation.y;
      }
    },
    pressA: (state) => {
      // If reading text
      if (state.text) {
        state.textIndex += 1;
        if (state.textIndex >= state.text.length) {
          state.text = null;
          state.textIndex = 0;
        }
        return;
      }

      // Getting coords in front of character
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

      // Reading text
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
  stopMoving,
  setX,
  setY,
  setMap,
  pressA,
  closeText,
  setLocation,
  exitMap,
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

export const selectMoving = (state: RootState) =>
  state.game.movingLeft ||
  state.game.movingRight ||
  state.game.movingUp ||
  state.game.movingDown;

export const selectPreviousMap = (state: RootState) =>
  state.game.mapHistory[state.game.mapHistory.length - 1];

export default gameSlice.reducer;
