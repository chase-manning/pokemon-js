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
          break;
        case "ArrowDown":
          emitter.emit(Event.Down);
          break;
        case "ArrowLeft":
          emitter.emit(Event.Left);
          break;
        case "ArrowRight":
          emitter.emit(Event.Right);
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

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  return null;
};

export default KeyboardHandler;
