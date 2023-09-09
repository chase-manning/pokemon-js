import { useEffect } from "react";
import { useDispatch } from "react-redux";
import emitter, { Event } from "../app/emitter";

const KeyboardHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          emitter.emit(Event.Up);
          emitter.emit(Event.StartUp);
          break;
        case "ArrowDown":
          emitter.emit(Event.Down);
          emitter.emit(Event.StartDown);
          break;
        case "ArrowLeft":
          emitter.emit(Event.Left);
          emitter.emit(Event.StartLeft);
          break;
        case "ArrowRight":
          emitter.emit(Event.Right);
          emitter.emit(Event.StartRight);
          break;
        case "Enter":
          emitter.emit(Event.A);
          break;
        case "Shift":
          emitter.emit(Event.B);
          break;
        case " ":
          emitter.emit(Event.Start);
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          emitter.emit(Event.StopUp);
          break;
        case "ArrowDown":
          emitter.emit(Event.StopDown);
          break;
        case "ArrowLeft":
          emitter.emit(Event.StopLeft);
          break;
        case "ArrowRight":
          emitter.emit(Event.StopRight);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [dispatch]);

  return null;
};

export default KeyboardHandler;
