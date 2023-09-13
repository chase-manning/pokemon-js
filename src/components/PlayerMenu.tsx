import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu";
import { hidePlayerMenu, selectPlayerMenu } from "../state/uiSlice";

const PlayerMenu = () => {
  const dispatch = useDispatch();
  const show = useSelector(selectPlayerMenu);

  return (
    <Menu
      show={show}
      close={() => dispatch(hidePlayerMenu())}
      menuItems={[
        {
          label: "TODO",
          value: 1,
          action: () => console.log("TODO"), // This is a reminder to check what the actual values are and populate them
        },
      ]}
    />
  );
};

export default PlayerMenu;
