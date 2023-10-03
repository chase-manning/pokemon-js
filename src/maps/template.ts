import image from "../assets/map/pallet-town.png";
import { MapId, MapType } from "./map-types";

const XXX: MapType = {
  name: "XXXX",
  image,
  height: 99999,
  width: 99999,
  start: {
    x: 99999,
    y: 9999,
  },
  walls: {},
  fences: {},
  grass: {},
  text: {},
  maps: {},
  exits: {},
  exitReturnPos: {
    x: 99999,
    y: 9999,
  },
  exitReturnMap: MapId.PalletTown,
};

export default XXX;
