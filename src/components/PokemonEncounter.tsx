import { useDispatch, useSelector } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import {
  PokemonEncounterType,
  PokemonInstance,
  endEncounter,
  selectActivePokemon,
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
import Menu, { MenuItemType } from "./Menu";
import PokemonList from "./PokemonList";
import { selectItemsMenu, showItemsMenu } from "../state/uiSlice";
import useIsMobile from "../app/use-is-mobile";
import { getMoveMetadata } from "../app/use-move-metadata";
import { MoveMetadata } from "../app/move-metadata";
import processMove, { MoveResult } from "../app/move-helper";

const MOVEMENT_ANIMATION = 1300;
const FRAME_DURATION = 100;
const ATTACK_ANIMATION = 600;

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

const LevtSide = styled.div`
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
  const [stage, setStage] = useState(-1);

  const [alertText, setAlertText] = useState<string | null>(null);

  const isInBattle = !!enemy && !!active && !!enemyMetadata && !!activeMetadata;

  const endEncounter_ = () => {
    dispatch(endEncounter());
    dispatch(setActivePokemon(0));
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

  useEvent(Event.A, () => {
    if (stage === 2) {
      setStage(3);
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
    }

    if (stage === 12) {
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

    if (activeMovesFirst) {
      const { us, them } = processMoveResult(
        processMove(active, enemy, attackId, true),
        true
      );
      setTimeout(() => {
        processMoveResult(processMove(us, them, enemyMove.id, false), false);
      }, ATTACK_ANIMATION + 1000);
    } else {
      const { us, them } = processMoveResult(
        processMove(active, enemy, enemyMove.id, false),
        false
      );
      setTimeout(() => {
        processMoveResult(processMove(us, them, attackId, true), true);
      }, ATTACK_ANIMATION + 1000);
    }

    setTimeout(() => {
      setStage(11);
    }, (ATTACK_ANIMATION + 1000) * 2);
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

  return (
    <>
      {stage === 0 && (
        <>
          <RightSide />
          <LevtSide />
        </>
      )}
      {stage >= 1 && (
        <>
          <StyledPokemonEncounter>
            <Row>
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
                  <RightImage src={enemyMetadata.images.front} />
                </AttackRight>
              </ImageContainer>
            </Row>
            <Row>
              <ImageContainer flashing={stage === 19}>
                <AttackLeft attacking={stage === 16}>
                  <ChangePokemon changing={stage === 3}>
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
            <Frame wide tall flashing={stage === 2}>
              {text()}
            </Frame>
          </TextContainer>
          <Menu
            compact
            show={stage === 11}
            disabled={itemMenuOpen}
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
                setStage(11);
              }}
            />
          )}
          <Menu
            tight
            noExitOption
            padd={4}
            padding={isMobile ? "100px" : "40vw"}
            show={stage === 14}
            menuItems={active.moves.map((m) => {
              const item: MenuItemType = {
                label: m,
                action: () => processBattle(m),
              };
              return item;
            })}
            close={() => setStage(11)}
            bottom="0"
            right="0"
          />
        </>
      )}
    </>
  );
};

export default PokemonEncounter;
