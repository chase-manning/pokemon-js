import { useDispatch, useSelector } from "react-redux";
import { encounterTrainer, selectMap, selectPos } from "../state/gameSlice";
import { useEffect } from "react";
import { isTrainerEncounter } from "../app/map-helper";

const TrainerEncounter = () => {
  const dispatch = useDispatch();
  const map = useSelector(selectMap);
  const pos = useSelector(selectPos);

  const { trainers, walls, fences } = map;

  useEffect(() => {
    if (!trainers) return;

    const encouner = isTrainerEncounter(trainers, walls, fences, pos);

    if (!encouner) return;

    dispatch(encounterTrainer(encouner));
  }, [trainers, walls, fences, pos, dispatch]);

  return null;
};

export default TrainerEncounter;
