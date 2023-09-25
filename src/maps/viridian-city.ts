import viridianCityImage from "../assets/map/viridian-city.png";
import { MapId, MapType } from "./map-types";

import music from "../assets/music/maps/pewter-city.mp3";
import getEncounterData from "./get-location-data";

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
  grass: {},
  encounters: getEncounterData("viridian-city-area"),
  recoverLocation: { x: 23, y: 26 },
  exitReturnMap: MapId.Route1,
  exitReturnPos: {
    x: 11,
    y: 1,
  },
};

export default viridianCity;
