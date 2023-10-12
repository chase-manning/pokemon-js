import styled, { keyframes } from "styled-components";

interface FrameProps {
  $wide?: boolean;
  $tall?: boolean;
  $flashing?: boolean;
}

const animation = keyframes`
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

const StyledFrame = styled.div<FrameProps>`
  position: relative;
  background: var(--bg);

  width: ${(props: FrameProps) => (props.$wide ? "100%" : "auto")};
  height: ${(props: FrameProps) => (props.$tall ? "100%" : "auto")};

  h1 {
    color: black;
    font-size: 30px;
    font-family: "PokemonGB";

    @media (max-width: 1000px) {
      font-size: 9px;
    }
  }

  ::after {
    content: "";
    position: absolute;
    bottom: ${(props) => (props.$flashing ? "25px" : "-1000px")};
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
    animation: ${animation} 1s infinite;

    @media (max-width: 1000px) {
      bottom: ${(props) => (props.$flashing ? "13px" : "-1000px")};
      right: 10px;
      width: 1.3px;
      height: 1.3px;
      font-size: 1.3px;
    }
  }
`;

interface Props {
  children: React.ReactNode;
  wide?: boolean;
  tall?: boolean;
  flashing?: boolean;
  rightText?: boolean;
}

const Frame = ({ children, wide, tall, flashing, rightText }: Props) => {
  if (typeof children === "string") {
    return (
      <StyledFrame
        className="framed"
        $wide={wide}
        $tall={tall}
        $flashing={flashing}
      >
        <h1 style={{ textAlign: rightText ? "right" : "left" }}>{children}</h1>
      </StyledFrame>
    );
  }

  return (
    <StyledFrame
      className="framed"
      $wide={wide}
      $tall={tall}
      $flashing={flashing}
    >
      {children}
    </StyledFrame>
  );
};

export default Frame;
