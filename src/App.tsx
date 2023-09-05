import styled from "styled-components";
import Gameboy from "./components/Gameboy";

const StyledApp = styled.div`
  background: var(--bg);
  width: 100vw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  padding-bottom: 28px;
`;

const App = () => {
  return (
    <StyledApp>
      <Gameboy />
    </StyledApp>
  );
};

export default App;
