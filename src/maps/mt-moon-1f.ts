import { bugCatcher, hiker, lass, superNerd, youngster } from "../app/npcs";
import { ItemType } from "../app/use-item-data";
import image from "../assets/map/mt-moon-1f.png";
import music from "../assets/music/maps/mt-moon.mp3";
import { Direction } from "../state/state-types";
import getEncounterData from "./get-location-data";
import { MapId, MapType } from "./map-types";

const mtMoon1f: MapType = {
  name: "Mt. Moon 1F",
  image,
  music,
  cave: true,
  height: 36,
  width: 40,
  start: {
    x: 14,
    y: 34,
  },
  walls: {
    1: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    ],
    2: [1, 12, 13, 38],
    3: [1, 12, 13, 38],
    4: [1, 12, 13, 38],
    5: [1, 12, 13, 38],
    6: [1, 12, 13, 38],
    7: [1, 12, 13, 38],
    8: [1, 12, 13, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 38],
    9: [1, 12, 13, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 38],
    10: [1, 12, 13, 18, 19, 38],
    11: [1, 12, 13, 18, 19, 38],
    12: [1, 12, 13, 18, 19, 32, 33, 38],
    13: [1, 12, 13, 18, 19, 32, 33, 38],
    14: [1, 12, 13, 18, 19, 32, 33, 38],
    15: [1, 12, 13, 18, 19, 32, 33, 38],
    16: [1, 18, 19, 22, 23, 32, 33, 38],
    17: [1, 18, 19, 22, 23, 32, 33, 38],
    18: [1, 2, 3, 4, 5, 6, 7, 8, 9, 18, 19, 22, 23, 32, 33, 38],
    19: [1, 2, 3, 4, 5, 6, 7, 8, 9, 18, 19, 22, 23, 32, 33, 38],
    20: [1, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 22, 23, 32, 33, 38],
    21: [1, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 22, 23, 32, 33, 38],
    22: [1, 8, 9, 22, 23, 32, 33, 38],
    23: [1, 8, 9, 15, 22, 23, 32, 33, 38],
    24: [1, 22, 23, 32, 33, 38],
    25: [1, 22, 23, 32, 33, 38],
    26: [1, 16, 17, 18, 19, 20, 21, 22, 23, 26, 27, 28, 29, 32, 33, 38],
    27: [1, 16, 17, 18, 19, 20, 21, 22, 23, 26, 27, 28, 29, 32, 33, 38],
    28: [1, 16, 17, 18, 19, 26, 27, 28, 29, 38],
    29: [1, 16, 17, 18, 19, 26, 27, 28, 29, 38],
    30: [1, 10, 11, 12, 13, 16, 17, 18, 19, 26, 27, 28, 29, 38],
    31: [1, 10, 11, 12, 13, 16, 17, 18, 19, 26, 27, 28, 29, 38],
    32: [1, 10, 11, 12, 13, 16, 17, 18, 19, 38],
    33: [1, 10, 11, 12, 13, 16, 17, 18, 19, 38],
    34: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23,
      24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    ],
    35: [10, 11, 12, 13, 16, 17, 18, 19],
  },
  fences: {},
  grass: {},
  text: {
    23: {
      15: ["Beware! ZUBAT is a blood sucker!"],
    },
  },
  maps: {},
  exits: {
    35: [14, 15],
  },
  exitReturnPos: {
    x: 68,
    y: 6,
  },
  teleports: {
    11: {
      17: {
        map: MapId.MtMoon3f,
        pos: {
          x: 24,
          y: 10,
        },
      },
    },
    15: {
      25: {
        map: MapId.MtMoon3f,
        pos: {
          x: 26,
          y: 16,
        },
      },
    },
    5: {
      5: {
        map: MapId.MtMoon3f,
        pos: {
          x: 6,
          y: 6,
        },
      },
    },
  },
  exitReturnMap: MapId.Route3,
  encounters: getEncounterData("mt-moon-1f"),
  trainers: [
    {
      npc: bugCatcher,
      pokemon: [
        {
          id: 13, // Weedle
          level: 11,
        },
        {
          id: 14, // Kakuna
          level: 11,
        },
      ],
      facing: Direction.Down,
      intro: ["Suspicious men are in the cave.", "What about you?"],
      outtro: ["I saw them! I'm sure they're from TEAM ROCKET!"],
      money: 110,
      pos: {
        x: 7,
        y: 22,
      },
    },
    {
      npc: lass,
      pokemon: [
        {
          id: 35, // Clefairy
          level: 14,
        },
      ],
      facing: Direction.Down,
      intro: ["What? I'm waiting for my friends to find me here."],
      outtro: ["I heard there are some very rare fossils here."],
      money: 210,
      pos: {
        x: 17,
        y: 23,
      },
    },
    {
      npc: superNerd,
      pokemon: [
        {
          id: 81, // Magnemite
          level: 11,
        },
        {
          id: 100, // Voltorb
          level: 11,
        },
      ],
      facing: Direction.Up,
      intro: ["What! Don't sneak up on me!"],
      outtro: ["I have to find stronger pokemon."],
      money: 275,
      pos: {
        x: 24,
        y: 31,
      },
    },
    {
      npc: bugCatcher,
      pokemon: [
        {
          id: 10, // Caterpie
          level: 11,
        },
        {
          id: 11, // Metapod
          level: 11,
        },
        {
          id: 10, // Caterpie
          level: 11,
        },
      ],
      facing: Direction.Right,
      intro: ["Go through this cave to CERULEAN CITY!"],
      outtro: ["Zubat is tough! But it can be useful if you catch one."],
      money: 100,
      pos: {
        x: 30,
        y: 27,
      },
    },
    {
      npc: lass,
      pokemon: [
        {
          id: 43, // Oddish
          level: 11,
        },
        {
          id: 69, // Bellspout
          level: 11,
        },
      ],
      facing: Direction.Down,
      intro: ["Wow! It's way bigger in here than I thought!"],
      outtro: ["How do you get out of here?"],
      money: 165,
      pos: {
        x: 30,
        y: 4,
      },
    },
    {
      npc: hiker,
      pokemon: [
        {
          id: 74, // Geodude
          level: 10,
        },
        {
          id: 74, // Geodude
          level: 10,
        },
        {
          id: 95, // Onix
          level: 10,
        },
      ],
      facing: Direction.Down,
      intro: ["Woah! You shocked me!", "Oh you're just a kid."],
      outtro: ["Kids like you shouldn't be here!"],
      money: 150,
      pos: {
        x: 5,
        y: 6,
      },
    },
    {
      npc: youngster,
      pokemon: [
        {
          id: 19, // Rattata
          level: 10,
        },
        {
          id: 19, // Rattata
          level: 10,
        },
        {
          id: 41, // Zubat
          level: 10,
        },
      ],
      facing: Direction.Right,
      intro: ["Did you come to explore too?"],
      outtro: ["I came down here to off to girls."],
      money: 150,
      pos: {
        x: 12,
        y: 16,
      },
    },
  ],
  items: [
    {
      item: ItemType.Tm12,
      pos: {
        x: 5,
        y: 32,
      },
    },
    {
      item: ItemType.Potion,
      pos: {
        x: 2,
        y: 20,
      },
    },
    {
      item: ItemType.Potion,
      pos: {
        x: 20,
        y: 33,
      },
    },
    {
      item: ItemType.Revive, // TODO: should be RareCandy
      pos: {
        x: 35,
        y: 31,
      },
    },
    {
      item: ItemType.PokeBall, // TODO: should be EscapeRope
      pos: {
        x: 36,
        y: 23,
      },
    },
    {
      item: ItemType.MoonStone,
      hidden: true,
      pos: {
        x: 2,
        y: 2,
      },
    },
  ],
};

export default mtMoon1f;
