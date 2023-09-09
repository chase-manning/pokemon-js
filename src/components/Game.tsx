import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { pressA, selectMap, selectX, selectY } from "../state/gameSlice";
import { useEffect } from "react";
import Character from "./Character";
import Text from "./Text";
import { BLOCK_PIXEL_HEIGHT, BLOCK_PIXEL_WIDTH } from "../app/constants";
import MapChangeHandler from "./MapChangeHandler";
import StartMenu from "./StartMenu";
import KeyboardHandler from "./KeyboardHandler";
import MovementHandler from "./MovementHandler";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledGame = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  transform: translate(
    calc(50% - (16vw / 2.34) / 2),
    calc(50% - (16vw / 2.34) / 2)
  );
`;

interface BackgroundProps {
  width: number;
  height: number;
}

const Background = styled.img<BackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(${(props) => props.width * BLOCK_PIXEL_WIDTH}vw / 2.34);
  height: calc(${(props) => props.height * BLOCK_PIXEL_HEIGHT}vw / 2.34);

  image-rendering: optimizeSpeed;
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: pixelated;
  image-rendering: optimize-contrast;
  -ms-interpolation-mode: nearest-neighbor;

  transition: transform 0.2s steps(5, end);
`;

const Overlay = styled.div<BackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(${(props) => props.width * BLOCK_PIXEL_WIDTH}vw / 2.34);
  height: calc(${(props) => props.height * BLOCK_PIXEL_HEIGHT}vw / 2.34);
  transition: transform 0.2s steps(5, end);
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-template-rows: repeat(${(props) => props.height}, 1fr);
`;

const Item = styled.div`
  border: solid 1px red;
  color: red;
  font-size: 3rem;
  font-weight: bold;
`;

const Game = () => {
  const showGrid = false; // TODO

  const dispatch = useDispatch();

  const x = useSelector(selectX);
  const y = useSelector(selectY);
  const map = useSelector(selectMap);

  const translateX = `calc(
    (
      (
        ${map.width * BLOCK_PIXEL_WIDTH}vw / 2.34
      ) / ${map.width}
    ) * ${-x}
  )`;

  const translateY = `calc(
    (
      (
        ${map.height * BLOCK_PIXEL_HEIGHT}vw / 2.34
      ) / ${map.height}
    ) * ${-y}
  )`;

  // Presses Enter (A)
  // TODO Remove
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        dispatch(pressA());
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  return (
    <Container>
      <StyledGame>
        <Background
          style={{
            transform: `translate(${translateX}, ${translateY})`,
          }}
          src={map.image}
          width={map.width}
          height={map.height}
        />
        <Character />
        {showGrid && (
          <Overlay
            style={{
              transform: `translate(${translateX}, ${translateY})`,
            }}
            width={map.width}
            height={map.height}
          >
            {Array.from(Array(map.width * map.height).keys()).map((i) => {
              const x = i % map.width;
              const y = Math.floor(i / map.width);
              return <Item key={i}>{`${y}, ${x}`}</Item>;
            })}
          </Overlay>
        )}
      </StyledGame>
      <Text />
      <StartMenu />

      {/* Handlers */}
      <MapChangeHandler />
      <KeyboardHandler />
      <MovementHandler />
    </Container>
  );
};

export default Game;
