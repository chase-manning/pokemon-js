import image from "../assets/map/viridian-city-gym.png";
import { Direction } from "../state/state-types";
import { MapId, MapType } from "./map-types";
import music from "../assets/music/maps/pokemon-gym.mp3";

const viridianCityGym: MapType = {
  name: "Viridian City GYM",
  image,
  music,
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
  spinners: {
    1: {
      19: Direction.Left,
    },
    2: {
      11: Direction.Right,
      18: Direction.Down,
    },
    6: {
      4: Direction.Down,
    },
    10: {
      16: Direction.Down,
    },
    11: {
      19: Direction.Up,
    },
    13: {
      5: Direction.Right,
    },
    14: {
      4: Direction.Right,
    },
    15: {
      0: Direction.Up,
      1: Direction.Up,
    },
    16: {
      13: Direction.Left,
    },
    17: {
      13: Direction.Left,
    },
  },
  stoppers: {
    1: [11],
    2: [17, 19],
    7: [0],
    9: [1],
    11: [18],
    12: [16],
    13: [4, 13],
    14: [13],
    16: [7],
    17: [1],
  },
};

export default viridianCityGym;
