import styled from "styled-components";
import { DEBUG_MODE } from "../app/constants";
import { useSelector } from "react-redux";
import { selectMap } from "../state/gameSlice";
import { xToPx } from "../app/position-helper";

interface BackgroundProps {
  width: number;
  height: number;
}

const StyledDebugOverlay = styled.div<BackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => xToPx(props.width)};
  height: ${(props) => xToPx(props.height)};
  transition: transform 0.2s steps(5, end);
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-template-rows: repeat(${(props) => props.height}, 1fr);
`;

const Item = styled.div`
  border: solid 1px red;
  font-size: 3rem;
  font-weight: bold;
  color: red;
`;

const DebugOverlay = () => {
  const map = useSelector(selectMap);

  if (!DEBUG_MODE) return null;

  return (
    <StyledDebugOverlay width={map.width} height={map.height}>
      {Array.from(Array(map.width * map.height).keys()).map((i) => {
        const x = i % map.width;
        const y = Math.floor(i / map.width);
        return <Item key={i}>{`${y}, ${x}`}</Item>;
      })}
    </StyledDebugOverlay>
  );
};

export default DebugOverlay;
