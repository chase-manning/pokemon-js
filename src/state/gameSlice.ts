import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { MapType } from "../maps/map-types";
import palletTown from "../maps/pallet-town";

export enum ItemType {
  Potion = "Potion",
  PokeBall = "Poké ball",
}

export interface InventoryItemType {
  item: ItemType;
  amount: number;
}

export enum Direction {
  Down = "down",
  Up = "up",
  Left = "left",
  Right = "right",
}

export interface PosType {
  x: number;
  y: number;
}

export interface GameState {
  pos: PosType;
  moving: boolean;
  direction: Direction;
  map: MapType;
  mapHistory: MapType[];
  inventory: InventoryItemType[];
}

const initialState: GameState = {
  pos: palletTown.start,
  moving: false,
  direction: Direction.Down,
  map: palletTown,
  mapHistory: [],
  inventory: [
    {
      item: ItemType.Potion,
      amount: 2,
    },
    {
      item: ItemType.PokeBall,
      amount: 1,
    },
  ],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    moveLeft: (state) => {
      state.direction = Direction.Left;
      if (state.pos.x === 0) return;
      if (
        state.map.walls[state.pos.y] &&
        state.map.walls[state.pos.y][state.pos.x - 1]
      )
        return;
      state.pos.x -= 1;
    },
    moveRight: (state) => {
      state.direction = Direction.Right;
      if (state.pos.x === state.map.width - 1) return;
      if (
        state.map.walls[state.pos.y] &&
        state.map.walls[state.pos.y][state.pos.x + 1]
      )
        return;
      state.pos.x += 1;
    },
    moveUp: (state) => {
      state.direction = Direction.Up;
      if (state.pos.y === 0) return;
      if (
        state.map.walls[state.pos.y - 1] &&
        state.map.walls[state.pos.y - 1][state.pos.x]
      )
        return;
      state.pos.y -= 1;
    },
    moveDown: (state) => {
      state.direction = Direction.Down;
      if (state.pos.y === state.map.height - 1) return;
      if (
        state.map.walls[state.pos.y + 1] &&
        state.map.walls[state.pos.y + 1][state.pos.x]
      )
        return;
      state.pos.y += 1;
    },
    setPos: (state, action: PayloadAction<PosType>) => {
      state.pos = action.payload;
    },
    setMap: (state, action: PayloadAction<MapType>) => {
      state.mapHistory.push(state.map);
      state.map = action.payload;
      state.pos = action.payload.start;
    },
    exitMap(state) {
      const previousMap = state.mapHistory.pop();
      const newPos = state.map.exitReturnPos;
      if (previousMap && newPos) {
        state.map = previousMap;
        state.pos = newPos;
      }
    },
    setMoving: (state, action: PayloadAction<boolean>) => {
      state.moving = action.payload;
    },
    addInventory: (state, action: PayloadAction<InventoryItemType>) => {
      let found = false;

      for (let i = 0; i < state.inventory.length; i++) {
        if (state.inventory[i].item !== action.payload.item) continue;
        state.inventory[i].amount += action.payload.amount;
        found = true;
      }

      if (!found) {
        state.inventory.push(action.payload);
      }
    },
    removeInventory: (state, action: PayloadAction<InventoryItemType>) => {
      for (let i = 0; i < state.inventory.length; i++) {
        if (state.inventory[i].item !== action.payload.item) continue;
        state.inventory[i].amount -= action.payload.amount;
      }
    },
  },
});

export const {
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  setMap,
  setPos,
  exitMap,
  setMoving,
  addInventory,
  removeInventory,
} = gameSlice.actions;

export const selectPos = (state: RootState) => state.game.pos;

export const selectMap = (state: RootState) => state.game.map;

export const selectDirection = (state: RootState) => state.game.direction;

export const selectMoving = (state: RootState) => state.game.moving;

export const selectInventory = (state: RootState) => state.game.inventory;

export const selectPreviousMap = (state: RootState) =>
  state.game.mapHistory[state.game.mapHistory.length - 1];

export default gameSlice.reducer;
