import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectPokemon } from "../state/gameSlice";
import PokemonRow from "./PokemonRow";
import { useState } from "react";
import useEvent from "../app/use-event";
import { Event } from "../app/emitter";

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

const PokemonList = () => {
  const pokemon = useSelector(selectPokemon);
  const [active, setActive] = useState(0);

  useEvent(Event.Up, () => {
    if (active === 0) return;
    setActive((prev) => prev - 1);
  });

  useEvent(Event.Down, () => {
    if (active === pokemon.length - 1) return;
    setActive((prev) => prev + 1);
  });

  return (
    <StyledPokemonList>
      {pokemon.map((p, i) => {
        return <PokemonRow key={i} pokemon={p} active={active === i} />;
      })}
    </StyledPokemonList>
  );
};

export default PokemonList;
