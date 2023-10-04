import { MoveState, PokemonInstance } from "../state/state-types";
import { getMoveMetadata } from "./use-move-metadata";
import { getPokemonMetadata } from "./use-pokemon-metadata";

const getLevelData = (
  currentLevel: number,
  currentExp: number,
  leveledUp = false
): { level: number; leveledUp: boolean; remainingXp: number } => {
  const nextLevel = currentLevel + 1;
  const nextLevelXp = Math.pow(nextLevel, 3);
  if (currentExp >= nextLevelXp) {
    return getLevelData(nextLevel, currentExp - nextLevelXp, true);
  }
  return {
    level: currentLevel,
    leveledUp: leveledUp,
    remainingXp: currentExp,
  };
};

export default getLevelData;

export const getLearnedMove = (pokemon: PokemonInstance): MoveState | null => {
  const pokemonMetadata = getPokemonMetadata(pokemon.id);
  const moves = pokemonMetadata.moves;
  const move = moves.find((move) => move.levelLearnedAt === pokemon.level);
  if (!move) return null;
  if (pokemon.moves.some((m) => m.id === move.name)) return null;
  return {
    id: move.name,
    pp: getMoveMetadata(move.name).pp || 0,
  };
};
