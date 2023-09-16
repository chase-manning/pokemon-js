import styled from "styled-components";
import Menu from "./Menu";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { load, selectHasSave } from "../state/gameSlice";
import { selectMenuOpen } from "../state/uiSlice";

const StyledLoadScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: white;
`;

const LoadScreen = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const hasSave = useSelector(selectHasSave);
  const menuOpen = useSelector(selectMenuOpen);

  const newGame = {
    label: "New Game",
    action: () => {
      setLoaded(true);
    },
  };

  const loadGame = {
    label: "Continue",
    action: () => {
      dispatch(load());
      setLoaded(true);
    },
  };

  if (loaded) return null;

  return (
    <StyledLoadScreen>
      <Menu
        disabled={menuOpen}
        show={!loaded}
        menuItems={hasSave ? [loadGame, newGame] : [newGame]}
        close={() => setLoaded(true)}
        noExit
        top="0"
        left="0"
        width="12rem"
      />
    </StyledLoadScreen>
  );
};

export default LoadScreen;
