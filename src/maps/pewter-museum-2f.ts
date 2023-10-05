import image from "../assets/map/pewter-museum-2f.png";
import { MapId, MapType } from "./map-types";

const pewterMuseum2f: MapType = {
  name: "Pewter Museum 2F",
  image,
  height: 8,
  width: 14,
  start: {
    x: 7,
    y: 6,
  },
  walls: {
    0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    1: [10, 11, 12],
    2: [10, 11, 12],
    4: [1, 2, 3, 4],
    5: [1, 2, 3, 4, 8],
    6: [8],
    7: [8],
  },
  fences: {},
  grass: {},
  text: {
    2: {
      11: ["SPACE SHUTTLE COLUMBIA"],
    },
    5: {
      2: ["Meteorite that fell on Mt. Moon", "(MOON STONE?)"],
    },
  },
  maps: {},
  exits: {
    7: [7],
  },
  exitReturnPos: {
    x: 7,
    y: 6,
  },
  exitReturnMap: MapId.PewterCityMuseum1f,
};

export default pewterMuseum2f;
