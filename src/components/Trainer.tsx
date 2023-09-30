import styled from "styled-components";
import { TrainerType } from "../maps/map-types";
import PixelImage from "../styles/PixelImage";
import { xToPx, yToPx } from "../app/position-helper";
import { useSelector } from "react-redux";
import { selectTrainerEncounter } from "../state/gameSlice";
import { useEffect, useState } from "react";

import alert from "../assets/ui/alert.png";

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

const Alert = styled(PixelImage)`
  width: ${xToPx(1)};
  position: absolute;
  top: ${yToPx(-1)};
  left: 0;
  transform: translateY(-20%);
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  z-index: 1000;
`;

interface Props {
  trainer: TrainerType;
}

const Trainer = ({ trainer }: Props) => {
  const encounter = useSelector(selectTrainerEncounter);

  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    if (encounter) {
      setTimeout(() => {
        setStage(1);
      }, 200);
    } else {
      setStage(0);
    }
  }, [encounter]);

  return (
    <StyledTrainer x={trainer.pos.x} y={trainer.pos.y}>
      <Alert src={alert} style={{ opacity: stage === 1 ? 1 : 0 }} />
      <Sprite src={trainer.sprites.small} />
    </StyledTrainer>
  );
};

export default Trainer;
