import { BLOCK_PIXEL_HEIGHT, BLOCK_PIXEL_WIDTH } from "./constants";

export const xToPx = (x: number) => {
  return `calc((${BLOCK_PIXEL_WIDTH}vw / 2.34) * ${x})`;
};

export const yToPx = (y: number) => {
  return `calc((${BLOCK_PIXEL_HEIGHT}vw / 2.34) * ${y})`;
};
