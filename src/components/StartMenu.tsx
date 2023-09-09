import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu";
import {
  hideStartMenu,
  selectStartMenu,
  showStartMenu,
} from "../state/uiSlice";
import useEvent from "../app/use-event";
import { Event } from "../app/emitter";

const StartMenu = () => {
  const dispatch = useDispatch();
  const show = useSelector(selectStartMenu);

  useEvent(Event.Start, () => dispatch(showStartMenu()));

  return (
    <Menu
      show={show}
      close={() => dispatch(hideStartMenu())}
      menuItems={[
        {
          label: "Pokédex",
          action: () => console.log("TODO"),
        },
        {
          label: "Pokémon",
          action: () => console.log("TODO"),
        },
        {
          label: "Item",
          action: () => console.log("TODO"),
        },
        {
          label: "Player",
          action: () => console.log("TODO"),
        },
        {
          label: "Save",
          action: () => console.log("TODO"),
        },
        {
          label: "Option",
          action: () => console.log("TODO"),
        },
      ]}
    />
  );
};

export default StartMenu;
