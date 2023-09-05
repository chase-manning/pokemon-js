import styled from "styled-components";
import Gameboy from "./components/Gameboy";
import Game from "./components/Game";

const StyledApp = styled.div`
  background: var(--bg);
  width: 100vw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  padding-bottom: 28px;

  @media (min-width: 768px) {
    padding: 5px;
  }
`;

const App = () => {
  return (
    <StyledApp>
      <Gameboy>
        <Game />
      </Gameboy>
    </StyledApp>
  );
};

export default App;
