import styled, { keyframes } from "styled-components";
import Frame from "./Frame";
import { useState } from "react";
import usePokemonMetadata from "../app/use-pokemon-metadata";
import useEvent from "../app/use-event";
import { Event } from "../app/emitter";
import PixelImage from "../styles/PixelImage";
import { useDispatch, useSelector } from "react-redux";
import { hideEvolution, selectEvolution } from "../state/uiSlice";
import { selectPokemon, updateSpecificPokemon } from "../state/gameSlice";

const StyledEvolution = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg);
  z-index: 200;

  height: 80%;
  @media (max-width: 1000px) {
    height: 70%;
  }
`;

const firstAnimation = keyframes`
  0% {
    opacity: 1;
  }
  19% {
    filter: none;
  }
  20% {
    filter: brightness(0.6) saturate(0) contrast(8);
  }
  30% {
    opacity: 1;
  }
  35% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  45% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  52% {
    opacity: 0;
  }
  54% {
    opacity: 1;
  }
  56% {
    opacity: 0;
  }
  58% {
    opacity: 1;
  }
  60% {
    opacity: 0;
  }
  62% {
    opacity: 1;
  }
  64% {
    opacity: 0;
  }
  66% {
    opacity: 1;
  }
  68% {
    opacity: 0;
  }
  70% {
    opacity: 1;
  }
  71% {
    opacity: 0;
  }
  72% {
    opacity: 1;
  }
  73% {
    opacity: 0;
  }
  74% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  76% {
    opacity: 1;
  }
  77% {
    opacity: 0;
  }
  78% {
    opacity: 1;
  }
  79% {
    opacity: 0;
  }
  80% {
    opacity: 0; 
  }
  100%{
    opacity: 0;
    filter: brightness(0.6) saturate(0) contrast(8);
  }
`;

const FirstPokemon = styled(PixelImage)`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 50%;
  transform: translate(-50%, -50%) scaleX(-1);
  filter: none;

  animation: ${firstAnimation} 10s cubic-bezier(1, -1, 0, 2) forwards;
`;

const secondAnimation = keyframes`
  0% {
    opacity: 0;
    filter: brightness(0.6) saturate(0) contrast(8);
  }
  30% {
    opacity: 0;
  }
  35% {
    opacity: 1;
  }
  40% {
    opacity: 0;
  }
  45% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  52% {
    opacity: 1;
  }
  54% {
    opacity: 0;
  }
  56% {
    opacity: 1;
  }
  58% {
    opacity: 0;
  }
  60% {
    opacity: 1;
  }
  62% {
    opacity: 0;
  }
  64% {
    opacity: 1;
  }
  66% {
    opacity: 0;
  }
  68% {
    opacity: 1;
  }
  70% {
    opacity: 0;
  }
  71% {
    opacity: 1;
  }
  72% {
    opacity: 0;
  }
  73% {
    opacity: 1;
  }
  74% {
    opacity: 0;
  }
  75% {
    opacity: 1;
  }
  76% {
    opacity: 0;
  }
  77% {
    opacity: 1;
  }
  78% {
    opacity: 0;
  }
  79% {
    opacity: 1;
  }
  80% {
    opacity: 1; 
  }
  89% {
    filter: brightness(0.6) saturate(0) contrast(8);
  }
  90% {
    filter: none;
  }
  100%{
    opacity: 1;
    filter: none;
  }
`;

const SecondPokemon = styled(PixelImage)`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 50%;
  transform: translate(-50%, -50%) scaleX(-1);
  opacity: 0;
  filter: brightness(0.6) saturate(0) contrast(8);

  animation: ${secondAnimation} 10s cubic-bezier(1, -1, 0, 2) forwards;
`;

const TextContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  z-index: 100;

  @media (max-width: 1000px) {
    height: 30%;
  }
`;

const Evolution = () => {
  const dispatch = useDispatch();
  const evolution = useSelector(selectEvolution);
  const allPokemon = useSelector(selectPokemon);
  const evolvingPokemon = allPokemon[evolution?.index || 0];
  const evolvingId = evolvingPokemon ? evolvingPokemon.id : null;
  const metadata = usePokemonMetadata(evolvingId);
  const evolvesMetadata = usePokemonMetadata(evolution?.evolveToId || null);
  const show = evolution !== null;

  const [evolved, setEvolved] = useState(false);

  useEvent(Event.A, () => {
    if (!show) return;
    if (!evolved) return;
    if (!metadata) throw new Error("No metadata for evolution");

    setEvolved(false);
    dispatch(
      updateSpecificPokemon({
        index: evolution.index,
        pokemon: {
          ...evolvingPokemon,
          id: evolution.evolveToId,
        },
      })
    );
    dispatch(hideEvolution());
  });

  if (!show) return null;

  if (!metadata || !evolvesMetadata) throw new Error("No metadata");

  return (
    <>
      <StyledEvolution>
        <FirstPokemon
          src={metadata.images.front}
          onAnimationEnd={() => setEvolved(true)}
        />
        <SecondPokemon src={evolvesMetadata.images.front} />
      </StyledEvolution>
      <TextContainer>
        <Frame wide tall flashing={evolved}>
          {!evolved
            ? `What? ${metadata.name.toUpperCase()} is evolving!`
            : `${metadata.name.toUpperCase()} evolved into ${evolvesMetadata.name.toUpperCase()}!`}
        </Frame>
      </TextContainer>
    </>
  );
};

export default Evolution;
