import { brock, jrTrainerMale } from "../app/npcs";
import { ItemType } from "../app/use-item-data";
import image from "../assets/map/pewter-city-gym.png";
import music from "../assets/music/maps/pokemon-gym.mp3";
import { Direction } from "../state/state-types";
import { MapId, MapType } from "./map-types";

const pewterCityGym: MapType = {
  name: "Pewter City Gym",
  image,
  music,
  height: 14,
  width: 10,
  start: {
    x: 4,
    y: 12,
  },
  walls: {
    0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    1: [0, 9],
    2: [0, 9],
    3: [0, 1, 2, 3, 6, 7, 8, 9],
    4: [0, 9],
    5: [0, 2, 5, 6, 7, 9],
    6: [0, 9],
    7: [0, 2, 5, 6, 7, 9],
    8: [0, 9],
    9: [0, 1, 2, 3, 6, 7, 8, 9],
    10: [3, 6],
  },
  fences: {},
  grass: {},
  text: {},
  maps: {},
  exits: {
    13: [4, 5],
  },
  exitReturnPos: {
    x: 16,
    y: 18,
  },
  exitReturnMap: MapId.PewterCity,
  trainers: [
    {
      npc: jrTrainerMale,
      pokemon: [
        {
          id: 50,
          level: 11,
        },
        {
          id: 27,
          level: 11,
        },
      ],
      money: 220,
      intro: [
        "Stop right there, kid!",
        "You're still light years from facing BROCK!",
      ],
      outtro: ["Darn!", "Light years isn't time, it measures distance!"],
      facing: Direction.Right,
      pos: {
        x: 3,
        y: 6,
      },
    },
    {
      npc: brock,
      pokemon: [
        {
          id: 74,
          level: 12,
        },
        {
          id: 95,
          level: 14,
        },
      ],
      money: 1386,
      intro: [
        "I'm BROCK! I'm PEWTER's GYM LEADER!",
        "I believe in rock hard defense and determination!",
        "That's why my POKEMON are all the rock-type!",
        "Do you still want to challenge me?",
        "Fine then! Show me your best!",
      ],
      outtro: [
        "I took you for granted!",
        "As proof of your victory, here's the BOULDER BADGE!",
        "That's an official POKEMON LEAGUE badge!",
        "Its bearer's POKEMON become more powerful!",
        "The technique FLASH can now be used any time!",
      ],
      facing: Direction.Down,
      pos: {
        x: 4,
        y: 1,
      },
      postGame: {
        message: [
          "Wait! Take this with you!",
          "A TM contains a technique that can be taught to POKEMON!",
          "A TM is good only once!",
          "So when you use one to teach a new technique,",
          "pick the POKEMON carefully!",
          "TM34 contains BIDE!",
          "Your pokemon will absorb damage in battle",
          "then pay it back double!",
        ],
        items: [ItemType.BoulderBadge, ItemType.Tm34],
      },
    },
  ],
};

export default pewterCityGym;
