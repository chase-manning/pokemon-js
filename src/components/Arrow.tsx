import styled from "styled-components";

import arrow from "../assets/ui/arrow.png";
import PixelImage from "../styles/PixelImage";

const StyledArrow = styled(PixelImage)`
  height: 3vh;

  @media (max-width: 768px) {
    height: 8px;
  }
`;

interface Props {
  show: boolean;
}

const Arrow = ({ show }: Props) => {
  if (!show) return null;

  return <StyledArrow src={arrow} />;
};

export default Arrow;
