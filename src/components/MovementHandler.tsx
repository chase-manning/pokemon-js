import { useDispatch, useSelector } from "react-redux";
import { Event } from "../app/emitter";
import useEvent from "../app/use-event";
import {
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  selectMoving,
  selectMovingDown,
  selectMovingLeft,
  selectMovingRight,
  selectMovingUp,
  startMovingDown,
  startMovingLeft,
  startMovingRight,
  startMovingUp,
  stopMoving,
} from "../state/gameSlice";
import { useState } from "react";
import { AnyAction } from "@reduxjs/toolkit";

const MovementHandler = () => {
  const moveSpeed = 250; // TODO

  const dispatch = useDispatch();
  const moving = useSelector(selectMoving);
  const movingDown = useSelector(selectMovingDown);
  const movingUp = useSelector(selectMovingUp);
  const movingLeft = useSelector(selectMovingLeft);
  const movingRight = useSelector(selectMovingRight);

  const [interval, setMoveInterval] = useState<NodeJS.Timeout | null>(null);

  const _stopMoving = () => {
    dispatch(stopMoving());
    if (interval) clearInterval(interval);
    setMoveInterval(null);
  };

  const startMoving = (movement: AnyAction) => {
    setMoveInterval(
      setInterval(() => {
        dispatch(movement);
      }, moveSpeed)
    );
    dispatch(movement);
  };

  const canMove = () => {
    return !interval && !moving;
  };

  useEvent(Event.StartDown, () => {
    if (!canMove()) return;
    dispatch(startMovingDown());
    startMoving(moveDown());
  });
  useEvent(Event.StartUp, () => {
    if (!canMove()) return;
    dispatch(startMovingUp());
    startMoving(moveUp());
  });
  useEvent(Event.StartLeft, () => {
    if (!canMove()) return;
    dispatch(startMovingLeft());
    startMoving(moveLeft());
  });
  useEvent(Event.StartRight, () => {
    if (!canMove()) return;
    dispatch(startMovingRight());
    startMoving(moveRight());
  });

  useEvent(Event.StopDown, () => {
    if (!movingDown) return;
    _stopMoving();
  });
  useEvent(Event.StopUp, () => {
    if (!movingUp) return;
    _stopMoving();
  });
  useEvent(Event.StopLeft, () => {
    if (!movingLeft) return;
    _stopMoving();
  });
  useEvent(Event.StopRight, () => {
    if (!movingRight) return;
    _stopMoving();
  });
  useEvent(Event.StopMoving, () => {
    _stopMoving();
  });

  return null;
};

export default MovementHandler;
