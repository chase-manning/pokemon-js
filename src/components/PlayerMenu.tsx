import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu";
import { hidePlayerMenu, selectPlayerMenu } from "../state/uiSlice";
import { selectName } from "../state/gameSlice";

const PlayerMenu = () => {
  const dispatch = useDispatch();
  const show = useSelector(selectPlayerMenu);
  const name = useSelector(selectName);

  return (
    <Menu
      show={show}
      close={() => dispatch(hidePlayerMenu())}
      menuItems={[
        {
          label: `Player ${name}`,
          action: () => console.log("TODO"),
        },
      ]}
    />
  );
};

export default PlayerMenu;
