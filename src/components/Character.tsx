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
import { useDispatch, useSelector } from "react-redux";
import {
  moveDown,
  selectDirection,
  selectJumping,
  selectMoving,
  stopJumping,
} from "../state/gameSlice";
import { useEffect, useState } from "react";
import { MOVE_SPEED, WALK_SPEED } from "../app/constants";
import PixelImage from "../styles/PixelImage";
import { selectSpinning } from "../state/uiSlice";
import { Direction } from "../state/state-types";

const Container = styled.div`
  position: absolute;
  top: calc((-16vw / 2.34) / 5);
  left: 0;
  width: calc(16vw / 2.34);
`;

const JumpContainer = styled.div`
  width: 100%;
  transform: translateY(0);

  transition: transform ${MOVE_SPEED}ms linear;
`;

const StyledCharacter = styled(PixelImage)`
  width: 100%;
`;

const Character = () => {
  const dispatch = useDispatch();

  const direction = useSelector(selectDirection);
  const moving = useSelector(selectMoving);
  const jumping = useSelector(selectJumping);
  const spinning = useSelector(selectSpinning);

  const [image, setImage] = useState(frontStill);
  const [animateJumping, setAnimateJumping] = useState(false);

  useEffect(() => {
    if (jumping) {
      setAnimateJumping(true);
      setTimeout(() => {
        dispatch(moveDown());
        setAnimateJumping(false);
      }, MOVE_SPEED * 0.9);
      setTimeout(() => {
        dispatch(stopJumping());
      }, MOVE_SPEED * 2);
    }
  }, [jumping, dispatch]);

  useEffect(() => {
    if (spinning) {
      if (image === frontStill) {
        setTimeout(() => {
          setImage(leftStill);
        }, WALK_SPEED);
      } else if (image === leftStill) {
        setTimeout(() => {
          setImage(backStill);
        }, WALK_SPEED);
      } else if (image === backStill) {
        setTimeout(() => {
          setImage(rightStill);
        }, WALK_SPEED);
      } else if (image === rightStill) {
        setTimeout(() => {
          setImage(frontStill);
        }, WALK_SPEED);
      } else {
        setImage(frontStill);
      }
      return;
    }

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
  }, [image, moving, direction, spinning]);

  return (
    <Container>
      <JumpContainer
        style={{
          transform: animateJumping ? "translateY(-80%)" : "translateY(0)",
        }}
      >
        <StyledCharacter src={image} alt="Character" />
      </JumpContainer>
    </Container>
  );
};

export default Character;
