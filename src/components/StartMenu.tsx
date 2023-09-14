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

const StartMenu = () => {
  const dispatch = useDispatch();
  const show = useSelector(selectStartMenu);
  const disabled = useSelector(selectStartMenuSubOpen);

  useEvent(Event.Start, () => {
    dispatch(showStartMenu());
    emitter.emit(Event.StopMoving);
  });

  return (
    <Menu
      disabled={disabled}
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
        // {
        //   label: "Save",
        //   action: () => console.log("TODO"),
        // },
        // {
        //   label: "Option",
        //   action: () => console.log("TODO"),
        // },
      ]}
    />
  );
};

export default StartMenu;
