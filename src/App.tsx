import styled from "styled-components";
import Gameboy from "./components/Gameboy";
import Game from "./components/Game";

import "./App.css";
import Paint from "./components/Paint";
import { PAINT_MODE } from "./app/constants";

const StyledApp = styled.div`
  background: black;
  width: 100vw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  padding-bottom: 28px;

  @media (min-width: 1000px) {
    padding: 5px;
  }
`;

const App = () => {
  return (
    <StyledApp>
      <Gameboy>
        <Game />
        {PAINT_MODE && <Paint />}
      </Gameboy>
    </StyledApp>
  );
};

export default App;
