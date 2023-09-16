import houseA1FImage from "../assets/map/house-a-1f.png";
import houseA2f from "./house-a-2f";
import { MapId, MapType } from "./map-types";

const houseA1f: MapType = {
  name: "House A 1F",
  image: houseA1FImage,
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
      3: true,
    },
    4: {
      3: true,
      4: true,
    },
    5: {
      3: true,
      4: true,
    },
  },
  text: {
    1: {
      3: [
        "Lorem ipsum dolor sit amet, consectetur",
        "adipiscing elit, sed do eiusmod tempor",
        "incididunt ut labore et dolore magna aliqua.",
      ],
    },
  },
  maps: {
    1: {
      7: MapId.PalletTownHouseA2F,
    },
  },
  exits: {
    7: {
      2: true,
      3: true,
    },
  },
  exitReturnPos: {
    x: 5,
    y: 6,
  },
  exitReturnMap: MapId.PalletTown,
};

export default houseA1f;
