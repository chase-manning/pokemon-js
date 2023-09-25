import image from "../assets/map/viridian-city-pokemon-center.png";
import { MapId, MapType } from "./map-types";

import music from "../assets/music/maps/pokemon-center.mp3";

const viridianCityPokemonCenter: MapType = {
  name: "Viridian City Pokemon Center",
  image,
  height: 8,
  width: 14,
  start: {
    x: 4,
    y: 6,
  },
  walls: {
    2: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    3: [13],
    4: [0],
    5: [0],
    6: [1, 6, 7, 12, 13],
    7: [1, 6, 7, 12, 13],
  },
  text: {
    4: {
      0: [
        "Lorem ipsum dolor sit amet, consectetur",
        "adipiscing elit, sed do eiusmod tempor",
        "incididunt ut labore et dolore magna aliqua.",
      ],
    },
  },
  maps: {},
  exits: {
    7: [3, 4],
  },
  music,
  grass: {},
  exitReturnMap: MapId.ViridianCity,
  exitReturnPos: {
    x: 23,
    y: 26,
  },
  pokemonCenter: {
    x: 3,
    y: 2,
  },
  pc: {
    x: 13,
    y: 3,
  },
};

export default viridianCityPokemonCenter;
