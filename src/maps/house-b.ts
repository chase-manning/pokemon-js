import houseBImage from "../assets/map/house-b.png";
import { MapType } from "./map-types";

const houseB: MapType = {
  name: "House B",
  image: houseBImage,
  height: 8,
  width: 8,
  start: {
    x: 3,
    y: 6,
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
      7: true,
    },
    3: {
      2: true,
      3: true,
      4: true,
      5: true,
    },
    4: {
      2: true,
      3: true,
      4: true,
      5: true,
    },
    6: {
      0: true,
      7: true,
    },
    7: {
      0: true,
      7: true,
    },
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
    7: {
      2: true,
      3: true,
    },
  },
  exitReturnLocation: {
    x: 13,
    y: 6,
  },
};

export default houseB;
