import { useState } from "react";
import styled from "styled-components";
import useEvent from "../app/use-event";
import { Event } from "../app/emitter";
import { useDispatch, useSelector } from "react-redux";
import {
  depositPokemonToPc,
  selectMap,
  selectName,
  selectPc,
  selectPokemon,
  selectPos,
  withdrawPokemonFromPc,
} from "../state/gameSlice";
import {
  hidePcMenu,
  selectPcMenu,
  selectStartMenu,
  showPcMenu,
} from "../state/uiSlice";
import Frame from "./Frame";
import Menu from "./Menu";
import PokemonList from "./PokemonList";
import { getPokemonMetadata } from "../app/use-pokemon-metadata";

const StyledPc = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const TextContainer = styled.div`
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

const Pc = () => {
  const dispatch = useDispatch();

  const pos = useSelector(selectPos);
  const map = useSelector(selectMap);
  const show = useSelector(selectPcMenu);
  const startMenuOpen = useSelector(selectStartMenu);
  const name = useSelector(selectName);
  const pokemon = useSelector(selectPokemon);
  const pcPokemon = useSelector(selectPc);

  const [stage, setStage] = useState<number>(0);

  const close = () => {
    dispatch(hidePcMenu());
    setStage(0);
  };

  useEvent(Event.A, () => {
    if (startMenuOpen) return;

    if (!show) {
      if (map.pc && pos.y - 1 === map.pc.y && pos.x === map.pc.x) {
        dispatch(showPcMenu());
      }
    } else {
      // Stage transitions
      if (stage === 0) setStage(1);
      else if (stage === 2) setStage(3);
      else if (stage === 3) setStage(4);
      else if (stage === 7) setStage(4);
      else if (stage === 8) setStage(4);
      else if (stage === 9) setStage(4);
    }
  });

  useEvent(Event.B, () => {
    if (startMenuOpen) return;

    if ([5, 6].includes(stage)) setStage(4);
    if (stage === 4) setStage(1);
    if (stage === 1) close();
  });

  if (!show) return null;

  const text = () => {
    if (stage === 0) return `${name.toUpperCase()} turned on the PC.`;
    if (stage === 2) return "Accessed my PC.";
    if (stage === 3) return "Accessed POKéMON Storage System.";
    if (stage === 7) return "No space in party.";
    if (stage === 8)
      return `${getPokemonMetadata(
        pokemon[pokemon.length - 1].id
      ).name.toUpperCase()} was withdrawn.`;
    if (stage === 9)
      return `${getPokemonMetadata(
        pcPokemon[pcPokemon.length - 1].id
      ).name.toUpperCase()} was deposited.`;
  };

  return (
    <StyledPc>
      {[0, 2, 3, 7, 8, 9].includes(stage) && (
        <TextContainer>
          <Frame wide tall flashing={[0, 2, 3, 7, 8, 9].includes(stage)}>
            {text()}
          </Frame>
        </TextContainer>
      )}
      <Menu
        show={[1, 2, 3].includes(stage)}
        disabled={startMenuOpen || [2, 3].includes(stage)}
        left="0"
        top="0"
        noExit
        close={() => close()}
        menuItems={[
          {
            label: `${name.toUpperCase()}'s PC`,
            action: () => setStage(2),
          },
          {
            label: "LOG OFF",
            action: () => close(),
          },
        ]}
      />
      <Menu
        show={[4, 7, 8, 9].includes(stage)}
        disabled={startMenuOpen || [7, 8, 9].includes(stage)}
        noExit
        top="0"
        left="0"
        close={() => close()}
        menuItems={[
          {
            label: "WITHDRAW",
            action: () => {
              if (pcPokemon.length === 0) return;
              if (pokemon.length === 6) setStage(7);
              else setStage(5);
            },
          },
          {
            label: "DEPOSIT",
            action: () => {
              if (pokemon.length === 0) return;
              if (pokemon.length === 1) return;
              setStage(6);
            },
          },
          {
            label: "SEE YA!",
            action: () => close(),
          },
        ]}
      />
      {stage === 5 && (
        <PokemonList
          close={() => setStage(4)}
          clickPokemon={(i) => {
            dispatch(withdrawPokemonFromPc(i));
            setStage(8);
          }}
          customPokemon={pcPokemon}
          text="Which POKéMON should be withdrawn?"
        />
      )}
      {stage === 6 && (
        <PokemonList
          close={() => setStage(4)}
          clickPokemon={(i) => {
            dispatch(depositPokemonToPc(i));
            setStage(9);
          }}
          customPokemon={pokemon}
          text="Which POKéMON should be deposited?"
        />
      )}
    </StyledPc>
  );
};

export default Pc;
