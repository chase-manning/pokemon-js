import labImage from "../assets/map/lab.png";
import { MapType } from "./map-types";

const lab: MapType = {
  name: "Lab",
  image: labImage,
  height: 12,
  width: 10,
  start: {
    x: 5,
    y: 10,
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
      8: true,
      9: true,
    },
    1: {
      0: true,
      1: true,
      2: true,
      3: true,
      6: true,
      7: true,
      8: true,
      9: true,
    },
    3: {
      6: true,
      7: true,
      8: true,
    },
    6: {
      0: true,
      1: true,
      2: true,
      3: true,
      6: true,
      7: true,
      8: true,
      9: true,
    },
    7: {
      0: true,
      1: true,
      2: true,
      3: true,
      6: true,
      7: true,
      8: true,
      9: true,
    },
  },
  text: {
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
    11: {
      4: true,
      5: true,
    },
  },
  exitReturnLocation: {
    x: 12,
    y: 12,
  },
};

export default lab;
