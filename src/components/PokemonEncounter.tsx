import { useDispatch, useSelector } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import {
  PokemonEncounterType,
  PokemonInstance,
  addPokemon,
  endEncounter,
  recoverFromFainting,
  resetActivePokemon,
  selectActivePokemon,
  selectName,
  selectPokemon,
  selectPokemonEncounter,
  setActivePokemon,
  updatePokemon,
  updatePokemonEncounter,
} from "../state/gameSlice";
import usePokemonMetadata from "../app/use-pokemon-metadata";
import Frame from "./Frame";
import HealthBar from "./HealthBar";
import usePokemonStats from "../app/use-pokemon-stats";

import corner from "../assets/ui/corner.png";
import { useEffect, useState } from "react";
import useEvent from "../app/use-event";
import { Event } from "../app/emitter";

import playerBack from "../assets/battle/player-back.png";

import ball1 from "../assets/battle/ball-open-1.png";
import ball2 from "../assets/battle/ball-open-2.png";
import ball3 from "../assets/battle/ball-open-3.png";
import ball4 from "../assets/battle/ball-open-4.png";
import ball5 from "../assets/battle/ball-open-5.png";
import ballIdle from "../assets/battle/ball-idle.png";
import ballLeft from "../assets/battle/ball-left.png";
import ballRight from "../assets/battle/ball-right.png";
import Menu, { MenuItemType } from "./Menu";
import PokemonList from "./PokemonList";
import {
  selectItemsMenu,
  selectPokeballThrowing,
  selectStartMenu,
  showItemsMenu,
  stopThrowingPokeball,
} from "../state/uiSlice";
import useIsMobile from "../app/use-is-mobile";
import { getMoveMetadata } from "../app/use-move-metadata";
import { MoveMetadata } from "../app/move-metadata";
import processMove, { MoveResult } from "../app/move-helper";
import getXp from "../app/xp-helper";
import getLevelData, { getLearnedMove } from "../app/level-helper";
import Evolution from "./Evolution";
import MoveSelect from "./MoveSelect";
import catchesPokemon from "../app/pokeball-helper";

const MOVEMENT_ANIMATION = 1300;
const FRAME_DURATION = 100;
const ATTACK_ANIMATION = 600;
const IDLE_BALL_DURATION = 1000;

const StyledPokemonEncounter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg);
  padding-top: 1.5vh;
  display: flex;
  flex-direction: column;
  width: 100%;

  height: 80%;
  @media (max-width: 768px) {
    height: 70%;
    padding-top: 3px;
  }
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex: 1;
`;

const LeftInfoSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 5%;
`;

const RightInfoSection = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  margin-right: 5%;
`;

const Name = styled.div`
  font-size: 5.5vh;
  font-family: "PokemonGB";
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const Level = styled.div`
  font-size: 4.5vh;
  margin: 0 12vh;
  font-family: "PressStart2P", sans-serif;

  @media (max-width: 768px) {
    font-size: 12px;
    margin: 0 28px;
  }
`;

const HealthBarContainer = styled.div`
  margin: 0 3.3vh;
  margin-top: 1.2vh;

  @media (max-width: 768px) {
    margin: 0 8px;
  }
`;

const Health = styled.div`
  font-family: "PokemonGB";

  font-size: 5vh;
  margin: 0 3.3vh;
  margin-top: 1.2vh;
  @media (max-width: 768px) {
    font-size: 13px;
    margin: 0 8px;
    margin-top: 3px;
  }
`;

const flashing = keyframes`
  0% {
    opacity: 1;
  }
  10% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  30% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  60% {
    opacity: 1;
  }
  70% {
    opacity: 0;
  }
  80% {
    opacity: 1;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

interface ImageContainerProps {
  flashing?: boolean;
}

const ImageContainer = styled.div<ImageContainerProps>`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props: ImageContainerProps) =>
    props.flashing &&
    css`
      animation: ${flashing} 500ms linear forwards;
    `};
