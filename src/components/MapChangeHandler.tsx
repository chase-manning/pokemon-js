import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMap,
  selectX,
  selectY,
  setMap,
  stopMoving,
} from "../state/gameSlice";
import { useEffect, useState } from "react";

interface OverlayProps {
  show: boolean;
}

const Overlay = styled.div<OverlayProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: ${(props) => (props.show ? 1 : 0)};

  transition: opacity 0.3s steps(3, end);
`;

const MapChangeHandler = () => {
  const [dark, setDark] = useState(false);
  const dispatch = useDispatch();
  const x = useSelector(selectX);
  const y = useSelector(selectY);
  const map = useSelector(selectMap);

  useEffect(() => {
    if (!map.maps[y] || !map.maps[y][x]) return;
    dispatch(stopMoving());
    setDark(true);
    setTimeout(() => {
      dispatch(setMap(map.maps[y][x]));
    }, 300);
    setTimeout(() => {
      setDark(false);
    }, 600);
  }, [x, y, map.maps, dispatch]);

  return <Overlay show={dark} />;
};

export default MapChangeHandler;
