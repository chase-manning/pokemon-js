import { useSelector } from "react-redux";
import { selectMap } from "../state/gameSlice";
import { selectGameboyMenu, selectLoadMenu } from "../state/uiSlice";

import openingMusic from "../assets/music/ui/opening.mp3";
import mapData from "../maps/map-data";
import { MapType } from "../maps/map-types";

const SoundHandler = () => {
  const map = useSelector(selectMap);
  const isLoadScreen = useSelector(selectLoadMenu);
  const isGameboyMenu = useSelector(selectGameboyMenu);

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
    const mapMusic = getMapMusic(map);
    if (mapMusic) return mapMusic;
    return undefined;
  };

  return <audio autoPlay loop src={music()} />;
};

export default SoundHandler;
