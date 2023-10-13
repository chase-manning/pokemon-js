import { superNerd, teamRocketGrunt } from "../app/npcs";
import image from "../assets/map/mt-moon-2f.png";
import music from "../assets/music/maps/mt-moon.mp3";
import { Direction } from "../state/state-types";
import getEncounterData from "./get-location-data";
import { MapId, MapType } from "./map-types";

// TODO Add propper exit
// TODO Add propper start
// TODO Add items
// TODO Add fossils (You want the HELIX FOSSIL? (yes no) on the right... You want the DOME FOSSIL? (yes no) on the left...

const mtMoon2f: MapType = {
  name: "Mt Moon 2F",
  image,
  music,
  cave: true,
  height: 36,
  width: 40,
  start: {
    x: 3,
    y: 6,
  },
  walls: {
    0: [],
    1: [2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 8],
    2: [2, 17, 19],
    3: [2, 17, 19],
    4: [2, 17, 19, 20, 21, 22, 23, 26, 27, 28, 29, 30, 31],
    5: [
      2, 1, 4, 5, 6, 7, 8, 9, 10, 11, 14, 15, 16, 19, 23, 24, 25, 26, 31, 32,
      33, 34, 35, 36,
    ],
    6: [1, 8, 17, 19, 23, 26, 31, 36],
    7: [1, 8, 17, 19, 23, 26, 27, 30, 31, 36],
    8: [1, 8, 17, 18, 19, 23, 36],
    9: [1, 2, 3, 4, 5, 6, 7, 8, 17, 14, 11, 10, 9, 18, 19, 23, 36, 33],
    10: [17, 14, 7, 18, 19, 23, 36],
    11: [
      17, 14, 15, 16, 7, 18, 19, 39, 23, 36, 37, 38, 24, 25, 26, 27, 28, 29, 30,
      31, 32, 33, 34, 35,
    ],
    12: [7, 39, 30, 29, 18, 19],
    13: [7, 8, 9, 10, 11, 15, 16, 17, 18, 19, 39, 30, 29, 14],
    14: [11, 14, 19, 39, 30, 29],
    15: [
      11, 10, 9, 8, 7, 6, 14, 15, 16, 17, 18, 19, 24, 25, 39, 35, 34, 31, 30,
      29, 28,
    ],
    16: [6, 18, 19, 24, 39, 35],
    17: [6, 18, 19, 24, 39, 35],
    18: [6, 18, 19, 24, 39, 35],
    19: [
      6, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
      30, 31, 32, 39, 35,
    ],
    20: [6, 12, 13, 31, 39, 35],
    21: [
      6, 12, 13, 30, 27, 28, 29, 22, 21, 20, 19, 18, 17, 16, 15, 14, 31, 32, 33,
      34, 35, 39,
    ],
    22: [6, 12, 13, 30, 27, 22, 31, 39],
    23: [6, 12, 13, 30, 27, 26, 23, 22, 31, 39],
    24: [6, 12, 13, 30, 31, 39],
    25: [6, 35, 12, 13, 30, 31, 36, 37, 38, 39],
    26: [6, 35, 12, 13, 30, 31],
    27: [6, 35, 12, 13, 30, 31],
    28: [
      6, 35, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
      29, 30, 31,
    ],
    29: [6, 35, 22, 23, 24, 25, 26, 12, 31],
    30: [
      6, 35, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 26, 27, 28, 29, 30, 25,
      24, 23, 31,
    ],
    31: [6, 35],
    32: [6, 35],
    33: [
      6, 7, 8, 10, 13, 16, 18, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
      33, 34, 35, 22, 19, 17, 15, 14, 12, 11, 9,
    ],
    34: [],
    35: [],
  },
  fences: {},
  grass: {},
  text: {},
  maps: {},
  exits: {},
  teleports: {
    7: {
      5: {
        map: MapId.MtMoon3f,
        pos: {
          x: 22,
          y: 2,
        },
      },
    },
    9: {
      25: {
        map: MapId.MtMoon3f,
        pos: {
          x: 18,
          y: 10,
        },
      },
    },
    17: {
      21: {
        map: MapId.MtMoon3f,
        pos: {
          x: 20,
          y: 17,
        },
      },
    },
    27: {
      15: {
        map: MapId.MtMoon3f,
        pos: {
          x: 14,
          y: 26,
        },
      },
    },
  },

  encounters: getEncounterData("mt-moon-b2f"),
  exitReturnPos: {
    x: 1,
    y: 1,
  },
  exitReturnMap: MapId.MtMoon1f,
  trainers: [
    {
      npc: teamRocketGrunt,
      pokemon: [
        {
          id: 27, // Sandshrew
          level: 11,
        },
        {
          id: 19, // Rattata
          level: 11,
        },
        {
          id: 41, // Zubat
          level: 11,
        },
      ],
      facing: Direction.Down,
      intro: ["We, Team Rocket, are POKEMON gangsters!"],
      outtro: ["Darn it all! MY associates won't stand for this!"],
      money: 330,
      pos: {
        x: 15,
        y: 22,
      },
    },
    {
      npc: teamRocketGrunt,
      pokemon: [
        {
          id: 41, // Zubat
          level: 12,
        },
        {
          id: 23, // Ekans
          level: 12,
        },
      ],
      facing: Direction.Up,
      intro: ["We're pulling a big job here! Get lost, kid!"],
      outtro: ["If you find a fossil, give it to me and scram!"],
      money: 360,
      pos: {
        x: 29,
        y: 11,
      },
    },
    {
      npc: teamRocketGrunt,
      pokemon: [
        {
          id: 20, // Raticate
          level: 16,
        },
      ],
      facing: Direction.Left,
      intro: ["Little kid should leave grown-ups alone!"],
      outtro: ["Pokemon lived here long before people came."],
      money: 390,
      pos: {
        x: 29,
        y: 17,
      },
    },
    {
      npc: teamRocketGrunt,
      pokemon: [
        {
          id: 19, // Rattata
          level: 13,
        },
        {
          id: 41, // Zubat
          level: 13,
        },
      ],
      facing: Direction.Down,
      intro: [
        "TEAM ROCKET will find the fossils, revive and sell them for cash!",
      ],
      outtro: ["You made me mad! TEAM ROCKET will blacklist you!"],
      money: 390,
      pos: {
        x: 11,
        y: 16,
      },
    },
    {
      npc: superNerd,
      pokemon: [
        {
          id: 88, // Grimer
          level: 12,
        },
        {
          id: 100, // Voltorb
          level: 12,
        },
        {
          id: 109, // Koffing
          level: 12,
        },
      ],
      facing: Direction.Right,
      intro: ["Hey stop!", "I found these fossils! They're both mine!"],
      outtro: ["We'll each take one!", "No being greedy!"],
      money: 300,
      pos: {
        x: 12,
        y: 8,
      },
    },
  ],
};

export default mtMoon2f;
