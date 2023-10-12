import { useDispatch, useSelector } from "react-redux";
import { encounterPokemon, selectMap, selectPos } from "../state/gameSlice";
import { useEffect } from "react";
import { PokemonEncounterData } from "../maps/map-types";
import { DEBUG_MODE } from "../app/constants";
import { isGrass } from "../app/map-helper";
import { PokemonEncounterType } from "../state/state-types";
import getPokemonEncounter from "../app/pokemon-encounter-helper";

const shouldEncounter = (rate: number) => {
  const random = Math.random() * 255;
  return random < rate;
};

// Inclusive
const randBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getPokemon = (
  options: PokemonEncounterData[]
): PokemonEncounterType | null => {
  if (options.length === 0) return null;
  const totalChance = options.reduce((acc, cur) => acc + cur.chance, 0);
  const random = Math.random() * totalChance;
  let current = 0;
  for (const option of options) {
    current += option.chance;
    if (random < current) {
      return getPokemonEncounter(
        option.id,
        randBetween(option.minLevel, option.maxLevel)
      );
    }
  }
  return null;
};

const EncounterHandler = () => {
  const dispatch = useDispatch();
  const pos = useSelector(selectPos);
  const map = useSelector(selectMap);

  useEffect(() => {
    if (!map.encounters || DEBUG_MODE) return;

    // Handling walk encounters
    const isWalk = map.cave ? true : isGrass(map.grass, pos.x, pos.y);
    if (isWalk) {
      const encounter = shouldEncounter(map.encounters.walk.rate);
      if (encounter) {
        const pokemon = getPokemon(map.encounters.walk.pokemon);
        if (pokemon) {
          dispatch(encounterPokemon(pokemon));
        }
      }
    }
  }, [pos, map.grass, map.encounters, dispatch, map.cave]);

  return null;
};

export default EncounterHandler;
