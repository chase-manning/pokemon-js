import houseA2FImage from "../assets/map/house-a-2f.png";
import { MapId, MapType } from "./map-types";

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
    0: [0, 1, 2, 3, 4, 5, 6, 7],
    1: [0, 1, 2],
    4: [3],
    5: [3],
    6: [0, 6],
    7: [0, 6],
  },
  text: {
    5: {
      3: ["ASH is playing the SNES!", "... Okay! It's time to go!"],
    },
    1: {
      0: ["ASH turned on the PC.", "It's not working..."],
    },
  },
  maps: {},
  exits: {
    1: [7],
  },
  exitReturnPos: {
    x: 6,
    y: 2,
  },
  exitReturnMap: MapId.PalletTownHouseA1F,
  grass: {},
};

export default houseA2f;
