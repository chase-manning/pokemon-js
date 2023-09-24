import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectPokemon, swapPokemonPositions } from "../state/gameSlice";
import PokemonRow from "./PokemonRow";
import { useState } from "react";
import useEvent from "../app/use-event";
import { Event } from "../app/emitter";
import Menu from "./Menu";
import Frame from "./Frame";

const StyledPokemonList = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  padding: 1px;
  z-index: 100;
`;

const Container = styled.div`
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

interface Props {
  close: () => void;
  switchAction?: (index: number) => void;
  clickPokemon?: (index: number) => void;
  text?: string;
}

const PokemonList = ({ close, switchAction, text, clickPokemon }: Props) => {
  const dispatch = useDispatch();
  const pokemon = useSelector(selectPokemon);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(false);
  const [switching, setSwitching] = useState<number | null>(null);

  useEvent(Event.Up, () => {
    if (selected) return;

    if (active === 0) return;
    setActive((prev) => prev - 1);
  });

  useEvent(Event.Down, () => {
    if (selected) return;

    if (active === pokemon.length - 1) return;
    setActive((prev) => prev + 1);
  });

  useEvent(Event.B, () => {
    if (selected) return;

    close();
  });

  useEvent(Event.A, () => {
    if (selected) return;

    if (clickPokemon) {
      clickPokemon(active);
      close();
      return;
    }

    if (switching !== null) {
      dispatch(swapPokemonPositions([active, switching]));
      setActive(0);
      setSwitching(null);
      setSelected(false);
      return;
    }

    setSelected(true);
  });

  return (
    <>
      <StyledPokemonList>
        {pokemon.map((p, i) => {
          return <PokemonRow key={i} pokemon={p} active={active === i} />;
        })}
      </StyledPokemonList>
      <Container>
        <Frame wide tall>
          {text
            ? text
            : switching
            ? "Move POKéMON where?"
            : "Choose a POKéMON."}
        </Frame>
      </Container>
      <Menu
        right="0"
        bottom="0"
        show={selected}
        menuItems={[
          // TODO Implement stats
          // {
          //   label: "Stats",
          //   action: () => console.log("Stats"),
          // },
          {
            label: "Switch",
            action: () => {
              setSelected(false);
              if (switchAction) switchAction(active);
              else setSwitching(active);
            },
          },
        ]}
        close={() => setSelected(false)}
      />
    </>
  );
};

export default PokemonList;
