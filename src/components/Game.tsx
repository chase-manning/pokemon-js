import styled from "styled-components";

import palletTown from "../assets/map/pallet-town.png";
import { useDispatch, useSelector } from "react-redux";
import {
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  selectMovingDown,
  selectMovingLeft,
  selectMovingRight,
  selectMovingUp,
  selectX,
  selectY,
  startMovingDown,
  startMovingLeft,
  startMovingRight,
  startMovingUp,
  stopMovingDown,
  stopMovingLeft,
  stopMovingRight,
  stopMovingUp,
} from "../state/gameSlice";
import { useEffect, useState } from "react";
import Character from "./Character";

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
  const moveSpeed = 250; // TODO
  const bgBlockWidth = 20; // TODO
  const bgBlockHeight = 18; // TODO
  const blockPixelWidth = 16; // TODO
  const blockPixelHeight = 16; // TODO

  const dispatch = useDispatch();

  const x = useSelector(selectX);
  const y = useSelector(selectY);
  const movingUp = useSelector(selectMovingUp);
  const movingDown = useSelector(selectMovingDown);
  const movingRight = useSelector(selectMovingRight);
  const movingLeft = useSelector(selectMovingLeft);

  const [moveInterval, setMoveInterval] = useState<NodeJS.Timeout | null>(null);

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
          if (!movingDown && !movingLeft && !movingRight) {
            dispatch(startMovingUp());
          }
          break;
        case "ArrowDown":
          if (!movingUp && !movingLeft && !movingRight) {
            dispatch(startMovingDown());
          }
          break;
        case "ArrowLeft":
          if (!movingUp && !movingDown && !movingRight) {
            dispatch(startMovingLeft());
          }
          break;
        case "ArrowRight":
          if (!movingUp && !movingDown && !movingLeft) {
            dispatch(startMovingRight());
          }
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          dispatch(stopMovingUp());
          break;
        case "ArrowDown":
          dispatch(stopMovingDown());
          break;
        case "ArrowLeft":
          dispatch(stopMovingLeft());
          break;
        case "ArrowRight":
          dispatch(stopMovingRight());
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [dispatch, movingUp, movingDown, movingLeft, movingRight]);

  useEffect(() => {
    if (movingUp && !moveInterval) {
      dispatch(moveUp());
      setMoveInterval(
        setInterval(() => {
          dispatch(moveUp());
        }, moveSpeed)
      );
    }
    if (movingDown && !moveInterval) {
      dispatch(moveDown());
      setMoveInterval(
        setInterval(() => {
          dispatch(moveDown());
        }, moveSpeed)
      );
    }
    if (movingLeft && !moveInterval) {
      dispatch(moveLeft());
      setMoveInterval(
        setInterval(() => {
          dispatch(moveLeft());
        }, moveSpeed)
      );
    }
    if (movingRight && !moveInterval) {
      dispatch(moveRight());
      setMoveInterval(
        setInterval(() => {
          dispatch(moveRight());
        }, moveSpeed)
      );
    }
    if (
      !movingUp &&
      !movingDown &&
      !movingLeft &&
      !movingRight &&
      moveInterval
    ) {
      if (moveInterval) {
        clearInterval(moveInterval);
        setTimeout(() => {
          setMoveInterval(null);
        }, moveSpeed);
      }
    }

    return () => {
      if (moveInterval) {
        clearInterval(moveInterval);
      }
    };
  }, [dispatch, movingUp, movingDown, movingLeft, movingRight, moveInterval]);

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
      <Character />
    </StyledGame>
  );
};

export default Game;
