import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectPokemon, swapPokemonPositions } from "../state/gameSlice";
import PokemonRow from "./PokemonRow";
import { useState } from "react";
import useEvent from "../app/use-event";
import { Event } from "../app/emitter";
import Menu from "./Menu";
import Frame from "./Frame";
import { PokemonInstance } from "../state/state-types";
import { MoveMetadata } from "../app/move-metadata";

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

  @media (max-width: 1000px) {
    height: 30%;
  }
`;

interface Props {
  close: () => void;
  switchAction?: (index: number) => void;
  clickPokemon?: (index: number) => void;
  text?: string;
  customPokemon?: PokemonInstance[];
  moveData?: MoveMetadata;
}

const PokemonList = ({
  close,
  switchAction,
  text,
  clickPokemon,
  customPokemon,
  moveData,
}: Props) => {
  const dispatch = useDispatch();
  const pokemon_ = useSelector(selectPokemon);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(false);
  const [switching, setSwitching] = useState<number | null>(null);
  const [scroll, setScroll] = useState(0);

  const pokemon = customPokemon ?? pokemon_;

  useEvent(Event.Up, () => {
    if (selected) return;

    if (active === 0) return;

    if (pokemon.length > 6 && scroll > 0) setScroll((prev) => prev - 1);
    else setActive((prev) => prev - 1);
  });

  useEvent(Event.Down, () => {
    if (selected) return;

    if (active === pokemon.length - 1) return;
    if (scroll === pokemon.length - 5) return;

    if (pokemon.length > 6 && active === 4) setScroll((prev) => prev + 1);
    else setActive((prev) => prev + 1);
  });

  useEvent(Event.B, () => {
    if (selected) return;

    close();
  });

  useEvent(Event.A, () => {
    if (selected) return;

    if (clickPokemon) {
      clickPokemon(active + scroll);
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
        {pokemon.slice(scroll, scroll + 6).map((p, i) => {
          return (
            <PokemonRow
              key={i}
              pokemon={p}
              active={active === i}
              moveData={moveData}
            />
          );
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
