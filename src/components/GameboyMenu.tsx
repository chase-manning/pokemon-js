import styled, { keyframes } from "styled-components";

import nintendo from "../assets/title-screen/nintendo.png";
import { useDispatch, useSelector } from "react-redux";
import useEvent from "../app/use-event";
import { Event } from "../app/emitter";
import { hideGameboyMenu, selectGameboyMenu } from "../state/uiSlice";

const StyledGameboyMenu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background: pink;
`;

const colorAnimation = keyframes`
  0% {
    color: #ffd759;
    background-position: -100vw;
    opacity: 0;
  }
  11.7% {
    opacity: 0;
  }
  12% {
    color: #ffd759;
    background-position: -100vw;
    opacity: 1;
  }
  19.5% {
    color: #ffd759;
  }
  21% {
    color: #ff6740;
  }
  28.5% {
    color: #ff6740;
  }
  30% {
    color: #ffb5fe;
  }
  37.5% {
    color: #ffb5fe;
  }
  39% {
    color: #3cb944;
  }
  46.5% {
    color: #3cb944;
  }
  48% {
    color: #3493f8;
  }
  54% {
    background-position: 100vw;
  }
  100% {
    background-position: 100vw;
    opacity: 1;
  }
`;

const Text = styled.div`
  margin-top: 13%;
  font-family: "PressStart2P", sans-serif;
  font-size: 9rem;
  font-weight: 700;
  font-style: italic;
  text-align: center;
  opacity: 0;
  width: 300vw;
  transform: skew(-5deg);
  overflow: hidden;
  white-space: nowrap;
  color: #3232fc;
  background: -webkit-linear-gradient(
    0deg,
    #3493f8 40%,
    #3cb944 40%,
    #3cb944 45%,
    #ffb5fe 45%,
    #ffb5fe 50%,
    #ff6740 50%,
    #ff6740 55%,
    #ffd759 55%,
    #ffd759 60%,
    var(--bg) 60%
  );
  background-position: -100vw;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation: ${colorAnimation} 3s 1 linear forwards;
  animation: ${colorAnimation} 3s 1 linear forwards;

  @media (max-width: 1000px) {
    font-size: 2.5rem;
  }
`;

const apearIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Nintendo = styled.img`
  height: 4%;
  opacity: 0;

  animation: ${apearIn} 0s 300ms 1 linear forwards;
`;

const GameboyMenu = () => {
  const dispatch = useDispatch();
  const show = useSelector(selectGameboyMenu);

  useEvent(Event.A, () => {
    dispatch(hideGameboyMenu());
  });

  if (!show) return null;

  return (
    <StyledGameboyMenu>
      <Text>GAMEBOY</Text>
      <Nintendo src={nintendo} />
    </StyledGameboyMenu>
  );
};

export default GameboyMenu;
