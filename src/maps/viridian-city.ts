import viridianCityImage from "../assets/map/viridian-city.png";
import { MapId, MapType } from "./map-types";

import music from "../assets/music/maps/pewter-city.mp3";
import getEncounterData from "./get-location-data";

const viridianCity: MapType = {
  name: "Viridian City",
  image: viridianCityImage,
  height: 36,
  width: 40,
  start: {
    x: 20,
    y: 34,
  },
  walls: {
    0: [16, 20],
    1: [16, 19, 20, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
    2: [16, 20, 23, 36],
    3: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20, 21, 22, 23, 36],
    4: [5, 14, 28, 29, 30, 31, 32, 33, 36],
    5: [5, 8, 9, 10, 11, 12, 13, 14, 15, 28, 29, 30, 31, 32, 33, 36],
    6: [5, 7, 16, 20, 28, 29, 30, 31, 32, 33, 36],
    7: [5, 7, 16, 20, 27, 28, 29, 30, 31, 33, 36],
    8: [5, 7, 16, 20, 21, 22, 23, 36],
    9: [5, 7, 16, 20, 22, 23, 36],
    10: [5, 7, 16, 36],
    11: [5, 7, 16, 36],
    12: [5, 7, 16, 36],
    13: [
      0, 1, 2, 3, 4, 5, 7, 16, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      32, 33, 34, 35, 36,
    ],
    14: [7, 16, 20, 21, 22, 23, 36],
    15: [7, 16, 20, 22, 23, 36],
    16: [8, 9, 10, 11, 12, 13, 14, 15, 28, 29, 30, 31, 36],
    17: [17, 20, 21, 22, 23, 28, 29, 30, 31, 36],
    18: [0, 1, 2, 3, 28, 29, 30, 31, 36],
    19: [3, 28, 30, 31, 36],
    20: [3, 36],
    21: [3, 4, 5, 6, 7, 36],
    22: [3, 8, 22, 23, 24, 25, 36],
    23: [3, 8, 9, 22, 23, 24, 25, 36],
    24: [3, 8, 9, 10, 11, 12, 13, 22, 23, 24, 25, 36],
    25: [3, 8, 9, 10, 11, 12, 13, 22, 24, 25, 36],
    26: [3, 8, 9, 10, 11, 12, 13, 36],
    27: [3, 8, 9, 10, 11, 12, 13, 36],
    28: [3, 36],
    29: [3, 21, 36],
    30: [3, 36],
    31: [
      3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 22, 23, 24,
      25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    ],
    32: [19, 22],
    33: [19, 22],
    34: [19, 22],
    35: [19, 22],
  },
  fences: {
    9: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
    27: [
      4, 5, 6, 7, 14, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      31, 32, 33, 34, 35,
    ],
  },
  text: {
    29: {
      21: [
        "Lorem ipsum dolor sit amet, consectetur",
        "adipiscing elit, sed do eiusmod tempor",
        "incididunt ut labore et dolore magna aliqua.",
      ],
    },
    25: {
      24: [
        "Lorem ipsum dolor sit amet, consectetur",
        "adipiscing elit, sed do eiusmod tempor",
        "incididunt ut labore et dolore magna aliqua.",
      ],
    },
    19: {
      30: [
        "Lorem ipsum dolor sit amet, consectetur",
        "adipiscing elit, sed do eiusmod tempor",
        "incididunt ut labore et dolore magna aliqua.",
      ],
    },
    17: {
      17: [
        "Lorem ipsum dolor sit amet, consectetur",
        "adipiscing elit, sed do eiusmod tempor",
        "incididunt ut labore et dolore magna aliqua.",
      ],
    },
    7: {
      27: [
        "Lorem ipsum dolor sit amet, consectetur",
        "adipiscing elit, sed do eiusmod tempor",
        "incididunt ut labore et dolore magna aliqua.",
      ],
    },
    1: {
      19: [
        "Lorem ipsum dolor sit amet, consectetur",
        "adipiscing elit, sed do eiusmod tempor",
        "incididunt ut labore et dolore magna aliqua.",
      ],
    },
  },
  maps: {
    0: {
      17: MapId.Route2,
      18: MapId.Route2,
      19: MapId.Route2,
    },
    7: {
      32: MapId.ViridianCityGym,
    },
    9: {
      21: MapId.ViridianCityNpcHouse,
    },
    14: {
      0: MapId.Route22,
    },
    15: {
      0: MapId.Route22,
      21: MapId.ViridianCityPokemonAcadamy,
    },
    16: {
      0: MapId.Route22,
    },
    17: {
      0: MapId.Route22,
    },
    19: {
      29: MapId.ViridianCityPokeMart,
    },
    25: {
      23: MapId.ViridianCityPokemonCenter,
    },
  },
  exits: {
    35: [20, 21],
  },
  music,
  grass: {},
  encounters: getEncounterData("viridian-city-area"),
  recoverLocation: { x: 23, y: 26 },
  exitReturnMap: MapId.Route1,
  exitReturnPos: {
    x: 11,
    y: 1,
  },
  trainers: [],
};

export default viridianCity;
