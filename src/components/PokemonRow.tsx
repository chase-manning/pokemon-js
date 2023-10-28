import styled from "styled-components";
import usePokemonMetadata from "../app/use-pokemon-metadata";
import { PokemonMetadata } from "../app/pokemon-metadata";
import HealthBar from "./HealthBar";
import Arrow from "./Arrow";

import monsterA from "../assets/pokemon/simple/monster-a.png";
import monsterB from "../assets/pokemon/simple/monster-b.png";
import birdA from "../assets/pokemon/simple/bird-a.png";
import birdB from "../assets/pokemon/simple/bird-b.png";
import bugA from "../assets/pokemon/simple/bug-a.png";
import bugB from "../assets/pokemon/simple/bug-b.png";
import dogA from "../assets/pokemon/simple/dog-a.png";
import dogB from "../assets/pokemon/simple/dog-b.png";
import cuteA from "../assets/pokemon/simple/cute-a.png";
import cuteB from "../assets/pokemon/simple/cute-b.png";
import dragonA from "../assets/pokemon/simple/dragon-a.png";
import dragonB from "../assets/pokemon/simple/dragon-b.png";
import fishA from "../assets/pokemon/simple/fish-a.png";
import fishB from "../assets/pokemon/simple/fish-b.png";
import fossilA from "../assets/pokemon/simple/fossil-a.png";
import fossilB from "../assets/pokemon/simple/fossil-b.png";
import grassA from "../assets/pokemon/simple/grass-a.png";
import grassB from "../assets/pokemon/simple/grass-b.png";
import ballA from "../assets/pokemon/simple/ball-a.png";
import ballB from "../assets/pokemon/simple/ball-b.png";
import usePokemonStats from "../app/use-pokemon-stats";
import { PokemonInstance } from "../state/state-types";
import { MoveMetadata } from "../app/move-metadata";
import PixelImage from "../styles/PixelImage";

const getIcons = (metadata: PokemonMetadata): { a: string; b: string } => {
  // Is Voltorb or Electrode
  const balls = [100, 101];
  if (balls.includes(metadata.id)) {
    return { a: ballA, b: ballB };
  }

  // Is fossil
  const fossils = [138, 139, 140, 141];
  if (fossils.includes(metadata.id)) {
    return { a: fossilA, b: fossilB };
  }

  // Is 'cute'
  const cute = [35, 36, 39, 40, 113];
  if (cute.includes(metadata.id)) {
    return { a: cuteA, b: cuteB };
  }

  // Is dragon type
  if (metadata.types.includes("dragon")) {
    return { a: dragonA, b: dragonB };
  }

  // Is flying type
  if (metadata.types.includes("flying")) {
    return { a: birdA, b: birdB };
  }

  // Is water type
  if (metadata.types.includes("water")) {
    return { a: fishA, b: fishB };
  }

  // Is bug type
  if (metadata.types.includes("bug")) {
    return { a: bugA, b: bugB };
  }

  // Is grass type
  if (metadata.types.includes("grass")) {
    return { a: grassA, b: grassB };
  }

  // Is quadrupeds
  const quadrupeds = [58, 59, 37, 38, 77, 78, 111, 112, 27, 28];
  if (quadrupeds.includes(metadata.id)) {
    return { a: dogA, b: dogB };
  }

  // Default
  return { a: monsterA, b: monsterB };
};

const StyledPokemonRow = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 1px;
  align-items: center;

  @media (min-width: 1000px) {
    margin-bottom: 1vh;
  }
`;

const ArrowContainer = styled.div`
  width: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled(PixelImage)`
  height: 19px;
  margin-right: 10px;

  // The sprites seemd a bit yellow, so I added a hue-rotate filter to make them more red
  filter: hue-rotate(-25deg);

  @media (min-width: 1000px) {
    height: 8vh;
    margin-right: 4vh;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const Name = styled.div`
  font-size: 9px;
  transform: translateY(3px);
  font-family: "PokemonGB";
  text-transform: uppercase;

  @media (min-width: 1000px) {
    font-size: 3.7vh;
    transform: translateY(1vh);
  }
`;

const HealthBarContainer = styled.div`
  margin-left: 10px;

  @media (min-width: 1000px) {
    margin-left: 4vh;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  height: 100%;
  justify-content: space-between;

  @media (min-width: 1000px) {
    margin-left: 4vh;
  }
`;

const Level = styled.div`
  font-size: 8px;
  font-family: "PressStart2P", sans-serif;
  margin-bottom: 2px;
  margin-top: 1px;

  @media (min-width: 1000px) {
    font-size: 3.3vh;
    margin-bottom: 1vh;
    margin-top: 0.5vh;
  }
`;

const Health = styled.div`
  font-size: 9px;
  margin-left: 10px;
  font-family: "PokemonGB";

  @media (min-width: 1000px) {
    font-size: 3.3vh;
    margin-left: 4vh;
  }
`;

interface Props {
  pokemon: PokemonInstance;
  active: boolean;
  moveData?: MoveMetadata;
}

const PokemonRow = ({ pokemon, active, moveData }: Props) => {
  const metadata = usePokemonMetadata(pokemon.id);
  const stats = usePokemonStats(pokemon.id, pokemon.level);

  if (!metadata) return null;

  const icons = getIcons(metadata);

  // TODO Add animation while active

  return (
    <StyledPokemonRow>
      <ArrowContainer>
        <Arrow show={active} />
      </ArrowContainer>
      <Image src={icons.a} />

      <InfoContainer>
        <Name>{metadata.name}</Name>
        <HealthBarContainer>
          <HealthBar maxHealth={stats.hp} currentHealth={pokemon.hp} />
        </HealthBarContainer>
      </InfoContainer>
      <StatsContainer>
        <Level>{`:L${pokemon.level}`}</Level>
        <Health>
          {moveData
            ? moveData.learnedBy.includes(pokemon.id)
              ? "ABLE"
              : "NOT ABLE"
            : `${pokemon.hp}/${stats.hp}`}
        </Health>
      </StatsContainer>
    </StyledPokemonRow>
  );
};

export default PokemonRow;
