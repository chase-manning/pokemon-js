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
          action: () => {},
        },
        {
          label: "Badges",
          value: 0,
          action: () => {},
        },
        // {
        //   label: "Pokédex",
        //   value: 0, // TODO
        //   action: () => {},
        // },
        {
          label: "Time",
          value: dateformat(new Date(), "hh:MM"),
          action: () => {},
        },
      ]}
    />
  );
};

export default PlayerMenu;
