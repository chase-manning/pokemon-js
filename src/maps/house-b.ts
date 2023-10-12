import houseBImage from "../assets/map/house-b.png";
import { MapId, MapType } from "./map-types";

const houseB: MapType = {
  name: "Chase's House",
  image: houseBImage,
  height: 8,
  width: 8,
  start: {
    x: 3,
    y: 6,
  },
  walls: {
    0: [0, 1, 2, 3, 4, 5, 6, 7],
    1: [0, 1, 4, 7],
    3: [3, 4],
    4: [3, 4],
    6: [0, 7],
    7: [0, 7],
  },
  text: {
    1: {
      4: ["Love you!!"],
    },
  },
  maps: {},
  exits: {
    7: [2, 3],
  },
  exitReturnPos: {
    x: 13,
    y: 6,
  },
  exitReturnMap: MapId.PalletTown,
  grass: {},
};

export default houseB;
