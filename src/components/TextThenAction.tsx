import styled from "styled-components";
import Frame from "./Frame";
import { useDispatch, useSelector } from "react-redux";
import { hideTextThenAction, selectTextThenAction } from "../state/uiSlice";
import { useEffect, useState } from "react";
import useEvent from "../app/use-event";
import { Event } from "../app/emitter";

const StyledTextThenAction = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  z-index: 100;

  @media (max-width: 1000px) {
    height: 30%;
  }
`;

const TextThenAction = () => {
  const dispatch = useDispatch();
  const textThenAction = useSelector(selectTextThenAction);

  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (textThenAction) return;

    setTextIndex(0);
  }, [textThenAction]);

  useEvent(Event.A, () => {
    if (!textThenAction) return;

    if (textIndex === textThenAction.text.length - 1) {
      textThenAction.action();
      dispatch(hideTextThenAction());

      return;
    }

    setTextIndex(textIndex + 1);
  });

  if (!textThenAction) return null;

  return (
    <StyledTextThenAction>
      <Frame wide tall flashing>
        {textThenAction.text[textIndex]}
      </Frame>
    </StyledTextThenAction>
  );
};

export default TextThenAction;
