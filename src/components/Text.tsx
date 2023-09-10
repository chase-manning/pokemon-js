import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import {
  Direction,
  selectLastDirection,
  selectMap,
  selectX,
  selectY,
} from "../state/gameSlice";
import { useEffect, useState } from "react";
import useEvent from "../app/use-event";
import emitter, { Event } from "../app/emitter";

interface TextProps {
  done: boolean;
}

// Flashing animation
const flashing = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const StyledText = styled.div<TextProps>`
  position: absolute !important;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 20%;
  background: #f8f8f8;

  h1 {
    color: black;
    font-size: 30px;
    font-family: "PokemonGB";

    @media (max-width: 768px) {
      font-size: 9px;
    }
  }

  @media (max-width: 768px) {
    height: 30%;
  }

  ::after {
    content: "";
    position: absolute;
    bottom: ${(props) => (props.done ? "25px" : "-100px")};
    right: 20px;
    width: 3px;
    height: 3px;
    font-size: 3px;
    color: #181010;
    box-shadow: 1em 0em 0 #181010, 2em 0em 0 #181010, 1em 1em 0 #181010,
      2em 1em 0 #181010, 3em 1em 0 #181010, 1em 2em 0 #181010, 2em 2em 0 #181010,
      3em 2em 0 #181010, 4em 2em 0 #181010, 1em 3em 0 #181010, 2em 3em 0 #181010,
      3em 3em 0 #181010, 4em 3em 0 #181010, 5em 3em 0 #181010, 1em 4em 0 #181010,
      2em 4em 0 #181010, 3em 4em 0 #181010, 4em 4em 0 #181010, 1em 5em 0 #181010,
      2em 5em 0 #181010, 3em 5em 0 #181010, 1em 6em 0 #181010, 2em 6em 0 #181010;
    transform: rotate(90deg);
    animation: ${flashing} 1s infinite;

    @media (max-width: 768px) {
      bottom: ${(props) => (props.done ? "13px" : "-100px")};
      right: 10px;
      width: 1.3px;
      height: 1.3px;
      font-size: 1.3px;
    }
  }
`;

const Text = () => {
  const [text, setText] = useState<string[] | null>(null);
  const [liveIndex, setLiveIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const x = useSelector(selectX);
  const y = useSelector(selectY);
  const lastDirection = useSelector(selectLastDirection);
  const map = useSelector(selectMap);

  useEffect(() => {
    setLiveIndex(0);
    if (text) {
      const interval = setInterval(() => {
        setLiveIndex((prev) => prev + 1);
      }, 30);

      return () => clearInterval(interval);
    }
  }, [text, textIndex]);

  useEvent(Event.A, () => {
    // Reading text
    if (text) {
      if (textIndex === text.length - 1) {
        setTextIndex(0);
        setText(null);
      } else {
        setTextIndex((prev) => prev + 1);
      }
      return;
    }

    // Getting coords in front of character
    let x_ = x;
    let y_ = y;
    switch (lastDirection) {
      case Direction.Front:
        y_ += 1;
        break;
      case Direction.Back:
        y_ -= 1;
        break;
      case Direction.Left:
        x_ -= 1;
        break;
      case Direction.Right:
        x_ += 1;
        break;
    }

    // Open new textbox
    if (map.text[y_] && map.text[y_][x_] && map.text[y_][x_].length > 0) {
      emitter.emit(Event.StopMoving);
      setText(map.text[y_][x_]);
    }
  });

  if (!text) return null;

  return (
    <StyledText className="framed no-hd" done={liveIndex > text.length}>
      <h1>{text[textIndex].substring(0, liveIndex)}</h1>
    </StyledText>
  );
};

export default Text;
