import { useSelector } from "react-redux";
import { selectMap, selectPos } from "../state/gameSlice";
import { useEffect } from "react";
import { isTrainerEncounter } from "../app/map-helper";

const TrainerEncounter = () => {
  const map = useSelector(selectMap);
  const pos = useSelector(selectPos);

  const { trainers, walls, fences } = map;

  useEffect(() => {
    if (!trainers) return;

    const encouner = isTrainerEncounter(trainers, walls, fences, pos);

    if (!encouner) return;

    console.log("encounter", encouner.name);
  }, [trainers, walls, fences, pos]);

  return null;
};

export default TrainerEncounter;
