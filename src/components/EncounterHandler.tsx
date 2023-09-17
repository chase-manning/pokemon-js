import { useSelector } from "react-redux";
import { selectMap, selectPos } from "../state/gameSlice";
import { useEffect } from "react";
import { PokemonEncounterData } from "../maps/map-types";

const shouldEncounter = (rate: number) => {
  const random = Math.random() * 100;
  return random < rate;
};

const getPokemon = (options: PokemonEncounterData[]) => {
  if (options.length === 0) return null;
  const totalChance = options.reduce((acc, cur) => acc + cur.chance, 0);
  const random = Math.random() * totalChance;
  let current = 0;
  for (const option of options) {
    current += option.chance;
    if (random < current) return option;
  }
  return null;
};

const EncounterHandler = () => {
  const pos = useSelector(selectPos);
  const map = useSelector(selectMap);

  useEffect(() => {
    if (!map.encounters) return;

    // Handling walk encounters
    const isWalk = map.grass[pos.y] ? map.grass[pos.y][pos.x] : false;
    if (isWalk) {
      const encounter = shouldEncounter(map.encounters.walk.rate);
      if (encounter) {
        const pokemon = getPokemon(map.encounters.walk.pokemon);
        if (pokemon) {
          // TODO Enter battle
          console.log("Encounted Pokemon");
          console.log(pokemon);
        }
      }
    }
  }, [pos, map.grass, map.encounters]);

  return null;
};

export default EncounterHandler;
