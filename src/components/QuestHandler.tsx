import { useDispatch, useSelector } from "react-redux";
import { selectMapId, selectPos } from "../state/gameSlice";
import { useActiveMapQuests } from "../app/use-quests";
import { useEffect } from "react";
import { showTextThenAction } from "../state/uiSlice";

const QuestHandler = () => {
  const dispatch = useDispatch();
  const mapId = useSelector(selectMapId);
  const quests = useActiveMapQuests(mapId);
  const pos = useSelector(selectPos);

  useEffect(() => {
    quests.forEach((quest) => {
      if (quest.trigger !== "walk") return;
      const yPos = quest.positions[pos.y];
      if (!yPos) return;
      if (!yPos.includes(pos.x)) return;
      dispatch(
        showTextThenAction({
          text: quest.text,
          action: () => quest.action(),
        })
      );
    });
  }, [quests, pos, dispatch]);

  return null;
};

export default QuestHandler;
