import { PosType } from "../state/gameSlice";

export enum MapId {
  PalletTown = "pallet-town",
  PalletTownHouseA1F = "pallet-town-house-a-1f",
  PalletTownHouseA2F = "pallet-town-house-a-2f",
  PalletTownHouseB = "pallet-town-house-b",
  Route1 = "route-1",
  PalletTownLab = "pallet-town-lab",
}

export interface PokemonEncounterData {
  id: number;
  chance: number;
  conditionValues: { name: string; url: string }[];
  maxLevel: number;
  minLevel: number;
}

export interface EncounterData {
  rate: number;
  pokemon: PokemonEncounterData[];
}

export interface EncountersType {
  walk: EncounterData;
  surf: EncounterData;
  oldRod: EncounterData;
  goodRod: EncounterData;
  superRod: EncounterData;
  rockSmash: EncounterData;
  headbutt: EncounterData;
  darkGrass: EncounterData;
  grassSpots: EncounterData;
  caveSpots: EncounterData;
  bridgeSpots: EncounterData;
  superRodSpots: EncounterData;
  surfSpots: EncounterData;
  yellowFlowers: EncounterData;
  purpleFlowers: EncounterData;
  redFlowers: EncounterData;
  roughTerrain: EncounterData;
  gift: EncounterData;
  giftEgg: EncounterData;
  onlyOne: EncounterData;
}

export interface MapType {
  name: string;
  image: string;
  height: number;
  width: number;
  start: PosType;
  walls: Record<number, Record<number, boolean>>;
  text: Record<number, Record<number, string[]>>;
  maps: Record<number, Record<number, MapId>>;
  exits: Record<number, Record<number, boolean>>;
  exitReturnMap?: MapId;
  exitReturnPos?: PosType;
  music?: string;
  encounters?: EncountersType;
  grass: Record<number, Record<number, boolean>>;
}
