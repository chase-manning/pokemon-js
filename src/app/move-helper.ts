import { PokemonEncounterType, PokemonInstance } from "../state/gameSlice";
import { CRITICAL_HIT_MULTIPLIER, CRITICAL_HIT_PERCENTAGE } from "./constants";
import getTypeEffectiveness from "./type-effectiveness";
import { getMoveMetadata } from "./use-move-metadata";
import { getPokemonMetadata } from "./use-pokemon-metadata";
import { getPokemonStats } from "./use-pokemon-stats";

export interface MoveResult {
  us: PokemonInstance;
  them: PokemonEncounterType;
  missed: boolean;
  superEffective: boolean;
  critical: boolean;
}

const processMove = (
  us: PokemonInstance,
  them: PokemonEncounterType,
  move: string,
  isAttacking: boolean
): MoveResult => {
  const ourMetadata = getPokemonMetadata(us.id);
  const theirMetadata = getPokemonMetadata(them.id);
  const ourStats = getPokemonStats(us.id, us.level);
  const theirStats = getPokemonStats(them.id, them.level);
  const moveMetadata = getMoveMetadata(move);

  // Attack misses
  if (moveMetadata.accuracy && moveMetadata.accuracy < Math.random() * 100) {
    return {
      us,
      them,
      missed: true,
      superEffective: false,
      critical: false,
    };
  }

  // Our attack
  if (isAttacking) {
    const attack =
      moveMetadata.damageClass === "physical"
        ? ourStats.attack
        : ourStats.specialAttack;
    const defense =
      moveMetadata.damageClass === "physical"
        ? theirStats.defense
        : theirStats.specialDefense;
    // TODO - handle moves with no power
    if (!moveMetadata.power) throw new Error("No power for move");
    const critical =
      Math.random() < CRITICAL_HIT_PERCENTAGE ? CRITICAL_HIT_MULTIPLIER : 1;
    const stab = ourMetadata.types.includes(moveMetadata.type) ? 1.5 : 1;
    const typeEffectiveness = getTypeEffectiveness(
      moveMetadata.type,
      theirMetadata.types
    );
    const superEffective = typeEffectiveness > 1;
    const damage = Math.round(
      ((((2 * us.level * critical) / 5 + 2) *
        moveMetadata.power *
        (attack / defense)) /
        50 +
        2) *
        stab *
        typeEffectiveness
    );

    return {
      us,
      them: {
        ...them,
        hp: Math.max(0, them.hp - damage),
      },
      missed: false,
      superEffective,
      critical: critical > 1,
    };
  }

  // Enemy attack
  const attack =
    moveMetadata.damageClass === "physical"
      ? theirStats.attack
      : theirStats.specialAttack;
  const defense =
    moveMetadata.damageClass === "physical"
      ? ourStats.defense
      : ourStats.specialDefense;
  if (!moveMetadata.power) throw new Error("No power for move");
  const critical =
    Math.random() < CRITICAL_HIT_PERCENTAGE ? CRITICAL_HIT_MULTIPLIER : 1;
  const stab = theirMetadata.types.includes(moveMetadata.type) ? 1.5 : 1;
  const typeEffectiveness = getTypeEffectiveness(
    moveMetadata.type,
    ourMetadata.types
  );
  const superEffective = typeEffectiveness > 1;
  const damage = Math.round(
    ((((2 * them.level * critical) / 5 + 2) *
      moveMetadata.power *
      (attack / defense)) /
      50 +
      2) *
      stab *
      typeEffectiveness
  );

  return {
    us: {
      ...us,
      hp: Math.max(0, us.hp - damage),
    },
    them,
    missed: false,
    superEffective,
    critical: critical > 1,
  };
};

export default processMove;
