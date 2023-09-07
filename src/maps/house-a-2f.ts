import houseA2FImage from "../assets/map/house-a-2f.png";
import { MapType } from "./map-types";

const houseA2f: MapType = {
  name: "House A 2F",
  image: houseA2FImage,
  height: 8,
  width: 8,
  start: {
    x: 6,
    y: 2,
  },
  walls: {
    0: {
      0: true,
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
      7: true,
    },
    1: {
      0: true,
      1: true,
      2: true,
    },
    4: {
      3: true,
    },
    5: {
      3: true,
    },
    6: {
      0: true,
      6: true,
    },
    7: {
      0: true,
      6: true,
    },
  },
  text: {
    5: {
      3: [
        "Lorem ipsum dolor sit amet, consectetur",
        "adipiscing elit, sed do eiusmod tempor",
        "incididunt ut labore et dolore magna aliqua.",
      ],
    },
    1: {
      0: [
        "Lorem ipsum dolor sit amet, consectetur",
        "adipiscing elit, sed do eiusmod tempor",
        "incididunt ut labore et dolore magna aliqua.",
      ],
    },
  },
  maps: {},
  exits: {
    1: {
      7: true,
    },
  },
  exitReturnLocation: {
    x: 6,
    y: 2,
  },
};

export default houseA2f;
