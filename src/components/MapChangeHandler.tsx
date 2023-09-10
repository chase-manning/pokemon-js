import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { exitMap, selectLocation, selectMap, setMap } from "../state/gameSlice";
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
  const location = useSelector(selectLocation);
  const map = useSelector(selectMap);

  useEffect(() => {
    const nextMap = map.maps[location.y]
      ? map.maps[location.y][location.x]
      : null;
    const exit = map.exits[location.y]
      ? map.exits[location.y][location.x]
      : null;

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
  }, [location, map.maps, dispatch, map.exits]);

  return <Overlay show={dark} />;
};

export default MapChangeHandler;
