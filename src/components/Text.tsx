import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectText } from "../state/gameSlice";

const StyledText = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 20%;
  border: solid 1px green;
  background: pink;
  color: black;
  font-size: 30px;
`;

const Text = () => {
  const text = useSelector(selectText);

  if (!text) return null;

  return <StyledText>{text}</StyledText>;
};

export default Text;
