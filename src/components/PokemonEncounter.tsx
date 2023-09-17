import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectActivePokemon,
  selectPokemonEncounter,
} from "../state/gameSlice";
import usePokemonMetadata from "../app/use-pokemon-metadata";
import Frame from "./Frame";
import HealthBar from "./HealthBar";
import usePokemonStats from "../app/use-pokemon-stats";

import corner from "../assets/ui/corner.png";

const StyledPokemonEncounter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg);
  padding-top: 3px;
  display: flex;
  flex-direction: column;
  width: 100%;

  height: 80%;
  @media (max-width: 768px) {
    height: 70%;
  }
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex: 1;
`;

const LeftInfoSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 5%;
`;

const RightInfoSection = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  margin-right: 5%;
`;

const Name = styled.div`
  font-size: 1.5rem;
  font-family: "PokemonGB";
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const Level = styled.div`
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-family: "PressStart2P", sans-serif;

  @media (max-width: 768px) {
    font-size: 12px;
    margin: 0 28px;
  }
`;

const HealthBarContainer = styled.div`
  margin: 0 5px;

  @media (max-width: 768px) {
    margin: 0 8px;
  }
`;

const Health = styled.div`
  font-size: 1.5rem;
  margin-left: 10px;
  font-family: "PokemonGB";
  margin: 0 5px;

  @media (max-width: 768px) {
    font-size: 13px;
    margin: 0 8px;
    margin-top: 3px;
  }
`;

const ImageContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 100%;
`;

const Corner = styled.img`
  height: 19px;
  transform: translateY(-50%);
`;

const CornerContainer = styled.div`
  height: 10px;
`;

const CornerRight = styled.img`
  height: 19px;
  transform: translateY(-70%) scaleX(-1);
`;

const TextContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  z-index: 100;

  @media (max-width: 768px) {
    height: 30%;
  }
`;

const PokemonEncounter = () => {
  const enemy = useSelector(selectPokemonEncounter);
  const enemyMetadata = usePokemonMetadata(enemy?.id || null);
  const enemyStats = usePokemonStats(enemy?.id || 1, enemy?.level || 1);
  const active = useSelector(selectActivePokemon);
  const activeMetadata = usePokemonMetadata(active?.id || null);
  const activeStats = usePokemonStats(active?.id || 1, active?.level || 1);

  if (!enemy || !enemyMetadata || !activeMetadata || !active) return null;

  return (
    <>
      <StyledPokemonEncounter>
        <Row>
          <LeftInfoSection>
            <Name>{enemyMetadata.name}</Name>
            <Level>{`:L${enemy.level}`}</Level>
            <HealthBarContainer>
              <HealthBar
                big
                currentHealth={enemy.hp}
                maxHealth={enemyStats.hp}
              />
            </HealthBarContainer>
            <Corner src={corner} />
          </LeftInfoSection>
          <ImageContainer>
            <Image src={enemyMetadata.images.front} />
          </ImageContainer>
        </Row>
        <Row>
          <ImageContainer>
            <Image src={activeMetadata.images.back} />
          </ImageContainer>
          <RightInfoSection>
            <Name>{activeMetadata.name}</Name>
            <Level>{`:L${active.level}`}</Level>
            <HealthBarContainer>
              <HealthBar
                big
                currentHealth={active.hp}
                maxHealth={activeStats.hp}
              />
            </HealthBarContainer>
            <Health>{`${active.hp}/${activeStats.hp}`}</Health>
            <CornerContainer>
              <CornerRight src={corner} />
            </CornerContainer>
          </RightInfoSection>
        </Row>
      </StyledPokemonEncounter>
      <TextContainer>
        <Frame wide tall>
          meow
        </Frame>
      </TextContainer>
    </>
  );
};

export default PokemonEncounter;
