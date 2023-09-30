import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  encounterPokemon,
  encounterTrainer,
  selectMap,
  selectPokemonEncounter,
  selectPos,
  selectTrainerEncounter,
} from "../state/gameSlice";
import { useEffect, useState } from "react";
import { isTrainerEncounter } from "../app/map-helper";
import Frame from "./Frame";
import useEvent from "../app/use-event";
import { Event } from "../app/emitter";

const StyledTrainerEncounter = styled.div`
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

const TrainerEncounter = () => {
  const dispatch = useDispatch();
  const map = useSelector(selectMap);
  const pos = useSelector(selectPos);
  const encounter = useSelector(selectTrainerEncounter);
  const pokemonEncounter = useSelector(selectPokemonEncounter);

  const [introIndex, setIntroIndex] = useState(-1);

  const { trainers, walls, fences } = map;

  useEffect(() => {
    if (!trainers) return;

    const encounter_ = isTrainerEncounter(trainers, walls, fences, pos);

    if (!encounter_) return;

    dispatch(encounterTrainer(encounter_));
    setTimeout(() => {
      setIntroIndex(0);
    }, 500);
  }, [trainers, walls, fences, pos, dispatch]);

  useEvent(Event.A, () => {
    if (!encounter || !!pokemonEncounter) return;

    if (introIndex === encounter.intro.length - 1) {
      setIntroIndex(-1);
      dispatch(encounterPokemon(encounter.pokemon[0]));
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
