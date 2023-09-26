import { useDispatch, useSelector } from "react-redux";
import { Event } from "../app/emitter";
import useEvent from "../app/use-event";
import {
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  selectJumping,
  setMoving,
} from "../state/gameSlice";
import { useEffect, useRef, useState } from "react";
import { selectMenuOpen, selectSpinning } from "../state/uiSlice";
import { MOVE_SPEED } from "../app/constants";
import { Direction } from "../state/state-types";

const MovementHandler = () => {
  const dispatch = useDispatch();
  const [pressingLeft, setPressingLeft] = useState(false);
  const [pressingRight, setPressingRight] = useState(false);
  const [pressingUp, setPressingUp] = useState(false);
  const [pressingDown, setPressingDown] = useState(false);
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [cooldown, setCooldown] = useState(false);
  const menuOpen = useSelector(selectMenuOpen);
  const jumping = useSelector(selectJumping);
  const spinning = useSelector(selectSpinning);

  const pressingButton =
    pressingLeft || pressingRight || pressingUp || pressingDown;

  useEffect(() => {
    dispatch(setMoving(pressingButton));
  }, [pressingButton, dispatch]);

  const direction = pressingLeft
    ? Direction.Left
    : pressingRight
    ? Direction.Right
    : pressingUp
    ? Direction.Up
    : Direction.Down;

  useEffect(() => {
    const move = (direction: Direction) => {
      switch (spinning ?? direction) {
        case Direction.Down:
          dispatch(moveDown());
          break;
        case Direction.Up:
          dispatch(moveUp());
          break;
        case Direction.Left:
          dispatch(moveLeft());
          break;
        case Direction.Right:
          dispatch(moveRight());
          break;
      }
    };

    // If moving, move the character immediately
    if ((pressingButton || spinning) && !cooldown && !menuOpen && !jumping) {
      move(direction);
      setCooldown(true);

      // Clear any existing interval
      if (tickIntervalRef.current) {
        clearInterval(tickIntervalRef.current);
      }

      // Set up a new interval
      tickIntervalRef.current = setInterval(() => {
        move(direction);
      }, MOVE_SPEED);

      setTimeout(() => setCooldown(false), MOVE_SPEED);
    } else if (!pressingButton && tickIntervalRef.current) {
      // Clear the interval if the user stopped moving
      clearInterval(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }

    return () => {
      // Clear interval when component unmounts
      if (tickIntervalRef.current) {
        clearInterval(tickIntervalRef.current);
      }
    };
  }, [pressingButton, direction, dispatch, cooldown, menuOpen, jumping]);

  useEvent(Event.StartDown, () => {
    setPressingDown(true);
  });
  useEvent(Event.StartUp, () => {
    setPressingUp(true);
  });
  useEvent(Event.StartLeft, () => {
    setPressingLeft(true);
  });
  useEvent(Event.StartRight, () => {
    setPressingRight(true);
  });

  useEvent(Event.StopDown, () => {
    setPressingDown(false);
  });
  useEvent(Event.StopUp, () => {
    setPressingUp(false);
  });
  useEvent(Event.StopLeft, () => {
    setPressingLeft(false);
  });
  useEvent(Event.StopRight, () => {
    setPressingRight(false);
  });
  useEvent(Event.StopMoving, () => {
    setPressingLeft(false);
    setPressingRight(false);
    setPressingUp(false);
    setPressingDown(false);
  });

  return null;
};

export default MovementHandler;
