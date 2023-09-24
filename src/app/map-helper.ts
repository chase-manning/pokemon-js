import { MapType } from "../maps/map-types";

export const isWall = (map: MapType, x: number, y: number): boolean => {
  return map.walls[y] && map.walls[y][x];
};

export const isFence = (map: MapType, x: number, y: number): boolean => {
  return !!map.fences && map.fences[y] && map.fences[y][x];
};
