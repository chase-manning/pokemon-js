import pokemonData, { PokemonMetadata } from "./pokemon-metadata";

const usePokemonMetadata = (id: number | null): PokemonMetadata | null => {
  if (id === null) return null;
  return pokemonData[id];
};

export default usePokemonMetadata;
