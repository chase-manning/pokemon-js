import styled from "styled-components";

import palletTown from "../assets/map/pallet-town.png";
import { useDispatch, useSelector } from "react-redux";
import {
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  selectX,
  selectY,
} from "../state/gameSlice";
import { useEffect } from "react";

const StyledGame = styled.div`
  height: 100%;
  width: 100%;
`;

interface BackgroundProps {
  width: number;
  height: number;
}

const Background = styled.img<BackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(${(props) => props.width}vw / 2.34);
  height: calc(${(props) => props.height}vw / 2.34);

  image-rendering: optimizeSpeed;
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: pixelated;
  image-rendering: optimize-contrast;
  -ms-interpolation-mode: nearest-neighbor;

  transition: transform 0.2s steps(5, end);
`;

const Game = () => {
  const bgBlockWidth = 20; // TODO
  const bgBlockHeight = 18; // TODO
  const blockPixelWidth = 16; // TODO
  const blockPixelHeight = 16; // TODO

  const dispatch = useDispatch();

  const x = useSelector(selectX);
  const y = useSelector(selectY);

  const translateX = `calc(
    (
      (
        ${bgBlockWidth * blockPixelWidth}vw / 2.34
      ) / 20
    ) * ${-x}
  )`;

  const translateY = `calc(
    (
      (
        ${bgBlockHeight * blockPixelHeight}vw / 2.34
      ) / 18
    ) * ${-y}
  )`;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          dispatch(moveUp());
          break;
        case "ArrowRight":
          dispatch(moveRight());
          break;
        case "ArrowDown":
          dispatch(moveDown());
          break;
        case "ArrowLeft":
          dispatch(moveLeft());
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  return (
    <StyledGame>
      <Background
        style={{
          transform: `translate(${translateX}, ${translateY})`,
        }}
        src={palletTown}
        width={bgBlockWidth * blockPixelWidth}
        height={bgBlockHeight * blockPixelHeight}
      />
    </StyledGame>
  );
};

export default Game;
