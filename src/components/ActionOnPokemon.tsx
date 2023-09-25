import { useDispatch, useSelector } from "react-redux";
import { hideActionOnPokemon, selectActionOnPokemon } from "../state/uiSlice";
import PokemonList from "./PokemonList";

const ActionOnPokemon = () => {
  const dispatch = useDispatch();
  const action = useSelector(selectActionOnPokemon);

  if (!action) return null;

  return (
    <PokemonList
      close={() => dispatch(hideActionOnPokemon())}
      clickPokemon={(index) => {
        action(index);
        dispatch(hideActionOnPokemon());
      }}
      text="Choose a Pokémon."
    />
  );
};

export default ActionOnPokemon;
