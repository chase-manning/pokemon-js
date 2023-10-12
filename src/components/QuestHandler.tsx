import { useDispatch, useSelector } from "react-redux";
import { selectDirection, selectMapId, selectPos } from "../state/gameSlice";
import { useActiveMapQuests } from "../app/use-quests";
import { useEffect } from "react";
import { selectMenuOpen, showTextThenAction } from "../state/uiSlice";
import useEvent from "../app/use-event";
import { Event } from "../app/emitter";
import { directionModifier } from "../app/map-helper";

const QuestHandler = () => {
  const dispatch = useDispatch();
  const mapId = useSelector(selectMapId);
  const quests = useActiveMapQuests(mapId);
  const pos = useSelector(selectPos);
  const facing = useSelector(selectDirection);
  const menuOpen = useSelector(selectMenuOpen);

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

  useEvent(Event.A, () => {
    if (menuOpen) return;
    const mod = directionModifier(facing);
    const questPos = { x: pos.x + mod.x, y: pos.y + mod.y };
    quests.forEach((quest) => {
      if (quest.trigger !== "talk") return;
      const yPos = quest.positions[questPos.y];
      if (!yPos) return;
      if (!yPos.includes(questPos.x)) return;
      dispatch(
        showTextThenAction({
          text: quest.text,
          action: () => quest.action(),
        })
      );
    });
  });

  return null;
};

export default QuestHandler;
