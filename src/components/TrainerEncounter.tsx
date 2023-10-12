import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  encounterPokemon,
  encounterTrainer,
  selectDefeatedTrainers,
  selectDirection,
  selectMap,
  selectMapId,
  selectPokemonEncounter,
  selectPos,
  selectTrainerEncounter,
} from "../state/gameSlice";
import { useEffect, useState } from "react";
import {
  directionModifier,
  isTrainer,
  isTrainerEncounter,
} from "../app/map-helper";
import Frame from "./Frame";
import useEvent from "../app/use-event";
import { Event } from "../app/emitter";
import getPokemonEncounter from "../app/pokemon-encounter-helper";
import { showText } from "../state/uiSlice";

const StyledTrainerEncounter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  z-index: 100;

  @media (max-width: 1000px) {
    height: 30%;
  }
`;

const TrainerEncounter = () => {
  const dispatch = useDispatch();
  const map = useSelector(selectMap);
  const pos = useSelector(selectPos);
  const encounter = useSelector(selectTrainerEncounter);
  const pokemonEncounter = useSelector(selectPokemonEncounter);
  const defeatedTrainers = useSelector(selectDefeatedTrainers);
  const direction = useSelector(selectDirection);
  const mapId = useSelector(selectMapId);

  const [introIndex, setIntroIndex] = useState(-1);

  const { trainers, walls, fences } = map;

  useEffect(() => {
    if (!trainers) return;

    const encounter_ = isTrainerEncounter(
      trainers,
      walls,
      fences,
      pos,
      defeatedTrainers,
      mapId
    );

    if (!encounter_) return;
    dispatch(encounterTrainer(encounter_));
    setTimeout(() => {
      setIntroIndex(0);
    }, 500);
  }, [trainers, walls, fences, pos, dispatch, defeatedTrainers, mapId]);

  useEvent(Event.A, () => {
    const facingPos = directionModifier(direction);
    if (
      map.trainers &&
      isTrainer(map.trainers, pos.x + facingPos.x, pos.y + facingPos.y) &&
      !encounter
    ) {
      const trainer = map.trainers.find(
        (trainer) =>
          trainer.pos.x === pos.x + facingPos.x &&
          trainer.pos.y === pos.y + facingPos.y
      );
      if (!trainer) throw new Error("Trainer not found");
      const trainerId = `${mapId}-${trainer.pos.x}-${trainer.pos.y}`;
      if (defeatedTrainers.includes(trainerId)) {
        dispatch(showText(trainer.outtro));
        return;
      }
      dispatch(encounterTrainer(trainer));
      setTimeout(() => {
        setIntroIndex(0);
      }, 500);
    }

    if (!encounter || !!pokemonEncounter) return;

    if (introIndex === encounter.intro.length - 1) {
      setIntroIndex(-1);
      const pokemon_ = encounter.pokemon[0];
      dispatch(
        encounterPokemon(getPokemonEncounter(pokemon_.id, pokemon_.level))
      );
    } else {
      setIntroIndex(introIndex + 1);
    }
  });

  if (!trainers || !encounter || introIndex === -1) return null;

  return (
    <StyledTrainerEncounter>
      <Frame wide tall flashing>
        {encounter.intro[introIndex]}
      </Frame>
    </StyledTrainerEncounter>
  );
};

export default TrainerEncounter;
