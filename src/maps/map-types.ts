import { PosType } from "../state/gameSlice";

export interface MapType {
  name: string;
  image: string;
  height: number;
  width: number;
  start: PosType;
  walls: Record<number, Record<number, boolean>>;
  text: Record<number, Record<number, string[]>>;
  maps: Record<number, Record<number, MapType>>;
  exits: Record<number, Record<number, boolean>>;
  exitReturnPos?: PosType;
}
