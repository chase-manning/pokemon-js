import image from "../assets/map/route-22.png";
import { MapId, MapType } from "./map-types";

import getEncounterData from "./get-location-data";
import { rival } from "../app/npcs";
import { Direction } from "../state/state-types";

const route22: MapType = {
  name: "Route 22",
  image,
  height: 18,
  width: 40,
  start: {
    x: 38,
    y: 8,
  },
  walls: {
    1: [30, 31, 32, 33, 34, 35, 36],
    2: [29, 36],
    3: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 36],
    4: [8, 15, 36],
    5: [2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 15, 36, 37, 38, 39],
    6: [1, 14, 15, 22, 23, 24, 25, 26, 27, 28, 29, 34, 35],
    7: [1, 14, 15, 22, 29, 34],
    8: [1, 14, 15, 22, 29, 34],
    9: [1, 14, 15, 22, 23, 24, 25, 29, 34],
    10: [1, 14, 15, 26, 29, 34, 38, 39],
    11: [1, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 26, 29, 34, 38],
    12: [1, 26, 29, 38],
    13: [1, 26, 27, 28, 29, 38],
    14: [1, 38],
    15: [1, 38],
    16: [
      2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
    ],
  },
  fences: {
    3: [30, 31, 32, 34, 35],
    7: [16, 17, 18, 19, 20, 21, 30, 32, 33],
    9: [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13],
    13: [
      2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 30, 31, 32, 34, 35, 36, 37,
    ],
  },
  text: {
    11: {
      7: [
        "Lorem ipsum dolor sit amet, consectetur",
        "adipiscing elit, sed do eiusmod tempor",
        "incididunt ut labore et dolore magna aliqua.",
      ],
    },
  },
  maps: {
    5: {
      8: MapId.GateHouse,
    },
  },
  exits: {
    6: [39],
    7: [39],
    8: [39],
    9: [39],
  },
  grass: {
    8: [16, 17, 18, 19, 20, 21, 30, 31, 32, 33],
    9: [16, 17, 18, 19, 20, 21, 30, 31, 32, 33],
    10: [16, 17, 18, 19, 20, 21, 30, 31, 32, 33],
    11: [16, 17, 18, 19, 20, 21, 30, 31, 32, 33],
  },
  encounters: getEncounterData("kanto-route-12-area"),
  exitReturnMap: MapId.ViridianCity,
  exitReturnPos: {
    x: 1,
    y: 16,
  },
  trainers: [
    {
      npc: rival,
      pokemon: [
        {
          id: 16,
          level: 9,
        },
        {
          id: 1,
          level: 8,
        },
      ],
      facing: Direction.Right,
      intro: [
        "Hey!",
        "You're going to POKEMON LEAGUE?",
        "Forget it! You probably don't have any BADGEs!",
        "The guard won't let you through!",
        "By the way, did your POKEMON get any stronger?",
      ],
      outtro: ["Awww! You just lucked out!"],
      money: 280,
      pos: {
        x: 25,
        y: 5,
      },
    },
  ],
};

export default route22;
