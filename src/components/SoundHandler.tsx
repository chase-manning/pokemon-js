import { useSelector } from "react-redux";
import { selectMap, selectPokemonEncounter } from "../state/gameSlice";
import { selectGameboyMenu, selectLoadMenu } from "../state/uiSlice";

import mapData from "../maps/map-data";
import { MapType } from "../maps/map-types";
import { useRef, useState } from "react";
import { Event } from "../app/emitter";
import useEvent from "../app/use-event";

import openingMusic from "../assets/music/ui/opening.mp3";
import buttonPress from "../assets/music/ui/button-press.wav";
import enterDoor from "../assets/music/ui/enter-door.mp3";
import battleMusic from "../assets/music/ui/battle.mp3";

const SoundHandler = () => {
  const map = useSelector(selectMap);
  const isLoadScreen = useSelector(selectLoadMenu);
  const isGameboyMenu = useSelector(selectGameboyMenu);
  const [uiSound, setUiSound] = useState<string | undefined>(undefined);
  const uiSoundRef = useRef<HTMLAudioElement>(null);
  const inBattle = !!useSelector(selectPokemonEncounter);

  const meow: string = openingMusic;

  const isOpening = !isGameboyMenu && isLoadScreen;

  const getMapMusic = (map: MapType): string => {
    if (map.music) return map.music;
    if (!map.exitReturnMap) throw new Error("map missing music");
    const returnMap = mapData[map.exitReturnMap];
    if (!returnMap) throw new Error("return map missing music");
    return getMapMusic(returnMap);
  };

  const music = () => {
    if (isOpening) return meow;
    if (inBattle) return battleMusic;
    const mapMusic = getMapMusic(map);
    if (mapMusic) return mapMusic;
    return undefined;
  };

  const playUiSound = (sound: string, volume = 1) => {
    if (uiSoundRef.current) uiSoundRef.current.volume = volume;
    setUiSound(sound);
  };

  useEvent(Event.A, () => {
    playUiSound(buttonPress, 0.2);
  });

  useEvent(Event.B, () => {
    playUiSound(buttonPress, 0.2);
  });

  useEvent(Event.EnterDoor, () => {
    playUiSound(enterDoor);
  });

  return (
    <>
      <audio autoPlay loop src={music()} />
      <audio
        ref={uiSoundRef}
        autoPlay
        src={uiSound}
        onEnded={() => setUiSound(undefined)}
      />
    </>
  );
};

export default SoundHandler;
