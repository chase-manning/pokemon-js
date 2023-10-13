import image from "../assets/map/mt-moon-3f.png";
import music from "../assets/music/maps/mt-moon.mp3";
import getEncounterData from "./get-location-data";
import { MapId, MapType } from "./map-types";

// TODO Add propper exit

const mtMoon3f: MapType = {
  name: "Mt Moon 3F",
  image,
  cave: true,
  music,
  height: 28,
  width: 28,
  start: {
    x: 0,
    y: 0,
  },
  walls: {
    0: [],
    1: [20, 21, 22, 23, 24, 25, 26, 27],
    2: [19],
    3: [4, 5, 6, 7, 19],
    4: [3, 8, 27, 26, 25, 24, 23, 22, 21, 20],
    5: [3, 8],
    6: [3, 8],
    7: [3, 8, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
    8: [3, 8, 13, 26],
    9: [3, 8, 13, 26],
    10: [3, 8, 13, 26],
    11: [3, 8, 13, 26],
    12: [3, 8, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 24],
    13: [3, 8, 24, 25, 26, 27],
    14: [3, 8, 23],
    15: [3, 21, 20, 19, 18, 15, 14, 13, 12, 11, 10, 9, 8, 23],
    16: [3, 22, 23],
    17: [3, 22, 23],
    18: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23],
    19: [23],
    20: [23],
    21: [23],
    22: [23],
    23: [23],
    24: [23],
    25: [23, 22, 21, 20, 19, 18, 17, 16, 15, 13, 12, 11, 10, 14],
    26: [9],
    27: [9],
  },

  fences: {},
  grass: {},
  text: {},
  maps: {},
  exits: {},
  teleports: {
    3: {
      23: {
        map: MapId.MtMoon2f,
        pos: {
          x: 4,
          y: 6,
        },
      },
    },
    5: {
      5: {
        map: MapId.MtMoon1f,
        pos: {
          x: 7,
          y: 5,
        },
      },
    },
    9: {
      25: {
        map: MapId.MtMoon1f,
        pos: {
          x: 16,
          y: 12,
        },
      },
    },
    11: {
      17: {
        map: MapId.MtMoon2f,
        pos: {
          x: 26,
          y: 10,
        },
      },
    },
    17: {
      21: {
        map: MapId.MtMoon2f,
        pos: {
          x: 22,
          y: 16,
        },
      },
    },
    15: {
      25: {
        map: MapId.MtMoon1f,
        pos: {
          x: 26,
          y: 14,
        },
      },
    },
    27: {
      13: {
        map: MapId.MtMoon2f,
        pos: {
          x: 16,
          y: 26,
        },
      },
    },
  },
  exitReturnPos: {
    x: 6,
    y: 5,
  },
  encounters: getEncounterData("mt-moon-b1f"),
  exitReturnMap: MapId.MtMoon1f,
  trainers: [],
};

export default mtMoon3f;
