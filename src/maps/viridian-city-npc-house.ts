import image from "../assets/map/viridian-city-npc-house.png";
import { MapId, MapType } from "./map-types";

const viridianCityNpcHouse: MapType = {
  name: "Viridian City NPC House",
  image,
  height: 8,
  width: 8,
  start: {
    x: 2,
    y: 6,
  },
  walls: {
    0: [0, 1, 2, 3, 4, 5, 6, 7],
    1: [0, 1, 7],
    3: [3, 4],
    4: [3, 4],
    6: [0, 7],
    7: [0, 7],
  },
  text: {
    0: {
      3: [
        "Lorem ipsum dolor sit amet, consectetur",
        "adipiscing elit, sed do eiusmod tempor",
        "incididunt ut labore et dolore magna aliqua.",
      ],
    },
  },
  maps: {},
  exits: {
    7: [2, 3],
  },
  grass: {},
  exitReturnMap: MapId.ViridianCity,
  exitReturnPos: {
    x: 21,
    y: 10,
  },
};

export default viridianCityNpcHouse;
