import styled from "styled-components";
import Gameboy from "./components/Gameboy";

const StyledApp = styled.div`
  background: var(--bg);
  height: 100vh;
  width: 100vw;
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
