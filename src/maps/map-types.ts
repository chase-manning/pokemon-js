import { NpcType } from "../app/npcs";
import { ItemType } from "../app/use-item-data";
import { Direction, PosType } from "../state/state-types";

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
  Route22 = "route-22",
  GateHouse = "gate-house",
  Route2 = "route-2",
  Route2Gate = "route-2-gate",
  ViridianForrest = "viridian-forrest",
  Route2GateNorth = "route-2-gate-north",
  PewterCity = "pewter-city",
  PewterCityPokeMart = "pewter-city-poke-mart",
  PewterCityPokemonCenter = "pewter-city-pokemon-center",
  PewterCityNpcA = "pewter-city-npc-a",
  PewterCityNpcB = "pewter-city-npc-b",
  PewterCityGym = "pewter-city-gym",
  PewterCityMuseum1f = "pewter-city-museum-1f",
  PewterCityMuseum2f = "pewter-city-museum-2f",
  Route3 = "route-3",
  Route3PokemonCenter = "route-3-pokemon-center",
  MtMoon1f = "mt-moon-1f",
  MtMoon2f = "mt-moon-2f",
  MtMoon3f = "mt-moon-3f",
}

export interface PokemonMinimalType {
  id: number;
  level: number;
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
  npc: NpcType;
  pokemon: PokemonMinimalType[];
  facing: Direction;
  intro: string[];
  outtro: string[];
  money: number;
  pos: PosType;
  postGame?: {
    message: string[];
    items?: ItemType[];
  };
}

export interface MapItemType {
  pos: PosType;
  item: ItemType;
  hidden?: boolean;
}

export interface MapWithPos {
  map: MapId;
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
  teleports?: Record<number, Record<number, MapWithPos>>;
  exits: Record<number, number[]>;
  cave?: boolean;
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
  items?: MapItemType[];
}
