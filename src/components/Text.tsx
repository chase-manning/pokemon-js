import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectText } from "../state/gameSlice";

const StyledText = styled.div`
  position: absolute !important;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 20%;
  border: solid 1px green;
  background: #f8f8f8;

  h1 {
    color: black;
    font-size: 30px;
  }
`;

const Text = () => {
  const text = useSelector(selectText);

  if (!text) return null;

  return (
    <>
      <link rel="stylesheet" href="./styles/css-pokemon-gameboy.css" />
      <StyledText className="framed">
        <h1>{text}</h1>
      </StyledText>
    </>
  );
};

export default Text;
