import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectPokemon } from "../state/gameSlice";
import PokemonRow from "./PokemonRow";

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

  return (
    <StyledPokemonList>
      {pokemon.map((p, i) => {
        return <PokemonRow key={i} pokemon={p} />;
      })}
    </StyledPokemonList>
  );
};

export default PokemonList;
