import styled, { keyframes } from "styled-components";
import PixelImage from "../styles/PixelImage";

import title from "../assets/title-screen/pokemon.png";
import subtitle from "../assets/title-screen/version.png";
import player from "../assets/title-screen/player.png";
import { useEffect, useState } from "react";
import usePokemon from "../app/use-pokemon";
import useEvent from "../app/use-event";
import { Event } from "../app/emitter";
import { useDispatch, useSelector } from "react-redux";
import { hideTitleMenu, selectTitleMenu } from "../state/uiSlice";

const StyledTitleScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  background: #f7e8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2%;
`;

const falldown = keyframes`
  0% {
    transform: translateY(-200%);
  }
  33% {
    transform: translateY(-200%);
  }
  67% {
    transform: translateY(0)
  }
  100% {
    transform: translateY(0)
  }
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  height: 50%;
`;

const slideIn = keyframes`
  0% {
    transform: translateY(-50%) translateX(200%);
  }
  67% {
    transform: translateY(-50%) translateX(200%);
  }
  100% {
    transform: translateY(-50%) translateX(0)
  }
`;

const Title = styled(PixelImage)`
  height: 100%;

  animation: ${falldown} 3s ease-in-out;
`;

const SubTitle = styled(PixelImage)`
  height: 14%;
  transform: translateY(-50%);

  animation: ${slideIn} 3s ease-in-out;
`;

const PokemonPlayerContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Player = styled(PixelImage)`
  height: 100%;
  transform: translateX(-13%);
`;

const slideInAndOut = keyframes`
  0% {
    transform: translateX(400%);
  }
  10% {
    transform: translateX(13%);
  }
  90% {
    transform: translateX(13%);
  }
  100% {
    transform: translateX(-400%);
  }
`;

const Pokemon = styled(PixelImage)`
  height: 100%;
  transform: translateX(13%);

  animation: ${slideInAndOut} 5s linear infinite;
`;

const TitleScreen = () => {
  const dispatch = useDispatch();
  const [pokemonId, setPokemonId] = useState<number | null>(null);
  const show = useSelector(selectTitleMenu);

  const pokemon = usePokemon(pokemonId);

  const randomPokemon = () => {
    setPokemonId(Math.floor(Math.random() * 151) + 1);
  };

  useEffect(() => {
    randomPokemon();

    const interval = setInterval(() => {
      randomPokemon();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEvent(Event.A, () => {
    if (!show) return;
    dispatch(hideTitleMenu());
  });

  if (!show) return null;

  return (
    <StyledTitleScreen>
      <TitleSection>
        <Title src={title} />
        <SubTitle src={subtitle} />
      </TitleSection>
      <PokemonPlayerContainer>
        {pokemon && <Pokemon src={pokemon.image} />}
        <Player src={player} />
      </PokemonPlayerContainer>
    </StyledTitleScreen>
  );
};

export default TitleScreen;
