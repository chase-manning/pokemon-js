import styled from "styled-components";

interface FrameProps {
  wide?: boolean;
  tall?: boolean;
}

const StyledFrame = styled.div<FrameProps>`
  position: relative;
  background: #f8f8f8;

  width: ${(props: FrameProps) => (props.wide ? "100%" : "auto")};
  height: ${(props: FrameProps) => (props.tall ? "100%" : "auto")};

  h1 {
    color: black;
    font-size: 30px;
    font-family: "PokemonGB";

    @media (max-width: 768px) {
      font-size: 9px;
    }
  }
`;

interface Props {
  children: React.ReactNode;
  wide?: boolean;
  tall?: boolean;
}

const Frame = ({ children, wide, tall }: Props) => {
  if (typeof children === "string") {
    return (
      <StyledFrame className="framed" wide={wide} tall={tall}>
        <h1>{children}</h1>
      </StyledFrame>
    );
  }

  return (
    <StyledFrame className="framed" wide={wide} tall={tall}>
      {children}
    </StyledFrame>
  );
};

export default Frame;
