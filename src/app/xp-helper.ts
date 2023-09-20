import { getPokemonMetadata } from "./use-pokemon-metadata";

const getXp = (enemyId: number, enemyLevel: number) => {
  const metadata = getPokemonMetadata(enemyId);
  return Math.round((metadata.baseExperience * enemyLevel) / 6);
};

export default getXp;
