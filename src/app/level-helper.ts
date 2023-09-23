import { PokemonInstance } from "../state/gameSlice";
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

export const getLearnedMove = (pokemon: PokemonInstance): string | null => {
  const pokemonMetadata = getPokemonMetadata(pokemon.id);
  const moves = pokemonMetadata.moves;
  const move = moves.find((move) => move.levelLearnedAt === pokemon.level);
  if (!move) return null;
  if (pokemon.moves.includes(move.name)) return null;
  return move.name;
};
