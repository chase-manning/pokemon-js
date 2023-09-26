import styled from "styled-components";
import { TrainerType } from "../maps/map-types";
import PixelImage from "../styles/PixelImage";
import { xToPx, yToPx } from "../app/position-helper";

interface TrainerProps {
  x: number;
  y: number;
}

const StyledTrainer = styled.div<TrainerProps>`
  position: absolute;
  top: ${(props) => yToPx(props.y)};
  left: ${(props) => xToPx(props.x)};
  transform: translateY(-20%);
`;

const Sprite = styled(PixelImage)`
  width: ${xToPx(1)};
`;

interface Props {
  trainer: TrainerType;
}

const Trainer = ({ trainer }: Props) => {
  console.log(trainer.pos);
  return (
    <StyledTrainer x={trainer.pos.x} y={trainer.pos.y}>
      <Sprite src={trainer.sprites.small} />
    </StyledTrainer>
  );
};

export default Trainer;
