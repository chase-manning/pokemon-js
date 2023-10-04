import { PokemonEncounterType, PokemonInstance } from "../state/state-types";
import { CRITICAL_HIT_MULTIPLIER, CRITICAL_HIT_PERCENTAGE } from "./constants";
import getTypeEffectiveness from "./type-effectiveness";
import { getMoveMetadata } from "./use-move-metadata";
import { getPokemonMetadata } from "./use-pokemon-metadata";
import { getPokemonStats } from "./use-pokemon-stats";

export interface MoveResult {
  moveName: string;
  us: PokemonInstance;
  them: PokemonEncounterType;
  missed: boolean;
  superEffective: boolean;
  notVeryEffective: boolean;
  critical: boolean;
  isBuff: boolean;
  isDebuff: boolean;
}

const getUs = (us: PokemonInstance, isAttacking: boolean, move: string) => {
  if (!isAttacking) return us;
  const newUs = {
    ...us,
    moves: us.moves.map((m) => {
      if (m.id !== move) return m;
      return {
        ...m,
        pp: Math.max(0, m.pp - 1),
      };
    }),
  };
  return newUs;
};

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

  const defaultReturn = {
    moveName: moveMetadata.name,
    us: getUs(us, isAttacking, move),
    them,
    missed: false,
    superEffective: false,
    notVeryEffective: false,
    critical: false,
    isBuff: false,
    isDebuff: false,
  };

  // Attack misses
  if (moveMetadata.accuracy && moveMetadata.accuracy < Math.random() * 100) {
    return {
      ...defaultReturn,
      missed: true,
    };
  }

  // Our attack
  if (isAttacking) {
    // TODO - handle moves with no power
    if (!moveMetadata.power) {
      return {
        ...defaultReturn,
        isDebuff: true,
      };
    }

    const attack =
      moveMetadata.damageClass === "physical"
        ? ourStats.attack
        : ourStats.specialAttack;
    const defense =
      moveMetadata.damageClass === "physical"
        ? theirStats.defense
        : theirStats.specialDefense;
    if (!moveMetadata.power) throw new Error("No power for move");
    const critical =
      Math.random() < CRITICAL_HIT_PERCENTAGE ? CRITICAL_HIT_MULTIPLIER : 1;
    const stab = ourMetadata.types.includes(moveMetadata.type) ? 1.5 : 1;
    const typeEffectiveness = getTypeEffectiveness(
      moveMetadata.type,
      theirMetadata.types
    );
    const superEffective = typeEffectiveness > 1;
    const notVeryEffective = typeEffectiveness < 1;
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
      ...defaultReturn,
      them: {
        ...them,
        hp: Math.max(0, them.hp - damage),
      },
      superEffective,
      notVeryEffective,
      critical: critical > 1,
    };
  }

  // Enemy attack
  // TODO - handle moves with no power
  if (!moveMetadata.power) {
    return {
      ...defaultReturn,
      isDebuff: true,
    };
  }

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
  const notVeryEffective = typeEffectiveness < 1;
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
    ...defaultReturn,
    us: {
      ...defaultReturn.us,
      hp: Math.max(0, us.hp - damage),
    },
    notVeryEffective,
    superEffective,
    critical: critical > 1,
  };
};

export default processMove;
