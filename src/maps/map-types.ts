import { PosType } from "../state/gameSlice";

export enum MapId {
  PalletTown = "pallet-town",
  PalletTownHouseA1F = "pallet-town-house-a-1f",
  PalletTownHouseA2F = "pallet-town-house-a-2f",
  PalletTownHouseB = "pallet-town-house-b",
  PalletTownLab = "pallet-town-lab",
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
}
