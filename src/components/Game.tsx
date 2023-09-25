import styled from "styled-components";

import { useSelector } from "react-redux";
import { selectPos, selectMap } from "../state/gameSlice";
import Character from "./Character";
import Text from "./Text";
import {
  BLOCK_PIXEL_HEIGHT,
  BLOCK_PIXEL_WIDTH,
  DEBUG_MODE,
} from "../app/constants";
import MapChangeHandler from "./MapChangeHandler";
import StartMenu from "./StartMenu";
import KeyboardHandler from "./KeyboardHandler";
import MovementHandler from "./MovementHandler";
import ItemsMenu from "./ItemsMenu";
import PlayerMenu from "./PlayerMenu";
import PixelImage from "../styles/PixelImage";
import TitleScreen from "./TitleScreen";
import LoadScreen from "./LoadScreen";
import SoundHandler from "./SoundHandler";
import GameboyMenu from "./GameboyMenu";
import EncounterHandler from "./EncounterHandler";
import PokemonEncounter from "./PokemonEncounter";
import ActionOnPokemon from "./ActionOnPokemon";
import PokemonCenter from "./PokemonCenter";
import Pc from "./Pc";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledGame = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  transform: translate(
    calc(50% - (16vw / 2.34) / 2),
    calc(50% - (16vw / 2.34) / 2)
  );
`;

interface BackgroundProps {
  width: number;
  height: number;
}

const Background = styled(PixelImage)<BackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(${(props) => props.width * BLOCK_PIXEL_WIDTH}vw / 2.34);
  height: calc(${(props) => props.height * BLOCK_PIXEL_HEIGHT}vw / 2.34);

  transition: transform 0.2s steps(5, end);
`;

const Overlay = styled.div<BackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(${(props) => props.width * BLOCK_PIXEL_WIDTH}vw / 2.34);
  height: calc(${(props) => props.height * BLOCK_PIXEL_HEIGHT}vw / 2.34);
  transition: transform 0.2s steps(5, end);
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-template-rows: repeat(${(props) => props.height}, 1fr);
`;

const Item = styled.div`
  border: solid 1px red;
  font-size: 3rem;
  font-weight: bold;
  color: red;
`;

const ColorOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg);
  mix-blend-mode: darken;
  opacity: 0.5;
`;

const Game = () => {
  const showGrid = DEBUG_MODE;

  const pos = useSelector(selectPos);
  const map = useSelector(selectMap);

  const translateX = `calc(
    (
      (
        ${map.width * BLOCK_PIXEL_WIDTH}vw / 2.34
      ) / ${map.width}
    ) * ${-pos.x}
  )`;

  const translateY = `calc(
    (
      (
        ${map.height * BLOCK_PIXEL_HEIGHT}vw / 2.34
      ) / ${map.height}
    ) * ${-pos.y}
  )`;

  return (
    <Container>
      <StyledGame>
        <Background
          style={{
            transform: `translate(${translateX}, ${translateY})`,
          }}
          src={map.image}
          width={map.width}
          height={map.height}
        />
        <Character />
        {showGrid && (
          <Overlay
            style={{
              transform: `translate(${translateX}, ${translateY})`,
            }}
            width={map.width}
            height={map.height}
          >
            {Array.from(Array(map.width * map.height).keys()).map((i) => {
              const x = i % map.width;
              const y = Math.floor(i / map.width);
              return <Item key={i}>{`${y}, ${x}`}</Item>;
            })}
          </Overlay>
        )}
      </StyledGame>
      <ColorOverlay />
      <PokemonEncounter />
      <Text />
      <PokemonCenter />
      <Pc />
      <StartMenu />
      <ItemsMenu />
      <PlayerMenu />
      <ActionOnPokemon />
      <LoadScreen />
      <TitleScreen />
      <GameboyMenu />

      {/* Handlers */}
      <MapChangeHandler />
      <KeyboardHandler />
      <MovementHandler />
      <SoundHandler />
      <EncounterHandler />
    </Container>
  );
};

export default Game;
