import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { exitMap, selectPos, selectMap, setMap } from "../state/gameSlice";
import { useEffect, useState } from "react";
import { MapId } from "../maps/map-types";
import emitter, { Event } from "../app/emitter";

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
  const pos = useSelector(selectPos);
  const map = useSelector(selectMap);

  useEffect(() => {
    const nextMap = map.maps[pos.y] ? map.maps[pos.y][pos.x] : null;
    const exit = map.exits[pos.y] ? map.exits[pos.y][pos.x] : null;

    if (!nextMap && !exit) return;

    const updateMap = (map_?: MapId) => {
      setDark(true);
      setTimeout(() => {
        emitter.emit(Event.EnterDoor);
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
  }, [pos, map.maps, dispatch, map.exits]);

  return <Overlay show={dark} />;
};

export default MapChangeHandler;
