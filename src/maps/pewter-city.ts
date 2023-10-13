import image from "../assets/map/pewter-city.png";
import { MapId, MapType } from "./map-types";
import music from "../assets/music/maps/pewter-city.mp3";

const pewterCity: MapType = {
  name: "Pewter City",
  music,
  image,
  height: 36,
  width: 40,
  start: {
    x: 19,
    y: 34,
  },
  walls: {
    1: [
      4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
      24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
    ],
    2: [3, 10, 17, 23, 35],
    3: [3, 10, 17, 23, 24, 25, 26, 27, 35],
    4: [3, 10, 16, 17, 19, 23, 26, 35],
    5: [3, 10, 17, 18, 20, 21, 22, 23, 26, 27, 35],
    6: [3, 10, 14, 17, 27, 35],
    7: [3, 10, 11, 12, 13, 15, 16, 17, 27, 35],
    8: [3, 35],
    9: [3, 15, 35],
    10: [3, 34],
    11: [3, 34],
    12: [3, 28, 29, 30, 31, 34],
    13: [3, 28, 30, 31, 34],
    14: [3, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 34],
    15: [3, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 34, 35, 36, 37, 38, 39],
    16: [3, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 35],
    17: [3, 11, 12, 13, 14, 15, 17, 22, 24, 25],
    18: [3, 18],
    19: [3, 18, 33],
    20: [3, 18, 34, 35, 36, 37, 38, 39],
    21: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 34],
    22: [3, 12, 13, 14, 15, 34],
    23: [3, 12, 13, 14, 15, 22, 23, 24, 25, 26, 27, 28, 29, 34],
    24: [3, 12, 13, 14, 15, 21, 30, 34],
    25: [3, 12, 14, 15, 21, 30, 34, 35],
    26: [3, 21, 30, 35],
    27: [3, 21, 30, 35],
    28: [3, 6, 7, 8, 9, 21, 30, 35],
    29: [3, 6, 8, 9, 19, 21, 30, 35],
    30: [3, 35],
    31: [3, 35],
    32: [
      4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 20, 21, 22, 23, 24, 25,
      26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
    ],
    33: [17, 20],
    34: [17, 20],
    35: [17, 20],
  },
  fences: {
    7: [
      4, 5, 6, 8, 9, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28, 29, 30, 32, 33, 34,
    ],
    29: [22, 23, 24, 26, 27, 28, 29],
  },
  grass: {},
  text: {
    9: {
      15: ["PEWTER MUSEUM OF SCIENCE"],
    },
    17: {
      11: [
        "PEWTER CITY POKEMON GYM LEADER: BROCK",
        "The Rock Solid POKEMON Trainer!",
      ],
    },
    19: {
      33: [
        "NOTICE!",
        "Thieves have been stealing POKEMON fossils at MT. MOON!",
        "Please call PEWTER POLICE with any info!",
      ],
    },
    23: {
      25: ["PEWTER CITY", "A Stone Gray City"],
    },
    29: {
      19: [
        "TRAINER TIPS",
        "Any Pokemon that takes part in battle,",
        "however short, earns Exp!",
      ],
    },
  },
  maps: {
    7: {
      14: MapId.PewterCityMuseum1f,
    },
    13: {
      29: MapId.PewterCityNpcB,
    },
    16: {
      39: MapId.Route3,
    },
    17: {
      16: MapId.PewterCityGym,
      23: MapId.PewterCityPokeMart,
      39: MapId.Route3,
    },
    18: {
      39: MapId.Route3,
    },
    19: {
      39: MapId.Route3,
    },
    25: {
      13: MapId.PewterCityPokemonCenter,
    },
    29: {
      7: MapId.PewterCityNpcA,
    },
  },
  recoverLocation: { x: 13, y: 26 },
  exits: {
    35: [18, 19],
  },
  exitReturnPos: {
    x: 5,
    y: 1,
  },
  exitReturnMap: MapId.Route2GateNorth,
};

export default pewterCity;
