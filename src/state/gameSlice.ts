import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { MapId } from "../maps/map-types";
import palletTown from "../maps/pallet-town";
import { getPokemonStats } from "../app/use-pokemon-stats";
import mapData from "../maps/map-data";

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

export interface PokemonInstance {
  id: number;
  level: number;
  xp: number;
  hp: number;
  moves: string[];
}

export interface PokemonEncounterType {
  id: number;
  level: number;
  hp: number;
  moves: string[];
}

export interface GameState {
  pos: PosType;
  moving: boolean;
  direction: Direction;
  map: MapId;
  inventory: InventoryItemType[];
  name: string;
  pokemon: PokemonInstance[];
  activePokemonIndex: number;
  pokemonEncounter?: PokemonEncounterType;
}

const initialState: GameState = {
  pos: palletTown.start,
  moving: false,
  direction: Direction.Down,
  map: MapId.PalletTown,
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
  name: "Blue",
  pokemon: [
    {
      id: 1,
      level: 5,
      xp: 0,
      hp: 19,
      moves: ["tackle", "growl"],
    },
    {
      id: 4,
      level: 5,
      xp: 0,
      hp: 19,
      moves: ["scratch", "growl"],
    },
    {
      id: 7,
      level: 5,
      xp: 0,
      hp: 19,
      moves: ["tackle", "tail-whip"],
    },
    {
      id: 1,
      level: 5,
      xp: 0,
      hp: 19,
      moves: ["tackle", "growl"],
    },
    {
      id: 4,
      level: 5,
      xp: 0,
      hp: 19,
      moves: ["scratch", "growl"],
    },
    {
      id: 7,
      level: 5,
      xp: 0,
      hp: 19,
      moves: ["tackle", "tail-whip"],
    },
  ],
  activePokemonIndex: 0,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    moveLeft: (state) => {
      state.direction = Direction.Left;
      if (state.pos.x === 0) return;
      const map = mapData[state.map];
      if (map.walls[state.pos.y] && map.walls[state.pos.y][state.pos.x - 1])
        return;
      state.pos.x -= 1;
    },
    moveRight: (state) => {
      state.direction = Direction.Right;
      const map = mapData[state.map];
      if (state.pos.x === map.width - 1) return;
      if (map.walls[state.pos.y] && map.walls[state.pos.y][state.pos.x + 1])
        return;
      state.pos.x += 1;
    },
    moveUp: (state) => {
      state.direction = Direction.Up;
      if (state.pos.y === 0) return;
      const map = mapData[state.map];
      if (map.walls[state.pos.y - 1] && map.walls[state.pos.y - 1][state.pos.x])
        return;
      state.pos.y -= 1;
    },
    moveDown: (state) => {
      state.direction = Direction.Down;
      const map = mapData[state.map];
      if (state.pos.y === map.height - 1) return;
      if (map.walls[state.pos.y + 1] && map.walls[state.pos.y + 1][state.pos.x])
        return;
      state.pos.y += 1;
    },
    setPos: (state, action: PayloadAction<PosType>) => {
      state.pos = action.payload;
    },
    setMap: (state, action: PayloadAction<MapId>) => {
      state.map = action.payload;
      const map = mapData[action.payload];
      state.pos = map.start;
    },
    exitMap(state) {
      const map = mapData[state.map];
      if (!map) return;
      if (!map.exitReturnMap) return;
      const previousMap = mapData[map.exitReturnMap];
      if (!previousMap) throw new Error("No previous map");
      const newPos = map.exitReturnPos;
      if (previousMap && newPos) {
        state.map = map.exitReturnMap;
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
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    save: (state) => {
      localStorage.setItem("game", JSON.stringify(state));
    },
    load: (state) => {
      const savedGame = localStorage.getItem("game");
      if (!savedGame) return;
      const savedGameState = JSON.parse(savedGame) as GameState;
      state.pos = savedGameState.pos;
      state.moving = savedGameState.moving;
      state.direction = savedGameState.direction;
      state.map = savedGameState.map;
      state.inventory = savedGameState.inventory;
      state.name = savedGameState.name;
      state.pokemon = savedGameState.pokemon;
      state.pokemonEncounter = savedGameState.pokemonEncounter;
    },
    swapPokemonPositions: (state, action: PayloadAction<number[]>) => {
      const [index1, index2] = action.payload;
      const temp = state.pokemon[index1];
      state.pokemon[index1] = state.pokemon[index2];
      state.pokemon[index2] = temp;
    },
    encounterPokemon: (state, action: PayloadAction<PokemonEncounterType>) => {
      state.pokemonEncounter = action.payload;
    },
    endEncounter: (state) => {
      state.pokemonEncounter = undefined;
    },
    setActivePokemon: (state, action: PayloadAction<number>) => {
      state.activePokemonIndex = action.payload;
    },
    updatePokemonEncounter: (
      state,
      action: PayloadAction<PokemonEncounterType>
    ) => {
      if (!state.pokemonEncounter) return;
      state.pokemonEncounter.hp = action.payload.hp;
    },
    updatePokemon: (state, action: PayloadAction<PokemonInstance>) => {
      state.pokemon[state.activePokemonIndex] = action.payload;
    },
    recoverFromFainting: (state) => {
      // Heal
      for (let i = 0; i < state.pokemon.length; i++) {
        state.pokemon[i].hp = getPokemonStats(
          state.pokemon[i].id,
          state.pokemon[i].level
        ).hp;
      }

      // Move
      const getRecoverLocation = (map: MapId): { map: MapId; pos: PosType } => {
        const mapData_ = mapData[map];
        if (mapData_.recoverLocation) {
          return { map, pos: mapData_.recoverLocation };
        }
        if (!mapData_.exitReturnMap) throw new Error("No exit return map");
        return getRecoverLocation(mapData_.exitReturnMap);
      };
      const { map, pos } = getRecoverLocation(state.map);
      state.map = map;
      state.pos = pos;
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
  setName,
  save,
  load,
  swapPokemonPositions,
  encounterPokemon,
  endEncounter,
  setActivePokemon,
  updatePokemonEncounter,
  updatePokemon,
  recoverFromFainting,
} = gameSlice.actions;

export const selectPos = (state: RootState) => state.game.pos;

export const selectMap = (state: RootState) => mapData[state.game.map];

export const selectDirection = (state: RootState) => state.game.direction;

export const selectMoving = (state: RootState) => state.game.moving;

export const selectInventory = (state: RootState) => state.game.inventory;

export const selectPreviousMap = (state: RootState) => {
  const returnMap = mapData[state.game.map].exitReturnMap;
  if (!returnMap) return null;
  return mapData[returnMap];
};

export const selectName = (state: RootState) => state.game.name;

export const selectHasSave = () => localStorage.getItem("game") !== null;

export const selectPokemon = (state: RootState) => state.game.pokemon;

export const selectPokemonEncounter = (state: RootState) =>
  state.game.pokemonEncounter;

export const selectActivePokemon = (state: RootState) =>
  state.game.pokemon[state.game.activePokemonIndex];

export default gameSlice.reducer;
