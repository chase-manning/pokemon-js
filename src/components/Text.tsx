import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import {
  selectDirection,
  selectPos,
  selectMap,
  selectMapId,
} from "../state/gameSlice";
import { useEffect, useState } from "react";
import useEvent from "../app/use-event";
import emitter, { Event } from "../app/emitter";
import {
  hideText,
  selectStartMenu,
  selectText,
  showText,
} from "../state/uiSlice";
import { Direction } from "../state/state-types";
import { useActiveMapQuests } from "../app/use-quests";
import PixelImage from "../styles/PixelImage";

interface TextProps {
  $done: boolean;
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
  background: var(--bg);
  z-index: 1000;

  h1 {
    color: black;
    font-size: 30px;
    font-family: "PokemonGB";

    @media (max-width: 1000px) {
      font-size: 9px;
    }
  }

  @media (max-width: 1000px) {
    height: 30%;
  }

  ::after {
    content: "";
    position: absolute;
    bottom: ${(props) => (props.$done ? "25px" : "-100px")};
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

    @media (max-width: 1000px) {
      bottom: ${(props) => (props.$done ? "13px" : "-100px")};
      right: 10px;
      width: 1.3px;
      height: 1.3px;
      font-size: 1.3px;
    }
  }
`;

const Image = styled(PixelImage)`
  height: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Text = () => {
  const dispatch = useDispatch();
  const [liveIndex, setLiveIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const pos = useSelector(selectPos);
  const direction = useSelector(selectDirection);
  const map = useSelector(selectMap);
  const startMenuOpen = useSelector(selectStartMenu);
  const text = useSelector(selectText);
  const mapId = useSelector(selectMapId);
  const quests = useActiveMapQuests(mapId);

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
        dispatch(hideText());
      } else {
        setTextIndex((prev) => prev + 1);
      }
      return;
    }

    if (startMenuOpen) return;

    // Getting coords in front of character
    let { x, y } = pos;
    switch (direction) {
      case Direction.Down:
        y += 1;
        break;
      case Direction.Up:
        y -= 1;
        break;
      case Direction.Left:
        x -= 1;
        break;
      case Direction.Right:
        x += 1;
        break;
    }

    // If there is a quest at this position, don't open text
    if (quests.length > 0) {
      const isQuest = quests.some((quest) => {
        if (quest.trigger !== "talk") return false;
        const yPos = quest.positions[y];
        if (!yPos) return false;
        if (!yPos.includes(x)) return false;
        return true;
      });
      if (isQuest) return;
    }

    // Open new textbox
    if (map.text[y] && map.text[y][x] && map.text[y][x].length > 0) {
      emitter.emit(Event.StopMoving);
      dispatch(showText(map.text[y][x]));
    }
  });

  if (!text) return null;

  return (
    <>
      {text[textIndex].length > 300 ? (
        <Image src={text[textIndex]} />
      ) : (
        <StyledText className="framed no-hd" $done={liveIndex > text.length}>
          <h1>{text[textIndex].substring(0, liveIndex)}</h1>
        </StyledText>
      )}
    </>
  );
};

export default Text;
