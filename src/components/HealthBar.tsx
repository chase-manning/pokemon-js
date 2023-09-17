import styled from "styled-components";

import image from "../assets/ui/health-bar.png";
import PixelImage from "../styles/PixelImage";

const StyledHealthBar = styled.div`
  position: relative;
`;

interface ImageProps {
  big?: boolean;
}

const Image = styled(PixelImage)<ImageProps>`
  height: ${(props) => (props.big ? "6px" : "5px")};

  @media (min-width: 769px) {
    height: 2.5vh;
  }
`;

interface Props {
  maxHealth: number;
  currentHealth: number;
  big?: boolean;
}

const HealthBar = ({ maxHealth, currentHealth, big }: Props) => {
  // TODO Show health

  return (
    <StyledHealthBar>
      <Image src={image} big={big} />
    </StyledHealthBar>
  );
};

export default HealthBar;
