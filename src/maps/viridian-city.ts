import viridianCityImage from "../assets/map/viridian-city.png";
import { MapId, MapType } from "./map-types";

import music from "../assets/music/maps/pewter-city.mp3";

const viridianCity: MapType = {
  name: "Viridian City",
  image: viridianCityImage,
  height: 36,
  width: 40,
  start: {
    x: 20,
    y: 34,
  },
  walls: {},
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
  maps: {},
  exits: {
    35: [20, 21],
  },
  music,
  encounters: {
    walk: { rate: 0, pokemon: [] },
    oldRod: {
      rate: 10,
      pokemon: [
        {
          id: 129,
          chance: 100,
          conditionValues: [],
          maxLevel: 5,
          minLevel: 5,
        },
      ],
    },
    goodRod: {
      rate: 10,
      pokemon: [
        {
          id: 60,
          chance: 50,
          conditionValues: [],
          maxLevel: 10,
          minLevel: 10,
        },
        {
          id: 118,
          chance: 50,
          conditionValues: [],
          maxLevel: 10,
          minLevel: 10,
        },
      ],
    },
    superRod: {
      rate: 10,
      pokemon: [
        {
          id: 60,
          chance: 17,
          conditionValues: [],
          maxLevel: 15,
          minLevel: 15,
        },
        {
          id: 60,
          chance: 8,
          conditionValues: [],
          maxLevel: 15,
          minLevel: 15,
        },
        {
          id: 60,
          chance: 25,
          conditionValues: [],
          maxLevel: 15,
          minLevel: 15,
        },
        {
          id: 72,
          chance: 25,
          conditionValues: [],
          maxLevel: 15,
          minLevel: 15,
        },
        {
          id: 72,
          chance: 8,
          conditionValues: [],
          maxLevel: 15,
          minLevel: 15,
        },
        {
          id: 72,
          chance: 17,
          conditionValues: [],
          maxLevel: 15,
          minLevel: 15,
        },
      ],
    },
    surf: { rate: 1, pokemon: [] },
    rockSmash: { rate: 0, pokemon: [] },
    headbutt: { rate: 0, pokemon: [] },
    darkGrass: { rate: 0, pokemon: [] },
    grassSpots: { rate: 0, pokemon: [] },
    caveSpots: { rate: 0, pokemon: [] },
    bridgeSpots: { rate: 0, pokemon: [] },
    superRodSpots: { rate: 0, pokemon: [] },
    surfSpots: { rate: 0, pokemon: [] },
    yellowFlowers: { rate: 0, pokemon: [] },
    purpleFlowers: { rate: 0, pokemon: [] },
    redFlowers: { rate: 0, pokemon: [] },
    roughTerrain: { rate: 0, pokemon: [] },
    gift: {
      rate: 0,
      pokemon: [
        {
          id: 1,
          chance: 100,
          conditionValues: [],
          maxLevel: 5,
          minLevel: 5,
        },
        {
          id: 4,
          chance: 100,
          conditionValues: [],
          maxLevel: 5,
          minLevel: 5,
        },
        {
          id: 7,
          chance: 100,
          conditionValues: [],
          maxLevel: 5,
          minLevel: 5,
        },
      ],
    },
    giftEgg: { rate: 0, pokemon: [] },
    onlyOne: { rate: 0, pokemon: [] },
  },
  grass: {},
  recoverLocation: { x: 23, y: 26 },
  exitReturnMap: MapId.Route1,
  exitReturnPos: {
    x: 11,
    y: 1,
  },
};

export default viridianCity;
