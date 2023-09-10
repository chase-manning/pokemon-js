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

export interface LocationType {
  x: number;
  y: number;
}

export interface GameState {
  location: LocationType;
  moving: boolean;
  direction: Direction;
  map: MapType;
  mapHistory: MapType[];
}

const initialState: GameState = {
  location: palletTown.start,
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
      if (state.location.x === 0) return;
      if (
        state.map.walls[state.location.y] &&
        state.map.walls[state.location.y][state.location.x - 1]
      )
        return;
      state.location.x -= 1;
    },
    moveRight: (state) => {
      state.direction = Direction.Right;
      if (state.location.x === state.map.width - 1) return;
      if (
        state.map.walls[state.location.y] &&
        state.map.walls[state.location.y][state.location.x + 1]
      )
        return;
      state.location.x += 1;
    },
    moveUp: (state) => {
      state.direction = Direction.Back;
      if (state.location.y === 0) return;
      if (
        state.map.walls[state.location.y - 1] &&
        state.map.walls[state.location.y - 1][state.location.x]
      )
        return;
      state.location.y -= 1;
    },
    moveDown: (state) => {
      state.direction = Direction.Front;
      if (state.location.y === state.map.height - 1) return;
      if (
        state.map.walls[state.location.y + 1] &&
        state.map.walls[state.location.y + 1][state.location.x]
      )
        return;
      state.location.y += 1;
    },
    setLocation: (state, action: PayloadAction<LocationType>) => {
      state.location = action.payload;
    },
    setMap: (state, action: PayloadAction<MapType>) => {
      state.mapHistory.push(state.map);
      state.map = action.payload;
      state.location = action.payload.start;
    },
    exitMap(state) {
      const previousMap = state.mapHistory.pop();
      const newLocation = state.map.exitReturnLocation;
      if (previousMap && newLocation) {
        state.map = previousMap;
        state.location = newLocation;
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

export const selectLocation = (state: RootState) => state.game.location;

export const selectMap = (state: RootState) => state.game.map;

export const selectDirection = (state: RootState) => state.game.direction;

export const selectMoving = (state: RootState) => state.game.moving;

export const selectPreviousMap = (state: RootState) =>
  state.game.mapHistory[state.game.mapHistory.length - 1];

export default gameSlice.reducer;
