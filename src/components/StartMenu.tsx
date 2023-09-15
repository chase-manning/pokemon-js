import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu";
import {
  hideStartMenu,
  selectStartMenu,
  selectStartMenuSubOpen,
  showItemsMenu,
  showPlayerMenu,
  showStartMenu,
} from "../state/uiSlice";
import useEvent from "../app/use-event";
import emitter, { Event } from "../app/emitter";
import { useState } from "react";
import ConfirmationMenu from "./ConfirmationMenu";
import { selectName } from "../state/gameSlice";

const StartMenu = () => {
  const dispatch = useDispatch();
  const show = useSelector(selectStartMenu);
  const disabled = useSelector(selectStartMenuSubOpen);
  const name = useSelector(selectName);

  const [saving, setSaving] = useState(false);

  useEvent(Event.Start, () => {
    dispatch(showStartMenu());
    emitter.emit(Event.StopMoving);
  });

  return (
    <>
      <Menu
        disabled={disabled || saving}
        show={show}
        close={() => dispatch(hideStartMenu())}
        menuItems={[
          // {
          //   label: "Pokédex",
          //   action: () => console.log("TODO"),
          // },
          // {
          //   label: "Pokémon",
          //   action: () => console.log("TODO"),
          // },
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
            action: () => setSaving(true),
          },
          // {
          //   label: "Option",
          //   action: () => console.log("TODO"),
          // },
        ]}
      />
      <ConfirmationMenu
        show={saving}
        preMessage="Would you like to SAVE the game?"
        postMessage={`${name} saved the game!`}
        confirm={() => console.log("TODO")}
        cancel={() => setSaving(false)}
      />
    </>
  );
};

export default StartMenu;
