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
  stopMoving,
  setX,
  setY,
  setMap,
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

export const selectMoving = (state: RootState) =>
  state.game.movingLeft ||
  state.game.movingRight ||
  state.game.movingUp ||
  state.game.movingDown;

export const selectPreviousMap = (state: RootState) =>
  state.game.mapHistory[state.game.mapHistory.length - 1];

export default gameSlice.reducer;
