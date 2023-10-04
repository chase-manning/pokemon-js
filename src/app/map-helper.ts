import mapData from "../maps/map-data";
import { MapId, MapItemType, TrainerType } from "../maps/map-types";
import { Direction, PosType } from "../state/state-types";
import { TRAINER_VISION } from "./constants";

export const isWall = (
  walls: Record<number, number[]>,
  x: number,
  y: number
): boolean => {
  return walls[y] && walls[y].includes(x);
};

export const isFence = (
  fences: Record<number, number[]> | undefined,
  x: number,
  y: number
): boolean => {
  return !!fences && fences[y] && fences[y].includes(x);
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

export const isTrainer = (
  trainers: TrainerType[] | undefined,
  x: number,
  y: number
): boolean => {
  return (
    !!trainers &&
    trainers.some((trainer) => trainer.pos.x === x && trainer.pos.y === y)
  );
};

export const isItem = (
  items: MapItemType[] | undefined,
  x: number,
  y: number,
  collectedItems: string[],
  mapId: string
): boolean => {
  return (
    !!items &&
    items.some((item) => {
      const id = `${mapId}-${item.pos.x}-${item.pos.y}`;
      const isPosition = item.pos.x === x && item.pos.y === y;
      return isPosition && !collectedItems.includes(id);
    })
  );
};

export const canWalk = (
  x: number,
  y: number,
  mapId: MapId,
  collectedItems: string[]
) => {
  const map = mapData[mapId];
  if (isItem(map.items, x, y, collectedItems, mapId)) return false;
  if (isWall(map.walls, x, y)) return false;
  if (isFence(map.fences, x, y)) return false;
  if (isTrainer(map.trainers, x, y)) return false;
  return true;
};

export const directionModifier = (direction: Direction): PosType => {
  if (direction === Direction.Down) return { x: 0, y: 1 };
  if (direction === Direction.Up) return { x: 0, y: -1 };
  if (direction === Direction.Left) return { x: -1, y: 0 };
  if (direction === Direction.Right) return { x: 1, y: 0 };
  throw new Error("Invalid direction");
};

const isEncounter = (
  trainer: TrainerType,
  walls: Record<number, number[]>,
  fences: Record<number, number[]> | undefined,
  trainers: TrainerType[],
  pos: PosType,
  defeatedTrainers: string[],
  mapId: MapId
): boolean => {
  const trainerId = `${mapId}-${trainer.pos.x}-${trainer.pos.y}`;
  if (defeatedTrainers.includes(trainerId)) return false;

  let { x: tX, y: tY } = trainer.pos;
  let { x: pX, y: pY } = pos;

  const direction = directionModifier(trainer.facing);
  for (let i = 1; i < TRAINER_VISION; i++) {
    tX += direction.x;
    tY += direction.y;

    if (tX === pX && tY === pY) return true;
    if (isWall(walls, tX, tY)) return false;
    if (isFence(fences, tX, tY)) return false;
    if (isTrainer(trainers, pos.x, pos.y)) return false;
  }
  return false;
};

export const isTrainerEncounter = (
  trainers: TrainerType[],
  walls: Record<number, number[]>,
  fences: Record<number, number[]> | undefined,
  pos: PosType,
  defeatedTrainers: string[],
  mapId: MapId
): TrainerType | null => {
  for (let i = 0; i < trainers.length; i++) {
    if (
      isEncounter(
        trainers[i],
        walls,
        fences,
        trainers,
        pos,
        defeatedTrainers,
        mapId
      )
    )
      return trainers[i];
  }
  return null;
};
