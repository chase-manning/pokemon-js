import styled from "styled-components";

import map from "../assets/map/mt-moon-3f.png";
import { useState } from "react";
import { PosType } from "../state/state-types";
import PixelImage from "../styles/PixelImage";

const StyledPaint = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background: white;
  z-index: 10000000;
`;

const ImageContainer = styled.div`
  position: relative;
  border: solid 1px green;
  height: 100%;
`;

const Image = styled(PixelImage)`
  height: 100%;
`;

interface BackgroundProps {
  width: number;
  height: number;
}

const Grid = styled.div<BackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-template-rows: repeat(${(props) => props.height}, 1fr);
  /* border: solid 1px pink; */
`;

interface ItemProps {
  active: boolean;
}

const Item = styled.button<ItemProps>`
  border: solid 1px red;
  font-size: 1rem;
  font-weight: bold;
  color: transparent;
  border: solid 1px blue;

  /* background: ${(props) =>
    props.active ? "rgba(0,0,0,0.5)" : "transparent"}; */
  background: ${(props) =>
    props.active ? "rgba(255,255,255,0.5)" : "transparent"};

  padding: 0 !important;
  margin: 0 !important;
`;

const Paint = () => {
  const HEIGHT = 28;
  const WIDTH = 28;
  const [points, setPoints] = useState<PosType[]>([]);
  const [mouseDown, setMouseDown] = useState(false);

  const ITEMS = HEIGHT * WIDTH;

  const outputCode = () => {
    let code = "{";
    for (let i = 0; i < HEIGHT; i++) {
      code += `${i}: [`;
      const row = points.filter((point) => point.y === i);
      for (let j = 0; j < row.length; j++) {
        code += `${row[j].x},`;
      }
      code += `],`;
    }
    code += "}";
    console.log(code);
  };

  outputCode();

  return (
    <StyledPaint>
      <ImageContainer>
        <Image src={map} />
        <Grid width={WIDTH} height={HEIGHT}>
          {Array.from(Array(ITEMS).keys()).map((i) => {
            const x = i % WIDTH;
            const y = Math.floor(i / WIDTH);
            const active = points.some(
              (point) => point.x === x && point.y === y
            );
            return (
              <Item
                key={i}
                active={active}
                onMouseDown={() => {
                  setMouseDown(true);

                  if (active) {
                    setPoints(
                      points.filter((point) => point.x !== x || point.y !== y)
                    );
                  } else {
                    setPoints([...points, { x, y }]);
                  }
                }}
                onMouseUp={() => setMouseDown(false)}
                onMouseEnter={() => {
                  if (!mouseDown) return;
                  if (active) {
                    setPoints(
                      points.filter((point) => point.x !== x || point.y !== y)
                    );
                  } else {
                    setPoints([...points, { x, y }]);
                  }
                }}
              >
                {/* {`${y}, ${x}`} */}
              </Item>
            );
          })}
        </Grid>
      </ImageContainer>
    </StyledPaint>
  );
};

export default Paint;
