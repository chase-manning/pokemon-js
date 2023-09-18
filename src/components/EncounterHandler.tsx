import { useDispatch, useSelector } from "react-redux";
import {
  PokemonEncounter,
  encounterPokemon,
  selectMap,
  selectPos,
} from "../state/gameSlice";
import { useEffect } from "react";
import { PokemonEncounterData } from "../maps/map-types";
import { getPokemonStats } from "../app/use-pokemon-stats";
import { getPokemonMetadata } from "../app/use-pokemon-metadata";

const shouldEncounter = (rate: number) => {
  const random = Math.random() * 100;
  return random < rate;
};

// Inclusive
const randBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getPokemon = (
  options: PokemonEncounterData[]
): PokemonEncounter | null => {
  if (options.length === 0) return null;
  const totalChance = options.reduce((acc, cur) => acc + cur.chance, 0);
  const random = Math.random() * totalChance;
  let current = 0;
  for (const option of options) {
    current += option.chance;
    if (random < current) {
      const level = randBetween(option.minLevel, option.maxLevel);
      const metadata = getPokemonMetadata(option.id);
      const moves = metadata.moves
        .filter((move) => move.levelLearnedAt <= level)
        .sort((a, b) => a.levelLearnedAt - b.levelLearnedAt)
        .slice(0, 4)
        .map((move) => move.name);
      return {
        id: option.id,
        level,
        hp: getPokemonStats(option.id, level).hp,
        moves,
      };
    }
  }
  return null;
};

const EncounterHandler = () => {
  const dispatch = useDispatch();
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
          dispatch(encounterPokemon(pokemon));
        }
      }
    }
  }, [pos, map.grass, map.encounters, dispatch]);

  return null;
};

export default EncounterHandler;
