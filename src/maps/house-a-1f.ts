import houseA1FImage from "../assets/map/lien-apartment.png";
import { MapId, MapType } from "./map-types";

const houseA1f: MapType = {
  name: "Lien's Home",
  image: houseA1FImage,
  height: 12,
  width: 22,
  start: {
    x: 10,
    y: 9,
  },
  walls: {
    0: [
      21, 12, 13, 14, 15, 16, 17, 18, 19, 20, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
      0,
    ],
    1: [1, 2, 3, 4, 5, 21, 18, 19, 12, 11, 6, 7, 0],
    2: [5, 1, 21, 15, 14, 12, 11, 0],
    3: [5, 4, 3, 1, 21, 20, 15, 14, 12, 0],
    4: [3, 4, 5, 6, 1, 21, 20, 18, 19, 12, 8, 9, 10, 11, 0],
    5: [1, 21, 0],
    6: [1, 2, 5, 4, 6, 7, 8, 9, 12, 21, 0],
    7: [1, 5, 9, 6, 12, 13, 14, 15, 21, 0],
    8: [1, 5, 6, 12, 13, 14, 15, 21, 0],
    9: [0, 5, 6, 9, 15, 16, 20, 21],
    10: [0, 4, 1, 5, 6, 7, 9, 12, 15, 16, 17, 18, 19, 20, 21],
    11: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21,
    ],
  },
  text: {
    0: {
      8: ["Beautiful views of Stratford", "You can even see Chase's house!"],
      9: ["Beautiful views of Stratford", "You can even see Chase's house!"],
      13: ["Your balcony is so nice!", "Chase sprayed it recently"],
      14: ["Your balcony is so nice!", "Chase sprayed it recently"],
      15: ["Your balcony is so nice!", "Chase sprayed it recently"],
      16: ["Your balcony is so nice!", "Chase sprayed it recently"],
      20: ["Beautiful views of Stratford", "You can even see Chase's house!"],
    },
    1: {
      18: ["The TV is on", `"Do prawns come from the sea?"`],
      19: ["The TV is on", `"Rhinoaurus"`],
    },
    3: {
      3: [
        "Your bed looks so comfortable!",
        "But you can't sleep yet",
        "There are Pokemon to catch!",
      ],
      4: [
        "Your bed looks so comfortable!",
        "But you can't sleep yet",
        "There are Pokemon to catch!",
      ],
    },
    4: {
      3: [
        "Your bed looks so comfortable!",
        "But you can't sleep yet",
        "There are Pokemon to catch!",
      ],
      4: [
        "Your bed looks so comfortable!",
        "But you can't sleep yet",
        "There are Pokemon to catch!",
      ],
    },
    7: {
      1: ["You wash your hands", "WASH WASH WASH", "Woah so clean!"],
      6: ["You wash your hands", "WASH WASH WASH", "Woah so clean!"],
    },
    8: {
      1: ["You wash your hands", "WASH WASH WASH", "Woah so clean!"],
      6: ["You wash your hands", "WASH WASH WASH", "Woah so clean!"],
      13: ["So many plungers!"],
      14: ["So many plungers!"],
    },
    9: {
      16: ["Remember to close the fridge", "Save the polar bears!"],
      20: ["The dishwasher is on", "Chase must be cleaning"],
    },
    10: {
      17: [
        "Some fruit!",
        "The bananas are strategically placed",
        "to optimize ripening",
      ],
    },
  },
  maps: {},
  exits: {
    10: [10, 11],
  },
  exitReturnPos: {
    x: 5,
    y: 6,
  },
  pc: {
    x: 6,
    y: 1,
  },
  exitReturnMap: MapId.PalletTown,
  grass: {},
};

export default houseA1f;
