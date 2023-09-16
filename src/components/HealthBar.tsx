import styled from "styled-components";

import image from "../assets/ui/health-bar.png";
import PixelImage from "../styles/PixelImage";

const StyledHealthBar = styled.div``;

const Image = styled(PixelImage)`
  height: 5px;
`;

interface Props {
  maxHealth: number;
  currentHealth: number;
}

const HealthBar = ({ maxHealth, currentHealth }: Props) => {
  return (
    <StyledHealthBar>
      <Image src={image} />
    </StyledHealthBar>
  );
};

export default HealthBar;
