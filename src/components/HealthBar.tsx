import styled from "styled-components";

import image from "../assets/ui/health-bar.png";
import PixelImage from "../styles/PixelImage";

const StyledHealthBar = styled.div`
  position: relative;
  height: auto;
`;

const HealthContainer = styled.div`
  position: absolute;
  top: 23.3%;
  right: 1.5%;
  width: 75.2%;
  height: 46%;

  @media (max-width: 1000px) {
    height: 30%;
    top: 40%;
  }
`;

interface HealthProps {
  $percent: number;
}

const HealthFill = styled.div<HealthProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.$percent}%;
  height: 100%;
  background: ${(Props) => {
    if (Props.$percent > 50) {
      return "var(--green)";
    } else if (Props.$percent > 25) {
      return "var(--orange)";
    } else {
      return "var(--red)";
    }
  }};

  transition: width 1s ease-out;
`;

interface ImageProps {
  $big?: boolean;
}

const Image = styled(PixelImage)<ImageProps>`
  position: relative;
  height: ${(props) => (props.$big ? "6px" : "5px")};

  @media (min-width: 1000px) {
    height: 2.5vh;
  }
`;

interface Props {
  maxHealth: number;
  currentHealth: number;
  big?: boolean;
}

const HealthBar = ({ maxHealth, currentHealth, big }: Props) => {
  return (
    <StyledHealthBar>
      <HealthContainer>
        <HealthFill $percent={Math.round((currentHealth / maxHealth) * 100)} />
      </HealthContainer>
      <Image src={image} $big={big} />
    </StyledHealthBar>
  );
};

export default HealthBar;
