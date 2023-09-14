import { useDispatch, useSelector } from "react-redux";
import dateformat from "dateformat";

import Menu from "./Menu";
import { hidePlayerMenu, selectPlayerMenu } from "../state/uiSlice";
import { selectName } from "../state/gameSlice";

const PlayerMenu = () => {
  const dispatch = useDispatch();
  const show = useSelector(selectPlayerMenu);
  const name = useSelector(selectName);

  return (
    <Menu
      noSelect
      show={show}
      close={() => dispatch(hidePlayerMenu())}
      menuItems={[
        {
          label: `Player ${name}`,
          action: () => console.log("TODO"),
        },
        {
          label: "Badges",
          value: 0,
          action: () => console.log("TODO"),
        },
        {
          label: "Pokédex",
          value: 0, // TODO
          action: () => console.log("TODO"),
        },
        {
          label: "Time",
          value: dateformat(new Date(), "hh:MM"),
          action: () => console.log("TODO"),
        },
      ]}
    />
  );
};

export default PlayerMenu;
