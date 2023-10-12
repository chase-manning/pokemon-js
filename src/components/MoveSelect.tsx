import styled from "styled-components";

import Menu, { MenuItemType } from "./Menu";
import { useSelector } from "react-redux";
import { selectStartMenu } from "../state/uiSlice";
import useIsMobile from "../app/use-is-mobile";
import { selectActivePokemon } from "../state/gameSlice";
import Frame from "./Frame";
import { useState } from "react";
import useMoveMetadata, { getMoveMetadata } from "../app/use-move-metadata";

const Stats = styled.div`
  position: absolute;
  bottom: 20rem;
  right: 45vw;
  display: flex;
  flex-direction: column;
  width: 35rem;
  z-index: 100;

  @media (max-width: 1000px) {
    bottom: 6rem;
    left: 0;
    width: 50%;
  }
`;

const StatsRow = styled.div`
  font-family: "PokemonGB";
  font-size: 3rem;
  text-transform: uppercase;
  text-align: left;
  color: black;
  width: 100%;
  margin-top: 5px;

  @media (max-width: 1000px) {
    font-size: 1rem;
    margin-top: 2px;
  }
`;

interface Props {
  show: boolean;
  select: (move: string) => void;
  close: () => void;
}

const MoveSelect = ({ show, select, close }: Props) => {
  const startMenuOpen = useSelector(selectStartMenu);
  const isMobile = useIsMobile();
  const activePokemon = useSelector(selectActivePokemon);

  const [active, setActive] = useState(0);

  const move = useMoveMetadata(activePokemon.moves[active].id);

  return (
    <>
      <Menu
        tight
        noExitOption
        disabled={startMenuOpen}
        padd={4}
        padding={isMobile ? "100px" : "40vw"}
        show={show}
        menuItems={activePokemon.moves.map((m) => {
          const item: MenuItemType = {
            label: getMoveMetadata(m.id).name,
            action: () => select(m.id),
          };
          return item;
        })}
        close={close}
        bottom="0"
        right="0"
        setHovered={(index) => setActive(index)}
      />
      {show && move && (
        <Stats>
          <Frame>
            <StatsRow>Type/</StatsRow>
            <StatsRow style={{ textAlign: "center" }}>{move?.type}</StatsRow>
            <StatsRow
              style={{ textAlign: "right" }}
            >{`${activePokemon.moves[active].pp}/${move.pp}`}</StatsRow>
          </Frame>
        </Stats>
      )}
    </>
  );
};

export default MoveSelect;
