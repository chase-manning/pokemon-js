import { useState } from "react";
import styled from "styled-components";
import useEvent from "../app/use-event";
import emitter, { Event } from "../app/emitter";
import { useDispatch, useSelector } from "react-redux";
import { healPokemon, selectMap, selectPos } from "../state/gameSlice";
import {
  hidePokemonCenterMenu,
  selectPokemonCenterMenu,
  selectStartMenu,
  showPokemonCenterMenu,
} from "../state/uiSlice";
import Frame from "./Frame";
import Menu from "./Menu";
import useIsMobile from "../app/use-is-mobile";

const StyledPokemonCenter = styled.div`
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

const PokemonCenter = () => {
  const dispatch = useDispatch();

  const pos = useSelector(selectPos);
  const map = useSelector(selectMap);
  const show = useSelector(selectPokemonCenterMenu);
  const startMenuOpen = useSelector(selectStartMenu);
  const isMobile = useIsMobile();

  const [stage, setStage] = useState<number>(0);

  const exit = () => {
    dispatch(hidePokemonCenterMenu());
    setStage(0);
  };

  useEvent(Event.A, () => {
    if (startMenuOpen) return;

    if (!show) {
      if (
        map.pokemonCenter &&
        pos.y - 1 === map.pokemonCenter.y &&
        pos.x === map.pokemonCenter.x
      ) {
        dispatch(showPokemonCenterMenu());
      }
    } else {
      if (stage === 0) setStage(1);
      else if (stage === 1) setStage(2);
      else if (stage === 2) return;
      else if (stage === 3) return;
      else if (stage === 4) setStage(5);
      else if (stage === 5) exit();
    }
  });

  if (!show) return null;

  const text = () => {
    if (stage === 0) return "Welcome to our POKéMON CENTER!";
    if ([1, 2].includes(stage))
      return "We heal your POKéMON back to perfect health!";
    if (stage === 3) return "OK. We'll need your POKéMON.";
    if (stage === 4) return "Thank you! Your POKéMON are fighting fit!";
    if (stage === 5) return "We hope to see you again!";
  };

  return (
    <StyledPokemonCenter>
      <TextContainer>
        <Frame wide tall flashing={[0, 1, 4, 5].includes(stage)}>
          {text()}
        </Frame>
      </TextContainer>
      <Menu
        show={stage === 2}
        disabled={startMenuOpen}
        right="0"
        bottom={isMobile ? "30%" : "20%"}
        noExit
        close={() => exit()}
        menuItems={[
          {
            label: "HEAL",
            action: () => {
              setStage(3);
              emitter.emit(Event.HealPokemon);
              setTimeout(() => {
                dispatch(healPokemon());
                setStage(4);
              }, 3000);
            },
          },
          {
            label: "CANCEL",
            action: () => exit(),
          },
        ]}
      />
    </StyledPokemonCenter>
  );
};

export default PokemonCenter;