`;

const changePokemon = keyframes`
  0% {
    transform: translateX(0%);
    opacity: 1;
  }
  50% {
    transform: translateX(-400%);
    opacity: 1;
  }
  51% {
    transform: translateX(-400%);
    opacity: 0;
  }
  99% {
    transform: translateX(0%);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
`;

interface ChangePokemonProps {
  changing: boolean;
}

const ChangePokemon = styled.div<ChangePokemonProps>`
  height: 100%;

  ${(props: ChangePokemonProps) =>
    props.changing &&
    css`
      animation: ${changePokemon} ${MOVEMENT_ANIMATION * 2}ms linear forwards;
    `};
`;

const inFromRight = keyframes`
  from {
    transform: translateX(400%);
  }
  to {
    transform: translateX(0%);
  }
`;

const LeftImage = styled.img`
  height: 100%;

  transform: translate(400%);
  animation: ${inFromRight} ${`${MOVEMENT_ANIMATION}ms`} linear forwards;
`;

const inFromLeft = keyframes`
  from {
    transform: translateX(-400%);
  }
  to {
    transform: translateX(0%);
  }
`;

const RightImage = styled.img`
  height: 100%;

  transform: translate(-400%);
  animation: ${inFromLeft} ${`${MOVEMENT_ANIMATION}ms`} linear forwards;
`;

const attackRight = keyframes`
  0% {
    transform: translateX(0%);
  }
  50% {
    transform: translateX(50%);
  }
  100% {
    transform: translateX(0%);
  }
`;

interface AttackingProps {
  attacking?: boolean;
}

const AttackRight = styled.div<AttackingProps>`
  height: 100%;
  transform: translateX(0%);
  ${(props: AttackingProps) =>
    props.attacking &&
    css`
      animation: ${attackRight} ${ATTACK_ANIMATION}ms linear forwards;
    `};
`;

const attackLeft = keyframes`
  0% {
    transform: translateX(0%);
  }
  50% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
`;

const AttackLeft = styled.div<AttackingProps>`
  height: 100%;
  transform: translateX(0%);
  ${(props: AttackingProps) =>
    props.attacking &&
    css`
      animation: ${attackLeft} ${ATTACK_ANIMATION}ms linear forwards;
    `};
`;

const Corner = styled.img`
  transform: translateY(-50%);

  height: 8vh;
  @media (max-width: 768px) {
    height: 19px;
  }
`;

const CornerContainer = styled.div`
  height: 5vh;
  @media (max-width: 768px) {
    height: 10px;
  }
`;

const CornerRight = styled.img`
  height: 8vh;
  transform: translateY(-70%) scaleX(-1);
  @media (max-width: 768px) {
    height: 19px;
  }
`;

const TextContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  z-index: 100;

  @media (max-width: 768px) {
    height: 30%;
  }
`;

const moveLeft = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
`;

const moveRight = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
`;

const RightSide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 5%,
    rgba(0, 0, 0, 1) 5%,
    rgba(0, 0, 0, 1) 10%,
    rgba(0, 0, 0, 0) 10%,
    rgba(0, 0, 0, 0) 15%,
    rgba(0, 0, 0, 1) 15%,
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 0) 20%,
    rgba(0, 0, 0, 0) 25%,
    rgba(0, 0, 0, 1) 25%,
    rgba(0, 0, 0, 1) 30%,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0) 35%,
    rgba(0, 0, 0, 1) 35%,
    rgba(0, 0, 0, 1) 40%,
    rgba(0, 0, 0, 0) 40%,
    rgba(0, 0, 0, 0) 45%,
    rgba(0, 0, 0, 1) 45%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0) 55%,
    rgba(0, 0, 0, 1) 55%,
    rgba(0, 0, 0, 1) 60%,
    rgba(0, 0, 0, 0) 60%,
    rgba(0, 0, 0, 0) 65%,
    rgba(0, 0, 0, 1) 65%,
    rgba(0, 0, 0, 1) 70%,
    rgba(0, 0, 0, 0) 70%,
    rgba(0, 0, 0, 0) 75%,
    rgba(0, 0, 0, 1) 75%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0) 80%,
    rgba(0, 0, 0, 0) 85%,
    rgba(0, 0, 0, 1) 85%,
    rgba(0, 0, 0, 1) 90%,
    rgba(0, 0, 0, 0) 90%,
    rgba(0, 0, 0, 0) 95%,
    rgba(0, 0, 0, 1) 95%,
    rgba(0, 0, 0, 1) 100%
  );

  transform: translateX(100%);

  animation: ${moveLeft} 1500ms linear forwards;
