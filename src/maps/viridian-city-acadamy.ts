import image from "../assets/map/viridian-city-pokemon-acadamy.png";
import { MapId, MapType } from "./map-types";

const viridianCityAcadamy: MapType = {
  name: "Viridian City Academy",
  image,
  height: 8,
  width: 8,
  start: {
    x: 2,
    y: 6,
  },
  walls: {
    0: [0, 1, 2, 3, 4, 5, 6, 7],
    1: [7],
    3: [3, 4],
    4: [3, 4],
    6: [0, 7],
    7: [0, 7],
  },
  text: {
    0: {
      3: [
        "The specials for today:",
        "- Cheeseburger $10",
        "- Hamburger $11",
        "- Pizza $13",
      ],
    },
    4: {
      3: ["It's the questions for the pub quiz!", "Don't cheat!"],
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
    y: 16,
  },
};

export default viridianCityAcadamy;
