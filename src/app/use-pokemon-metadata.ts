import pokemonData, { PokemonMetadata } from "./pokemon-metadata";

export const getPokemonMetadata = (id: number): PokemonMetadata => {
  if (!pokemonData[id]) throw new Error(`No metadata for pokemon ${id}`);
  return pokemonData[id];
};

const usePokemonMetadata = (id: number | null): PokemonMetadata | null => {
  if (id === null) return null;
  return pokemonData[id];
};

export default usePokemonMetadata;
