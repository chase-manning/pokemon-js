import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu";
import {
  hideStartMenu,
  selectConfirmationMenu,
  selectStartMenu,
  selectStartMenuSubOpen,
  showConfirmationMenu,
  showItemsMenu,
  showPlayerMenu,
  showStartMenu,
} from "../state/uiSlice";
import useEvent from "../app/use-event";
import emitter, { Event } from "../app/emitter";
import { useState } from "react";
import {
  addInventory,
  selectGameState,
  selectName,
  selectPokemon,
} from "../state/gameSlice";
import PokemonList from "./PokemonList";
import { DEBUG_MODE } from "../app/constants";
import { ItemType } from "../app/use-item-data";
import { db } from "../app/db";
import { doc, setDoc } from "firebase/firestore";

const StartMenu = () => {
  const dispatch = useDispatch();
  const show = useSelector(selectStartMenu);
  const disabled = useSelector(selectStartMenuSubOpen);
  const name = useSelector(selectName);
  const saving = !!useSelector(selectConfirmationMenu);
  const allPokemon = useSelector(selectPokemon);
  const gameState = useSelector(selectGameState);

  const [pokemon, setPokemon] = useState(false);

  useEvent(Event.Start, () => {
    dispatch(showStartMenu());
    emitter.emit(Event.StopMoving);
  });

  return (
    <>
      <Menu
        disabled={disabled || saving || pokemon}
        show={show}
        close={() => dispatch(hideStartMenu())}
        menuItems={[
          // {
          //   label: "Pokédex",
          //   action: () => console.log("TODO"),
          // },
          {
            label: "Pokémon",
            action: () => {
              if (allPokemon.length === 0) return;
              setPokemon(true);
            },
          },
          {
            label: "Item",
            action: () => dispatch(showItemsMenu()),
          },
          {
            label: "Player",
            action: () => dispatch(showPlayerMenu()),
          },
          {
            label: "Save",
            action: () => {
              dispatch(
                showConfirmationMenu({
                  preMessage: "Would you like to SAVE the game?",
                  postMessage: `${name} saved the game!`,
                  confirm: async () => {
                    const timestamp = new Date().getTime();
                    await setDoc(doc(db, "lien", timestamp.toString()), {
                      timestamp,
                      gameState,
                    });
                  },
                })
              );
            },
          },
          ...(DEBUG_MODE
            ? [
                {
                  label: "Magic",
                  action: () => {
                    dispatch(
                      addInventory({ item: ItemType.BoulderBadge, amount: 1 })
                    );
                  },
                },
              ]
            : []),
          // {
          //   label: "Option",
          //   action: () => console.log("TODO"),
          // },
        ]}
      />
      {pokemon && <PokemonList close={() => setPokemon(false)} />}
    </>
  );
};

export default StartMenu;
