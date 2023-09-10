import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  exitMap,
  selectMap,
  selectX,
  selectY,
  setMap,
} from "../state/gameSlice";
import { useEffect, useState } from "react";
import { MapType } from "../maps/map-types";

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
    const nextMap = map.maps[y] ? map.maps[y][x] : null;
    const exit = map.exits[y] ? map.exits[y][x] : null;

    if (!nextMap && !exit) return;

    const updateMap = (map_?: MapType) => {
      setDark(true);
      setTimeout(() => {
        if (map_) {
          dispatch(setMap(map_));
        } else {
          dispatch(exitMap());
        }
      }, 300);
      setTimeout(() => {
        setDark(false);
      }, 600);
    };

    if (nextMap) {
      updateMap(nextMap);
    } else if (exit) {
      updateMap();
    }
  }, [x, y, map.maps, dispatch, map.exits]);

  return <Overlay show={dark} />;
};

export default MapChangeHandler;
