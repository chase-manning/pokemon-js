import { ItemType } from "../app/use-item-data";
import { Direction, PokemonEncounterType, PosType } from "../state/state-types";

export enum MapId {
  PalletTown = "pallet-town",
  PalletTownHouseA1F = "pallet-town-house-a-1f",
  PalletTownHouseA2F = "pallet-town-house-a-2f",
  PalletTownHouseB = "pallet-town-house-b",
  Route1 = "route-1",
  PalletTownLab = "pallet-town-lab",
  ViridianCity = "viridian-city",
  ViridianCityGym = "viridian-city-gym",
  ViridianCityPokeMart = "viridian-city-poke-mart",
  ViridianCityPokemonCenter = "viridian-city-pokemon-center",
  ViridianCityPokemonAcadamy = "viridian-city-pokemon-acadamy",
  ViridianCityNpcHouse = "veridian-city-npc-house",
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

export interface TrainerType {
  id: string;
  name: string;
  sprites: {
    small: string;
    large: string;
  };
  pokemon: PokemonEncounterType[];
  facing: Direction;
  intro: string[];
  outtro: string[];
  money: number;
  pos: PosType;
}

export interface MapType {
  name: string;
  image: string;
  height: number;
  width: number;
  start: PosType;
  walls: Record<number, number[]>;
  text: Record<number, Record<number, string[]>>;
  maps: Record<number, Record<number, MapId>>;
  exits: Record<number, number[]>;
  exitReturnMap?: MapId;
  exitReturnPos?: PosType;
  music?: string;
  encounters?: EncountersType;
  grass: Record<number, number[]>;
  recoverLocation?: PosType;
  fences?: Record<number, number[]>;
  pokemonCenter?: PosType;
  pc?: PosType;
  store?: PosType;
  storeItems?: ItemType[];
  spinners?: Record<number, Record<number, Direction>>;
  stoppers?: Record<number, number[]>;
  trainers?: TrainerType[];
}
