import { bugCatcher, lass, youngster } from "../app/npcs";
import image from "../assets/map/route-3.png";
import music from "../assets/music/maps/route-3.mp3";
import { Direction } from "../state/state-types";
import getEncounterData from "./get-location-data";
import { MapId, MapType } from "./map-types";

const route3: MapType = {
  name: "Route 3",
  image,
  music,
  height: 36,
  width: 73,
  start: {
    x: 1,
    y: 27,
  },
  walls: {
    3: [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66],
    4: [53, 60, 61, 63, 66, 68],
    5: [53, 60, 62, 63, 66, 67, 69, 70],
    6: [53, 70],
    7: [53, 67, 70],
    8: [53, 70],
    9: [53, 70],
    10: [53, 70],
    11: [53, 70],
    12: [53, 70],
    13: [53, 70],
    14: [53, 54, 55, 70],
    15: [55, 70],
    16: [55, 64, 65, 66, 67, 68, 69, 70],
    17: [55, 64],
    18: [55, 56, 64],
    19: [55, 56, 64],
    20: [55, 64],
    21: [
      9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
      28, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
      50, 55, 64,
    ],
    22: [9, 28, 33, 55, 50, 60, 61, 62, 63, 64],
    23: [9, 28, 33, 55, 50, 60],
    24: [9, 17, 23, 28, 33, 38, 39, 40, 41, 42, 43, 55, 50, 60],
    25: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 17, 23, 28, 29, 30, 31, 32, 33, 38, 43, 50,
      55, 60, 61, 62, 63, 64, 65, 66,
    ],
    26: [4, 17, 23, 43, 38, 50, 55, 66],
    27: [17, 23, 43, 38, 50, 51, 52, 53, 54, 55, 58, 59, 66],
    28: [9, 17, 23, 43, 38, 66],
    29: [4, 9, 23, 43, 38, 66],
    30: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 23, 43, 38, 66],
    31: [9, 23, 43, 38, 66],
    32: [
      9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
      28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
      46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63,
      64, 65, 66,
    ],
  },
  fences: {
    7: [54, 55, 56, 57],
    9: [64, 65, 66, 67, 68, 69],
    11: [54, 55, 56, 57, 58, 59, 60, 61],
    13: [64, 65, 66, 67, 68, 69],
    15: [56, 57, 58, 59],
    17: [62, 63],
    25: [
      10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 34, 35,
      36, 44, 45, 46, 47, 48, 56, 57, 58,
    ],
    29: [10, 11, 12, 13, 14, 16, 18, 19, 20, 21, 22],
  },
  grass: {
    26: [60, 61, 62, 63, 64, 65],
    27: [60, 61, 62, 63, 64, 65],
    28: [
      58, 59, 60, 61, 62, 63, 64, 65, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
      34, 35, 36, 37,
    ],
    29: [
      58, 59, 60, 61, 62, 63, 64, 65, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
      34, 35, 36, 37,
    ],
    30: [
      58, 59, 60, 61, 62, 63, 64, 65, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
      34, 35, 36, 37,
    ],
    31: [
      58, 59, 60, 61, 62, 63, 64, 65, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
      34, 35, 36, 37,
    ],
  },
  text: {
    7: {
      67: ["MT. MOON", "Tunnel Entrance"],
    },

    27: {
      59: ["ROUTE 3", "MT. MOON AHEAD"],
    },
  },
  maps: {
    5: {
      61: MapId.Route3PokemonCenter,
      68: MapId.MtMoon1f,
    },
  },
  exits: {
    26: [0],
    27: [0],
    28: [0],
    29: [0],
  },
  exitReturnPos: {
    x: 38,
    y: 17,
  },
  encounters: getEncounterData("kanto-route-3-area"),
  exitReturnMap: MapId.PewterCity,
  trainers: [
    {
      npc: lass,
      pokemon: [
        {
          id: 16,
          level: 9,
        },
        {
          id: 16,
          level: 9,
        },
      ],
      facing: Direction.Left,
      intro: ["You looked at me, didn't you?"],
      outtro: ["Quit staring if you don't want to fight!"],
      money: 135,
      pos: {
        x: 16,
        y: 27,
      },
    },
    {
      npc: bugCatcher,
      pokemon: [
        {
          id: 10,
          level: 10,
        },
        {
          id: 10,
          level: 10,
        },
        {
          id: 10,
          level: 10,
        },
      ],
      facing: Direction.Right,
      intro: ["Hey! I met you in VIRIDIAN FORREST!"],
      outtro: [
        "There are other kinds of POKEMON",
        "than those found in the forests!",
      ],
      money: 100,
      pos: {
        x: 10,
        y: 24,
      },
    },
    {
      npc: youngster,
      pokemon: [
        {
          id: 19,
          level: 11,
        },
        {
          id: 23,
          level: 11,
        },
      ],
      facing: Direction.Down,
      intro: ["Hi! I like shorts! They're comfy and easy to wear!"],
      outtro: [
        "Are you storing your POKEMON on PC?",
        "Each box can hold up to 20 POKEMON!",
      ],
      money: 165,
      pos: {
        x: 14,
        y: 22,
      },
    },
    {
      npc: bugCatcher,
      pokemon: [
        {
          id: 13,
          level: 9,
        },
        {
          id: 14,
          level: 9,
        },
        {
          id: 10,
          level: 9,
        },
        {
          id: 11,
          level: 9,
        },
      ],
      facing: Direction.Down,
      intro: ["Are you a trainer? Let's fight!"],
      outtro: [
        "If a POKEMON BOX on the PC gets full,",
        "just switch to another BOX!",
      ],
      money: 90,
      pos: {
        x: 19,
        y: 23,
      },
    },
    {
      npc: youngster,
      pokemon: [
        {
          id: 21,
          level: 14,
        },
      ],
      facing: Direction.Left,
      intro: ["Hey! You're not wearing shorts!"],
      outtro: ["I always wear shorts, even in winter!"],
      money: 210,
      pos: {
        x: 22,
        y: 27,
      },
    },
    {
      npc: lass,
      pokemon: [
        {
          id: 19,
          level: 10,
        },
        {
          id: 32,
          level: 10,
        },
      ],
      facing: Direction.Left,
      intro: ["That look you gave me,", "it's so intriguing!"],
      outtro: ["Avoid fights by not letting people see you!"],
      money: 150,
      pos: {
        x: 23,
        y: 22,
      },
    },
    {
      npc: bugCatcher,
      pokemon: [
        {
          id: 10,
          level: 11,
        },
        {
          id: 11,
          level: 11,
        },
      ],
      facing: Direction.Right,
      intro: ["You can fight my new POKEMON!"],
      outtro: ["Trained POKEMON are stronger than the wild ones!"],
      money: 110,
      pos: {
        x: 24,
        y: 24,
      },
    },
    {
      npc: lass,
      pokemon: [
        {
          id: 39,
          level: 14,
        },
      ],
      facing: Direction.Up,
      intro: ["Eek! Did you touch me?"],
      outtro: ["ROUTE 4 is at the foot of MT. MOON."],
      money: 210,
      pos: {
        x: 33,
        y: 28,
      },
    },
  ],
};

export default route3;
