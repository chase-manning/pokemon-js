import styled from "styled-components";

import image from "../assets/ui/health-bar.png";
import PixelImage from "../styles/PixelImage";

const StyledHealthBar = styled.div``;

const Image = styled(PixelImage)`
  height: 5px;

  @media (min-width: 769px) {
    height: 2.5vh;
  }
`;

interface Props {
  maxHealth: number;
  currentHealth: number;
}

const HealthBar = ({ maxHealth, currentHealth }: Props) => {
  // TODO Show health

  return (
    <StyledHealthBar>
      <Image src={image} />
    </StyledHealthBar>
  );
};

export default HealthBar;
