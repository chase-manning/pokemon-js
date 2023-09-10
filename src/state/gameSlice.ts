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
  moving: boolean;
  direction: Direction;
  map: MapType;
  mapHistory: MapType[];
}

const initialState: GameState = {
  x: palletTown.start.x,
  y: palletTown.start.y,
  moving: false,
  direction: Direction.Front,
  map: palletTown,
  mapHistory: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    moveLeft: (state) => {
      state.direction = Direction.Left;
      if (state.x === 0) return;
      if (state.map.walls[state.y] && state.map.walls[state.y][state.x - 1])
        return;
      state.x -= 1;
    },
    moveRight: (state) => {
      state.direction = Direction.Right;
      if (state.x === state.map.width - 1) return;
      if (state.map.walls[state.y] && state.map.walls[state.y][state.x + 1])
        return;
      state.x += 1;
    },
    moveUp: (state) => {
      state.direction = Direction.Back;
      if (state.y === 0) return;
      if (state.map.walls[state.y - 1] && state.map.walls[state.y - 1][state.x])
        return;
      state.y -= 1;
    },
    moveDown: (state) => {
      state.direction = Direction.Front;
      if (state.y === state.map.height - 1) return;
      if (state.map.walls[state.y + 1] && state.map.walls[state.y + 1][state.x])
        return;
      state.y += 1;
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
    setMoving: (state, action: PayloadAction<boolean>) => {
      state.moving = action.payload;
    },
  },
});

export const {
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  setMap,
  setLocation,
  exitMap,
  setMoving,
} = gameSlice.actions;

export const selectX = (state: RootState) => state.game.x;

export const selectY = (state: RootState) => state.game.y;

export const selectMap = (state: RootState) => state.game.map;

export const selectDirection = (state: RootState) => state.game.direction;

export const selectMoving = (state: RootState) => state.game.moving;

export const selectPreviousMap = (state: RootState) =>
  state.game.mapHistory[state.game.mapHistory.length - 1];

export default gameSlice.reducer;
