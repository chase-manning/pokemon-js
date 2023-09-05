import palletTownImage from "../assets/map/pallet-town.png";
import { MapType } from "./map-types";

const palletTown: MapType = {
  name: "Pallet Town",
  image: palletTownImage,
  height: 18,
  width: 20,
  walls: {
    1: {
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
      10: true,
      11: true,
      12: true,
      13: true,
      14: true,
      15: true,
      16: true,
      17: true,
      18: true,
      19: true,
    },
    2: {
      0: true,
      19: true,
    },
    3: {
      0: true,
      19: true,
    },
    4: {
      0: true,
      19: true,
    },
    5: {
      0: true,
      19: true,
    },
    6: {
      0: true,
      19: true,
    },
    7: {
      0: true,
      19: true,
    },
    8: {
      0: true,
      19: true,
    },
    9: {
      0: true,
      19: true,
    },
    10: {
      0: true,
      19: true,
    },
    11: {
      0: true,
      19: true,
    },
    12: {
      0: true,
      19: true,
    },
    13: {
      0: true,
      19: true,
    },
    14: {
      0: true,
      19: true,
    },
    15: {
      0: true,
      19: true,
    },
    16: {
      0: true,
      19: true,
    },
    17: {
      0: true,
      1: true,
      4: true,
      5: true,
      6: true,
      7: true,
      8: true,
      9: true,
      10: true,
      11: true,
      12: true,
      13: true,
      14: true,
      15: true,
      16: true,
      17: true,
      18: true,
      19: true,
    },
    18: {
      2: true,
      3: true,
    },
  },
};

export default palletTown;