`;

const LeftSide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 5%,
    rgba(0, 0, 0, 0) 5%,
    rgba(0, 0, 0, 0) 10%,
    rgba(0, 0, 0, 1) 10%,
    rgba(0, 0, 0, 1) 15%,
    rgba(0, 0, 0, 0) 15%,
    rgba(0, 0, 0, 0) 20%,
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 25%,
    rgba(0, 0, 0, 0) 25%,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 1) 30%,
    rgba(0, 0, 0, 1) 35%,
    rgba(0, 0, 0, 0) 35%,
    rgba(0, 0, 0, 0) 40%,
    rgba(0, 0, 0, 1) 40%,
    rgba(0, 0, 0, 1) 45%,
    rgba(0, 0, 0, 0) 45%,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 1) 55%,
    rgba(0, 0, 0, 0) 55%,
    rgba(0, 0, 0, 0) 60%,
    rgba(0, 0, 0, 1) 60%,
    rgba(0, 0, 0, 1) 65%,
    rgba(0, 0, 0, 0) 65%,
    rgba(0, 0, 0, 0) 70%,
    rgba(0, 0, 0, 1) 70%,
    rgba(0, 0, 0, 1) 75%,
    rgba(0, 0, 0, 0) 75%,
    rgba(0, 0, 0, 0) 80%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 1) 85%,
    rgba(0, 0, 0, 0) 85%,
    rgba(0, 0, 0, 0) 90%,
    rgba(0, 0, 0, 1) 90%,
    rgba(0, 0, 0, 1) 95%,
    rgba(0, 0, 0, 0) 95%,
    rgba(0, 0, 0, 0) 100%
  );

  transform: translateX(-100%);
  animation: ${moveRight} 1500ms linear forwards;
`;

const BlackOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  z-index: 100;
`;

const PokemonEncounter = () => {
  const dispatch = useDispatch();
  const enemy = useSelector(selectPokemonEncounter);
  const enemyMetadata = usePokemonMetadata(enemy?.id || null);
  const enemyStats = usePokemonStats(enemy?.id || 1, enemy?.level || 1);
  const active = useSelector(selectActivePokemon);
  const activeMetadata = usePokemonMetadata(active?.id || null);
  const activeStats = usePokemonStats(active?.id || 1, active?.level || 1);
  const itemMenuOpen = useSelector(selectItemsMenu);
  const isMobile = useIsMobile();
  const pokemon = useSelector(selectPokemon);
  const name = useSelector(selectName);
  const startMenuOpen = useSelector(selectStartMenu);
  const pokeballThrowing = useSelector(selectPokeballThrowing);

  // 0 = intro animation started
  // 1 = intro animation finished
  // 2 = showing pokemon
  // 3 = player out
  // 4 = go pokemon
  // 5 = ball open 1
  // 6 = ball open 2
  // 7 = ball open 3
  // 8 = ball open 4
  // 9 = ball open 5
  // 10 = show pokemon
  // 11 = in battle
  // 12 = running
  // 13 = pokemon list
  // 14 = moves
  // 15 = us prepare attack
  // 17 = us damage
  // 18 = them prepare attack
  // 19 = them damage
  // 20 = they fainted
  // 21 = gained xp
  // 22 = leveled up
  // 23 = Evolving
  // 24 = active fainted
  // 25 = select new pokemon
  // 26 = out of pokemon
  // 27 = player fainted
  // 28 = black screen
  // 29 = new move
  // 30 = trying to learn new move
  // 31 = but cannot learn more than 4 moves
  // 32 = select move to forget
  // 33 = forgot move
  // 34 = enemy ball open 1
  // 35 = enemy ball open 2
  // 36 = enemy ball open 3
  // 37 = enemy ball open 4
  // 38 = enemy ball open 5
  // 39 = ball idle
  // 40 = ball left
  // 41 = ball right
  // 42 = Darn! The POKéMON broke free!
  // 43 = Aww! It appeared to be caught!
  // 44 = Shoot! It was so close too!
  // 45 = You caught a wild POKéMON!
  const [stage, setStage] = useState(-1);

  const [alertText, setAlertText] = useState<string | null>(null);

  const isInBattle = !!enemy && !!active && !!enemyMetadata && !!activeMetadata;

  const endEncounter_ = () => {
    dispatch(endEncounter());
    dispatch(resetActivePokemon());
  };

  useEffect(() => {
    if (isInBattle) {
      setStage(0);
      setTimeout(() => {
        setStage(1);
      }, 2000);
      setTimeout(() => {
        setStage(2);
      }, 3300);
    }

    if (!isInBattle) {
      setStage(-1);
    }
  }, [isInBattle]);

  const throwPokeball = () => {
    setTimeout(() => {
      setStage(4);
    }, MOVEMENT_ANIMATION);
    setTimeout(() => {
      setStage(5);
    }, MOVEMENT_ANIMATION * 2);
    setTimeout(() => {
      setStage(6);
    }, MOVEMENT_ANIMATION * 2 + FRAME_DURATION);
    setTimeout(() => {
      setStage(7);
    }, MOVEMENT_ANIMATION * 2 + FRAME_DURATION * 2);
    setTimeout(() => {
      setStage(8);
    }, MOVEMENT_ANIMATION * 2 + FRAME_DURATION * 3);
    setTimeout(() => {
      setStage(9);
    }, MOVEMENT_ANIMATION * 2 + FRAME_DURATION * 4);
    setTimeout(() => {
      setStage(10);
    }, MOVEMENT_ANIMATION * 2 + FRAME_DURATION * 5);
    setTimeout(() => {
      setStage(11);
    }, MOVEMENT_ANIMATION * 2 + FRAME_DURATION * 5 + 500);
  };

  const throwPokeballAtEnemy = () => {
    setStage(34);
    setTimeout(() => {
      setStage(35);
    }, FRAME_DURATION);
    setTimeout(() => {
      setStage(36);
    }, FRAME_DURATION * 2);
    setTimeout(() => {
      setStage(37);
    }, FRAME_DURATION * 3);
    setTimeout(() => {
      setStage(38);
    }, FRAME_DURATION * 4);
    setTimeout(() => {
      setStage(39);
    }, FRAME_DURATION * 5);
  };

  useEffect(() => {
    if (pokeballThrowing && enemy) {
      const shakePokeball = (
        times: number,
        caught: boolean,
        startTimes?: number
      ) => {
        setStage(39);
        setTimeout(() => {
          setStage(40);
        }, IDLE_BALL_DURATION);
        setTimeout(() => {
          setStage(39);
        }, IDLE_BALL_DURATION + FRAME_DURATION);
        setTimeout(() => {
          setStage(41);
        }, IDLE_BALL_DURATION + FRAME_DURATION * 2);
        setTimeout(() => {
          setStage(39);
        }, IDLE_BALL_DURATION + FRAME_DURATION * 3);

        if (times > 1) {
          setTimeout(() => {
            shakePokeball(times - 1, caught, startTimes || times);
          }, IDLE_BALL_DURATION + FRAME_DURATION * 4);
        }
        if (times === 1) {
          setTimeout(() => {
            if (caught) {
              setStage(45);
            } else {
              throwPokeballAtEnemy();
              setTimeout(() => {
                if (startTimes === 1) {
                  setStage(42);
                } else if (startTimes === 2) {
                  setStage(43);
                } else if (startTimes === 3) {
                  setStage(44);
                } else {
                  throw new Error("Invalid start times");
                }
              }, FRAME_DURATION * 6);
            }
          }, IDLE_BALL_DURATION + FRAME_DURATION * 4);
        }
      };

      throwPokeballAtEnemy();
      const caught = catchesPokemon(enemy, pokeballThrowing);
      setTimeout(() => {
        if (caught) {
          shakePokeball(3, caught);
        } else {
          // 1, 2 or 3 shakes
          const shakes = Math.floor(Math.random() * 3) + 1;
          shakePokeball(shakes, caught);
        }
      }, FRAME_DURATION * 6);
      dispatch(stopThrowingPokeball());
    }
  }, [pokeballThrowing, enemy, dispatch]);

  useEvent(Event.A, () => {
    if (startMenuOpen) return;

    if (stage === 2) {
      setStage(3);
      throwPokeball();
    }

    if (stage === 12) {
      endEncounter_();
    }

    if (stage === 20) {
      setStage(21);
      if (enemy) {
        dispatch(
          updatePokemon({
            ...active,
            xp: active.xp + getXp(enemy.id, enemy.level),
          })
        );
      }
    }

    if (stage === 21) {
      const { level, leveledUp, remainingXp } = getLevelData(
        active.level,
        active.xp
      );
      if (leveledUp) {
        dispatch(
          updatePokemon({
            ...active,
            level,
            xp: remainingXp,
          })
        );
        setStage(22);
      } else {
        endEncounter_();
      }
    }

    const isEvolving =
      activeMetadata &&
      activeMetadata.evolution &&
      active.level >= activeMetadata.evolution.level;

    if (stage === 22) {
      const move = getLearnedMove(active);
      const hasFourMoves = active.moves.length === 4;
      if (move && !hasFourMoves) {
        setStage(29);
      } else if (move && hasFourMoves) {
        setStage(30);
      } else if (isEvolving) {
        setStage(23);
      } else {
        endEncounter_();
      }
    }

    if (stage === 24) {
      const hasOtherPokemon = pokemon.some((p) => p.hp > 0);
      if (hasOtherPokemon) {
        setStage(25);
      } else {
        setStage(26);
      }
    }

    if (stage === 26) {
      setStage(27);
    }

    if (stage === 27) {
      setStage(28);
      setTimeout(() => {
        dispatch(recoverFromFainting());
      }, 1000);
      setTimeout(() => {
        endEncounter_();
      }, 1000 + 500);
    }

    if (stage === 29) {
      const move = getLearnedMove(active);
      if (!move) throw new Error("No move found");
      dispatch(
        updatePokemon({
          ...active,
          moves: [...active.moves, move],
        })
      );

      if (isEvolving) {
        setStage(23);
      } else {
        endEncounter_();
      }
    }

    if (stage === 30) {
      setStage(31);
    }

    if (stage === 31) {
      setStage(32);
    }

    if (stage === 32) {
      setStage(33);
    }

    if ([42, 43, 44].includes(stage)) {
      setStage(11);
    }

    if (stage === 45) {
      if (!enemy) throw new Error("No enemy found");
      if (!enemyMetadata) throw new Error("No enemy metadata found");
      dispatch(
        addPokemon({
          id: enemy.id,
          level: enemy.level,
          xp: 0,
          moves: enemy.moves.map((move) => {
            return {
              name: move,
              pp: getMoveMetadata(move).pp || 0,
            };
          }),
          hp: enemyStats.hp,
        })
      );
      endEncounter_();
    }
  });

  if (!isInBattle) return null;

  const text = () => {
    if (alertText) return alertText;
    if (stage === 2)
      return `Wild ${enemyMetadata.name.toUpperCase()} appeared!`;
    if (stage >= 4 && stage < 10)
      return `Go! ${activeMetadata.name.toUpperCase()}!`;
    if (stage === 12) return "Got away safely!";
    if (stage === 20)
      return `Enemy ${enemyMetadata.name.toUpperCase()} fainted!`;
    if (stage === 21)
      return `${activeMetadata.name.toUpperCase()} gained ${getXp(
        enemy.id,
        enemy.level
      )} EXP. points!`;
    if (stage === 22)
      return `${activeMetadata.name.toUpperCase()} grew to level ${
        getLevelData(active.level, active.xp).level
      }!`;
    if (stage === 24) return `${activeMetadata.name.toUpperCase()} fainted!`;
    if (stage === 26) return `${name} is out of usable POKéMON!`;
    if (stage === 27) return `${name} blacked out!`;
    if (stage === 29)
      return `${activeMetadata.name.toUpperCase()} learned ${getLearnedMove(
        active
      )}!`;
    if (stage === 30)
      return `${activeMetadata.name.toUpperCase()} is trying to learn ${getLearnedMove(
        active
      )}.`;
    if (stage === 31) return `But it cannot learn more than 4 moves`;
    if (stage === 32) return `Choose a move you would like to forget`;
    if (stage === 42) return `Darn! The POKéMON broke free!`;
    if (stage === 43) return `Aww! It appeared to be caught!`;
    if (stage === 44) return `Shoot! It was so close too!`;
    if (stage === 45)
      return `All right! ${enemyMetadata.name.toUpperCase()} was caught!`;

    return "";
  };

  const getRandomEnemyMove = () => {
    return enemy.moves[Math.floor(Math.random() * enemy.moves.length)];
  };

  const getActiveMovesFirst = (
    activeMove: MoveMetadata,
    enemyMove: MoveMetadata
  ) => {
    if (activeMove.priority > enemyMove.priority) return true;
    if (activeMove.priority < enemyMove.priority) return false;
    return activeStats.speed > enemyStats.speed;
  };

  const processMoveResult = (
    result: MoveResult,
    isAttacking: boolean
  ): { us: PokemonInstance; them: PokemonEncounterType } => {
    const {
      us,
      them,
      missed,
      superEffective,
      moveName,
      critical,
      notVeryEffective,
    } = result;
    if (isAttacking) {
      setAlertText(
        `${activeMetadata.name.toUpperCase()} used ${moveName.toUpperCase()}!`
      );
      setStage(15);
      setTimeout(() => {
        dispatch(updatePokemonEncounter(them));
        dispatch(updatePokemon(us));

        if (missed) {
          setAlertText(`${activeMetadata.name.toUpperCase()}'s attack missed!`);
        } else if (critical) {
          setAlertText(`A critical hit!`);
          setStage(17);
        } else if (superEffective) {
          setAlertText(`It's super effective!`);
          setStage(17);
        } else if (notVeryEffective) {
          setAlertText(`It's not very effective...`);
          setStage(17);
        } else {
          setStage(17);
        }
      }, ATTACK_ANIMATION);
    }

    if (!isAttacking) {
      setAlertText(
        `Enemy ${enemyMetadata.name.toUpperCase()} used ${moveName.toUpperCase()}!`
      );

      setStage(18);
      setTimeout(() => {
        dispatch(updatePokemonEncounter(them));
        dispatch(updatePokemon(us));

        if (missed) {
          setAlertText(`${enemyMetadata.name.toUpperCase()}'s attack missed!`);
        } else if (critical) {
          setAlertText(`A critical hit!`);
          setStage(19);
        } else if (superEffective) {
          setAlertText(`It's super effective!`);
          setStage(19);
        } else if (notVeryEffective) {
          setAlertText(`It's not very effective...`);
          setStage(19);
        } else {
          setStage(19);
        }
      }, ATTACK_ANIMATION);
    }

    setTimeout(() => {
      setAlertText(null);
    }, ATTACK_ANIMATION + 1000);

    return { us, them };
  };

  const processBattle = (attackId: string) => {
    const activeMove = getMoveMetadata(attackId);
    const enemyMove = getMoveMetadata(getRandomEnemyMove());

    const activeMovesFirst = getActiveMovesFirst(activeMove, enemyMove);

    // We are moving first
    if (activeMovesFirst) {
      // We are attacking
      const { us, them } = processMoveResult(
        processMove(active, enemy, attackId, true),
        true
      );

      setTimeout(() => {
        // If enemy fainted
        if (them.hp <= 0) {
          setStage(20);
        }

        // Enemy attacking
        else {
          const { us: usNew } = processMoveResult(
            processMove(us, them, enemyMove.id, false),
            false
          );

          setTimeout(() => {
            // We fainted
            if (usNew.hp <= 0) {
              setStage(24);
            }

            // Ending battle
            else {
              setStage(11);
            }
          }, ATTACK_ANIMATION + 1000);
        }
      }, ATTACK_ANIMATION + 1000);
    }

    // Enemy moving first
    else {
      // Enemy attacking
      const { us, them } = processMoveResult(
        processMove(active, enemy, enemyMove.id, false),
        false
      );

      // We fainted
      if (us.hp <= 0) {
        setStage(24);
      }

      // We are attacking
      else {
        setTimeout(() => {
          const { them: themAfterAttack } = processMoveResult(
            processMove(us, them, attackId, true),
            true
          );

          setTimeout(() => {
            // If enemy fainted
            if (themAfterAttack.hp <= 0) {
              setStage(20);
            }

            // Ending battle
            else {
              setStage(11);
            }
          }, ATTACK_ANIMATION + 1000);
        }, ATTACK_ANIMATION + 1000);
      }
    }
  };

  const leftImage = () => {
    if (stage <= 3) return playerBack;
    if (stage === 5) return ball1;
    if (stage === 6) return ball2;
    if (stage === 7) return ball3;
    if (stage === 8) return ball4;
    if (stage === 9) return ball5;
    if (stage >= 10) return activeMetadata.images.back;
  };

  const rightImage = () => {
    if (stage === 34) return ball1;
    if (stage === 35) return ball2;
    if (stage === 36) return ball3;
    if (stage === 37) return ball4;
    if (stage === 38) return ball5;
    if (stage === 39) return ballIdle;
    if (stage === 40) return ballLeft;
    if (stage === 41) return ballRight;
    if (stage === 45) return ballRight;
    return enemyMetadata.images.front;
  };

  return (
    <>
      {stage === 0 && (
        <>
          <RightSide />
          <LeftSide />
        </>
      )}
      {stage >= 1 && (
        <>
          <StyledPokemonEncounter>
            <Row style={{ opacity: [20, 21, 22].includes(stage) ? "0" : "1" }}>
              <LeftInfoSection style={{ opacity: stage >= 3 ? "1" : "0" }}>
                <Name>{enemyMetadata.name}</Name>
                <Level>{`:L${enemy.level}`}</Level>
                <HealthBarContainer>
                  <HealthBar
                    big
                    currentHealth={enemy.hp}
                    maxHealth={enemyStats.hp}
                  />
                </HealthBarContainer>
                <Corner src={corner} />
              </LeftInfoSection>
              <ImageContainer flashing={stage === 17}>
                <AttackRight attacking={stage === 18}>
                  <RightImage src={rightImage()} />
                </AttackRight>
              </ImageContainer>
            </Row>
            <Row
              style={{ opacity: [24, 26, 27, 28].includes(stage) ? "0" : "1" }}
            >
              <ImageContainer flashing={stage === 19}>
                <AttackLeft attacking={stage === 15}>
                  <ChangePokemon changing={[3, 25].includes(stage)}>
                    <LeftImage src={leftImage()} />
                  </ChangePokemon>
                </AttackLeft>
              </ImageContainer>
              <RightInfoSection style={{ opacity: stage >= 11 ? "1" : "0" }}>
                <Name>{activeMetadata.name}</Name>
                <Level>{`:L${active.level}`}</Level>
                <HealthBarContainer>
                  <HealthBar
                    big
                    currentHealth={active.hp}
                    maxHealth={activeStats.hp}
                  />
                </HealthBarContainer>
                <Health>{`${active.hp}/${activeStats.hp}`}</Health>
                <CornerContainer>
                  <CornerRight src={corner} />
                </CornerContainer>
              </RightInfoSection>
            </Row>
          </StyledPokemonEncounter>
          <TextContainer>
            <Frame
              wide
              tall
              flashing={[
                2, 20, 21, 22, 24, 26, 27, 29, 30, 31, 32, 42, 43, 44, 45,
              ].includes(stage)}
            >
              {text()}
            </Frame>
          </TextContainer>
          <Menu
            compact
            show={stage === 11}
            disabled={itemMenuOpen || startMenuOpen}
            menuItems={[
              {
                label: "Fight",
                action: () => setStage(14),
              },
              {
                pokemon: true,
                label: "PKMN",
                action: () => setStage(13),
              },
              {
                label: "Item",
                action: () => dispatch(showItemsMenu()),
              },
              {
                label: "Run",
                action: () => setStage(12),
              },
            ]}
            noExit
            close={() => {}}
            bottom="0"
            right="0"
          />
          {stage === 13 && (
            <PokemonList
              close={() => setStage(11)}
              switchAction={(index) => {
                dispatch(setActivePokemon(index));
                throwPokeball();
              }}
            />
          )}
          <MoveSelect
            show={stage === 14}
            select={(move: string) => processBattle(move)}
            close={() => setStage(11)}
          />
          <Evolution
            pokemonId={active.id}
            show={stage === 23}
            close={() => {
              if (!activeMetadata.evolution) throw new Error("No evolution");
              dispatch(
                updatePokemon({
                  ...active,
                  id: activeMetadata.evolution.pokemon,
                })
              );
              endEncounter_();
            }}
          />
          {stage === 25 && (
            <PokemonList
              text="Pring out which POKéMON?"
              close={() => {}}
              switchAction={(index) => {
                if (pokemon[index].hp <= 0) return;
                dispatch(setActivePokemon(index));
                throwPokeball();
              }}
            />
          )}
          <Menu
            noExitOption
            disabled={startMenuOpen}
            padding={isMobile ? "100px" : "40vw"}
            show={stage === 33}
            menuItems={[
              ...active.moves.map((m) => {
                const newMove = getLearnedMove(active);
                if (!newMove)
                  return {
                    label: "Error",
                    action: () => {},
                  };
                const item: MenuItemType = {
                  label: m.name,
                  action: () => {
                    const isEvolving =
                      activeMetadata &&
                      activeMetadata.evolution &&
                      active.level >= activeMetadata.evolution.level;
                    if (isEvolving) {
                      setStage(23);
                    } else {
                      endEncounter_();
                    }
                    dispatch(
                      updatePokemon({
                        ...active,
                        moves: [
                          ...active.moves.filter(
                            (move) => move.name !== m.name
                          ),
                          newMove,
                        ],
                      })
                    );
                  },
                };
                return item;
              }),
              {
                label: getLearnedMove(active)?.name || "Error",
                action: () => {
                  const isEvolving =
                    activeMetadata &&
                    activeMetadata.evolution &&
                    active.level >= activeMetadata.evolution.level;
                  if (isEvolving) {
                    setStage(23);
                  } else {
                    endEncounter_();
                  }
                },
              },
            ]}
            close={() => {
              const isEvolving =
                activeMetadata &&
                activeMetadata.evolution &&
                active.level >= activeMetadata.evolution.level;
              if (isEvolving) {
                setStage(23);
              } else {
                endEncounter_();
              }
            }}
            bottom="0"
            right="0"
          />
          <BlackOverlay style={{ opacity: stage === 28 ? "1" : "0" }} />
        </>
      )}
    </>
  );
};

export default PokemonEncounter;
