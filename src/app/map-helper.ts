import { MapType } from "../maps/map-types";

export const isWall = (map: MapType, x: number, y: number): boolean => {
  return map.walls[y] && map.walls[y].includes(x);
};

export const isFence = (map: MapType, x: number, y: number): boolean => {
  return !!map.fences && map.fences[y] && map.fences[y].includes(x);
};

export const isGrass = (
  grass: Record<number, number[]> | undefined,
  x: number,
  y: number
): boolean => {
  return !!grass && grass[y] && grass[y].includes(x);
};

export const isExit = (
  exits: Record<number, number[]> | undefined,
  x: number,
  y: number
): boolean => {
  return !!exits && exits[y] && exits[y].includes(x);
};
