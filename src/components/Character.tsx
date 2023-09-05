import styled from "styled-components";

import frontStill from "../assets/character/front-still.png";
import frontWalk1 from "../assets/character/front-walk-1.png";
import frontWalk2 from "../assets/character/front-walk-2.png";
import frontWalk3 from "../assets/character/front-walk-3.png";
import leftStill from "../assets/character/left-still.png";
import leftWalk1 from "../assets/character/left-walk-1.png";
import leftWalk2 from "../assets/character/left-walk-2.png";
import leftWalk3 from "../assets/character/left-walk-3.png";
import rightStill from "../assets/character/right-still.png";
import rightWalk1 from "../assets/character/right-walk-1.png";
import rightWalk2 from "../assets/character/right-walk-2.png";
import rightWalk3 from "../assets/character/right-walk-3.png";
import backStill from "../assets/character/back-still.png";
import backWalk1 from "../assets/character/back-walk-1.png";
import backWalk2 from "../assets/character/back-walk-2.png";
import backWalk3 from "../assets/character/back-walk-3.png";
import { useSelector } from "react-redux";
import {
  Direction,
  selectLastDirection,
  selectMovingDown,
  selectMovingLeft,
  selectMovingRight,
  selectMovingUp,
} from "../state/gameSlice";
import { useEffect, useState } from "react";

const StyledCharacter = styled.img`
  position: absolute;
  top: calc((-16vw / 2.34) / 5);
  left: 0;
  width: calc(16vw / 2.34);

  // TODO
  image-rendering: optimizeSpeed;
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: pixelated;
  image-rendering: optimize-contrast;
  -ms-interpolation-mode: nearest-neighbor;
`;

const Character = () => {
  const walkSpeed = 150; // TODO

  const [image, setImage] = useState(frontStill);

  const lastDirection = useSelector(selectLastDirection);

  const movingDown = useSelector(selectMovingDown);
  const movingUp = useSelector(selectMovingUp);
  const movingLeft = useSelector(selectMovingLeft);
  const movingRight = useSelector(selectMovingRight);

  const moving = movingDown || movingUp || movingLeft || movingRight;

  useEffect(() => {
    if (!moving) {
      if (lastDirection === Direction.Front) {
        setImage(frontStill);
      } else if (lastDirection === Direction.Left) {
        setImage(leftStill);
      } else if (lastDirection === Direction.Right) {
        setImage(rightStill);
      } else if (lastDirection === Direction.Back) {
        setImage(backStill);
      } else {
        throw new Error("Invalid last direction");
      }
      return;
    }

    if (movingDown) {
      if (image === frontWalk1) {
        setTimeout(() => {
          setImage(frontWalk2);
        }, walkSpeed);
      } else if (image === frontWalk2) {
        setTimeout(() => {
          setImage(frontWalk3);
        }, walkSpeed);
      } else if (image === frontWalk3) {
        setTimeout(() => {
          setImage(frontWalk1);
        }, walkSpeed);
      } else {
        setImage(frontWalk1);
      }
    }

    if (movingUp) {
      if (image === backWalk1) {
        setTimeout(() => {
          setImage(backWalk2);
        }, walkSpeed);
      } else if (image === backWalk2) {
        setTimeout(() => {
          setImage(backWalk3);
        }, walkSpeed);
      } else if (image === backWalk3) {
        setTimeout(() => {
          setImage(backWalk1);
        }, walkSpeed);
      } else {
        setImage(backWalk1);
      }
    }

    if (movingLeft) {
      if (image === leftWalk1) {
        setTimeout(() => {
          setImage(leftWalk2);
        }, walkSpeed);
      } else if (image === leftWalk2) {
        setTimeout(() => {
          setImage(leftWalk3);
        }, walkSpeed);
      } else if (image === leftWalk3) {
        setTimeout(() => {
          setImage(leftWalk1);
        }, walkSpeed);
      } else {
        setImage(leftWalk1);
      }
    }

    if (movingRight) {
      if (image === rightWalk1) {
        setTimeout(() => {
          setImage(rightWalk2);
        }, walkSpeed);
      } else if (image === rightWalk2) {
        setTimeout(() => {
          setImage(rightWalk3);
        }, walkSpeed);
      } else if (image === rightWalk3) {
        setTimeout(() => {
          setImage(rightWalk1);
        }, walkSpeed);
      } else {
        setImage(rightWalk1);
      }
    }
  }, [
    movingDown,
    movingUp,
    movingLeft,
    movingRight,
    lastDirection,
    image,
    moving,
  ]);

  return <StyledCharacter src={image} alt="Character" />;
};

export default Character;
