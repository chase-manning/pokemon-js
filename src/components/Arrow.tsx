import styled from "styled-components";

import arrow from "../assets/ui/arrow.png";
import arrowDisabled from "../assets/ui/arrow-disabled.png";
import PixelImage from "../styles/PixelImage";

interface ArrowProps {
  $menu: boolean;
}

const StyledArrow = styled(PixelImage)<ArrowProps>`
  height: ${(props) => (props.$menu ? "23px" : "3vh")};

  @media (max-width: 1000px) {
    height: ${(props) => (props.$menu ? "11px" : "8px")};
  }
`;

interface Props {
  show: boolean;
  menu?: boolean;
  disabled?: boolean;
}

const Arrow = ({ show, menu, disabled }: Props) => {
  if (!show) return null;

  return <StyledArrow src={disabled ? arrowDisabled : arrow} $menu={!!menu} />;
};

export default Arrow;
