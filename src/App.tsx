import styled from "styled-components";

const StyledApp = styled.div`
  background: var(--bg);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  return <StyledApp>meow</StyledApp>;
};

export default App;
