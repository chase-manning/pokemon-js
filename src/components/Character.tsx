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
import { Direction, selectDirection, selectMoving } from "../state/gameSlice";
import { useEffect, useState } from "react";
import { WALK_SPEED } from "../app/constants";
import PixelImage from "../styles/PixelImage";

const StyledCharacter = styled(PixelImage)`
  position: absolute;
  top: calc((-16vw / 2.34) / 5);
  left: 0;
  width: calc(16vw / 2.34);
`;

const Character = () => {
  const [image, setImage] = useState(frontStill);

  const direction = useSelector(selectDirection);

  const moving = useSelector(selectMoving);

  useEffect(() => {
    if (!moving) {
      if (direction === Direction.Down) {
        setImage(frontStill);
      } else if (direction === Direction.Left) {
        setImage(leftStill);
      } else if (direction === Direction.Right) {
        setImage(rightStill);
      } else if (direction === Direction.Up) {
        setImage(backStill);
      } else {
        throw new Error("Invalid last direction");
      }
      return;
    }

    if (direction === Direction.Down) {
      if (image === frontWalk1) {
        setTimeout(() => {
          setImage(frontWalk2);
        }, WALK_SPEED);
      } else if (image === frontWalk2) {
        setTimeout(() => {
          setImage(frontWalk3);
        }, WALK_SPEED);
      } else if (image === frontWalk3) {
        setTimeout(() => {
          setImage(frontWalk1);
        }, WALK_SPEED);
      } else {
        setImage(frontWalk1);
      }
    }

    if (direction === Direction.Up) {
      if (image === backWalk1) {
        setTimeout(() => {
          setImage(backWalk2);
        }, WALK_SPEED);
      } else if (image === backWalk2) {
        setTimeout(() => {
          setImage(backWalk3);
        }, WALK_SPEED);
      } else if (image === backWalk3) {
        setTimeout(() => {
          setImage(backWalk1);
        }, WALK_SPEED);
      } else {
        setImage(backWalk1);
      }
    }

    if (direction === Direction.Left) {
      if (image === leftWalk1) {
        setTimeout(() => {
          setImage(leftWalk2);
        }, WALK_SPEED);
      } else if (image === leftWalk2) {
        setTimeout(() => {
          setImage(leftWalk3);
        }, WALK_SPEED);
      } else if (image === leftWalk3) {
        setTimeout(() => {
          setImage(leftWalk1);
        }, WALK_SPEED);
      } else {
        setImage(leftWalk1);
      }
    }

    if (direction === Direction.Right) {
      if (image === rightWalk1) {
        setTimeout(() => {
          setImage(rightWalk2);
        }, WALK_SPEED);
      } else if (image === rightWalk2) {
        setTimeout(() => {
          setImage(rightWalk3);
        }, WALK_SPEED);
      } else if (image === rightWalk3) {
        setTimeout(() => {
          setImage(rightWalk1);
        }, WALK_SPEED);
      } else {
        setImage(rightWalk1);
      }
    }
  }, [image, moving, direction]);

  return <StyledCharacter src={image} alt="Character" />;
};

export default Character;
