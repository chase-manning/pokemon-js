import palletTownImage from "../assets/map/pallet-town.png";
import { MapId, MapType } from "./map-types";

import music from "../assets/music/maps/pallet-town.mp3";
import getEncounterData from "./get-location-data";

const palletTown: MapType = {
  name: "Pallet Town",
  image: palletTownImage,
  height: 18,
  width: 20,
  start: {
    x: 8,
    y: 13,
  },
  walls: {
    0: [9, 12],
    1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 14, 15, 16, 17, 18, 19],
    2: [0, 19],
    3: [0, 4, 5, 6, 7, 12, 13, 14, 15, 19],
    4: [0, 4, 5, 6, 7, 12, 13, 14, 15, 19],
    5: [0, 3, 4, 6, 7, 11, 12, 14, 15, 19],
    6: [0, 19],
    7: [0, 19],
    8: [0, 4, 10, 11, 12, 13, 14, 15, 19],
    9: [0, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 19],
    10: [0, 10, 11, 12, 13, 14, 15, 19],
    11: [0, 10, 11, 13, 14, 15, 19],
    12: [0, 19],
    13: [0, 10, 11, 12, 13, 14, 15, 19],
    14: [0, 4, 5, 6, 7, 19],
    15: [0, 4, 5, 6, 7, 10, 19],
    16: [0, 4, 5, 6, 7, 19],
    17: [0, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 19],
    18: [2, 3],
  },
  text: {
    5: {
      3: ["ASH's house"],
      11: ["GARRY's house"],
    },
    8: {
      4: [
        "I'm raising POKEMON too!",
        "When they get strong, they can protect me!",
      ],
    },
    9: {
      7: ["PALLET TOWN Shades of your journey await!"],
    },
    13: {
      13: ["OAK POKEMON RESEARCH LAB"],
    },
    15: {
      10: [
        "Technology is incredible!",
        "You can now store and recall items and POKEMON as data via PC!",
      ],
    },
  },
  maps: {
    5: {
      5: MapId.PalletTownHouseA1F,
      13: MapId.PalletTownHouseB,
    },
    11: {
      12: MapId.PalletTownLab,
    },
    0: {
      10: MapId.Route1,
      11: MapId.Route1,
    },
  },
  exits: {},
  music,
  encounters: getEncounterData("pallet-town-area"),
  grass: {},
  recoverLocation: { x: 5, y: 6 },
};

export default palletTown;
