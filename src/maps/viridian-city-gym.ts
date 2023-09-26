import image from "../assets/map/viridian-city-gym.png";
import { MapId, MapType } from "./map-types";

const viridianCityGym: MapType = {
  name: "Viridian City GYM",
  image,
  height: 18,
  width: 20,
  start: {
    x: 16,
    y: 16,
  },
  walls: {
    0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    1: [0, 5],
    2: [0, 5],
    3: [0, 5, 6, 8, 9, 11, 12, 13, 14, 15, 16, 17],
    4: [0, 8, 11, 17],
    5: [0, 1, 2, 3, 4, 5, 7, 9, 17],
    6: [5, 7, 9, 10, 11, 12, 13, 14, 17],
    7: [5, 7, 17],
    8: [2, 3, 5, 7, 14, 15, 17],
    9: [2, 3, 5, 7, 15, 17],
    10: [2, 3, 5, 7, 15, 17],
    11: [2, 3, 7, 15, 17],
    12: [2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    13: [2, 3],
    14: [2, 3, 15, 18],
    15: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 18],
  },
  text: {
    15: {
      15: [
        "Lorem ipsum dolor sit amet, consectetur",
        "adipiscing elit, sed do eiusmod tempor",
        "incididunt ut labore et dolore magna aliqua.",
      ],
      18: [
        "Lorem ipsum dolor sit amet, consectetur",
        "adipiscing elit, sed do eiusmod tempor",
        "incididunt ut labore et dolore magna aliqua.",
      ],
    },
  },
  maps: {},
  exits: {
    17: [16, 17],
  },
  grass: {},
  exitReturnMap: MapId.ViridianCity,
  exitReturnPos: {
    x: 32,
    y: 8,
  },
};

export default viridianCityGym;
