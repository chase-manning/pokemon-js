import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { exitMap, selectPos, selectMap, setMap } from "../state/gameSlice";
import { useEffect } from "react";
import { MapId } from "../maps/map-types";
import emitter, { Event } from "../app/emitter";
import { isExit } from "../app/map-helper";
import { selectBlackScreen, setBlackScreen } from "../state/uiSlice";

interface OverlayProps {
  $show: boolean;
}

const Overlay = styled.div<OverlayProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: ${(props) => (props.$show ? 1 : 0)};

  transition: opacity 0.3s steps(3, end);
`;

const MapChangeHandler = () => {
  const dispatch = useDispatch();
  const pos = useSelector(selectPos);
  const map = useSelector(selectMap);
  const darkScreen = useSelector(selectBlackScreen);

  useEffect(() => {
    const nextMap = map.maps[pos.y] ? map.maps[pos.y][pos.x] : null;
    const exit = isExit(map.exits, pos.x, pos.y);

    if (!nextMap && !exit) return;
    if (darkScreen) return;

    const updateMap = (map_?: MapId) => {
      dispatch(setBlackScreen(true));
      setTimeout(() => {
        emitter.emit(Event.EnterDoor);
        if (map_) {
          dispatch(setMap(map_));
        } else {
          dispatch(exitMap());
        }
      }, 300);
      setTimeout(() => {
        dispatch(setBlackScreen(false));
      }, 600);
    };

    if (nextMap) {
      updateMap(nextMap);
    } else if (exit) {
      updateMap();
    }
  }, [pos, map.maps, dispatch, map.exits, darkScreen]);

  return <Overlay $show={darkScreen} />;
};

export default MapChangeHandler;
