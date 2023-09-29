import styled from "styled-components";

import { useSelector } from "react-redux";
import { selectPos, selectMap } from "../state/gameSlice";
import Character from "./Character";
import Text from "./Text";
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
import PokeMart from "./PokeMart";
import SpinningHandler from "./SpinningHandler";
import { TrainerType } from "../maps/map-types";
import Trainer from "./Trainer";
import { xToPx, yToPx } from "../app/position-helper";
import DebugOverlay from "./DebugOverlay";
import TrainerEncounter from "./TrainerEncounter";

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
    calc(50% - ${xToPx(1)} / 2),
    calc(50% - ${yToPx(1)} / 2)
  );
`;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  transition: transform 0.2s steps(5, end);
`;

interface BackgroundProps {
  width: number;
  height: number;
}

const Background = styled(PixelImage)<BackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => xToPx(props.width)};
  height: ${(props) => yToPx(props.height)};
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
  const pos = useSelector(selectPos);
  const map = useSelector(selectMap);

  return (
    <Container>
      <StyledGame>
        <BackgroundContainer
          style={{
            transform: `translate(${xToPx(-pos.x)}, ${yToPx(-pos.y)})`,
          }}
        >
          <Background src={map.image} width={map.width} height={map.height} />
          {map.trainers &&
            map.trainers.map((trainer: TrainerType) => (
              <Trainer key={trainer.id} trainer={trainer} />
            ))}
          <DebugOverlay />
        </BackgroundContainer>
        <Character />
      </StyledGame>

      <ColorOverlay />
      <TrainerEncounter />
      <PokemonEncounter />
      <Text />
      <PokemonCenter />
      <Pc />
      <PokeMart />
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
      <SpinningHandler />
    </Container>
  );
};

export default Game;
