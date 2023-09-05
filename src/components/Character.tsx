import styled from "styled-components";

import frontStill from "../assets/character/front-still.png";

const StyledCharacter = styled.img`
  position: absolute;
  top: calc((-16vw / 2.34) / 5);
  left: 0;
  width: calc(16vw / 2.34);

  // TODO
  image-rendering: optimizeSpeed;
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: pixelated;
  image-rendering: optimize-contrast;
  -ms-interpolation-mode: nearest-neighbor;
`;

const Character = () => {
  return <StyledCharacter src={frontStill} alt="Character" />;
};

export default Character;
