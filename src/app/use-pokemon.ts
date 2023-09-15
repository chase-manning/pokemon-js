import pokemonData from "./pokemon-data";

const usePokemon = (id: number | null) => {
  if (id === null) return null;
  return pokemonData[id];
};

export default usePokemon;
