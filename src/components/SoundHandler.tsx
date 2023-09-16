import { useSelector } from "react-redux";
import { selectMap } from "../state/gameSlice";
import { selectTitleMenu } from "../state/uiSlice";

import openingMusic from "../assets/music/ui/opening.mp3";

const SoundHandler = () => {
  const map = useSelector(selectMap);
  const isTitleScreen = useSelector(selectTitleMenu);

  const music = () => {
    if (isTitleScreen) {
      return openingMusic;
    }

    return map.music;
  };

  return <audio autoPlay loop src={music()} />;
};

export default SoundHandler;
