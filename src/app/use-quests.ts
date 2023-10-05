import { useDispatch, useSelector } from "react-redux";
import { MapId } from "../maps/map-types";
import useBadges from "./use-badges";
import {
  completeQuest,
  selectCompletedQuests,
  selectPos,
  setPos,
  takeMoney,
} from "../state/gameSlice";
import { setBlackScreen, showConfirmationMenu } from "../state/uiSlice";

export interface QuestType {
  trigger: "talk" | "walk";
  map: MapId;
  positions: Record<number, number[]>;
  active: () => boolean;
  text: string[];
  action: () => void;
}

export const useActiveMapQuests = (map: MapId) => {
  const quests = useQuests();
  return quests.filter((quest) => quest.map === map && quest.active());
};

const useQuests = () => {
  const dispatch = useDispatch();
  const badges = useBadges();
  const completedQuests = useSelector(selectCompletedQuests);
  const pos = useSelector(selectPos);

  const quests: QuestType[] = [
    // Pewter City
    {
      trigger: "walk",
      map: MapId.PewterCity,
      positions: {
        17: [35],
        18: [35],
        19: [35],
      },
      active: () => badges.length === 1,
      text: [
        "You're a Trainer, right?",
        "Brock's looking for new challengers.",
        "Follow me!",
      ],
      action: () => {
        dispatch(setBlackScreen(true));
        setTimeout(() => {
          dispatch(setPos({ x: 14, y: 19 }));
        }, 300);
        setTimeout(() => {
          dispatch(setBlackScreen(false));
        }, 600);
      },
    },
    {
      trigger: "walk",
      map: MapId.PewterCityMuseum1f,
      positions: {
        4: [9, 10],
      },
      active: () => !completedQuests.includes("pewter-museum-1f-paid"),
      text: ["It's $50 for a child's ticket."],
      action: () => {
        dispatch(
          showConfirmationMenu({
            preMessage: "Would you like to come in?",
            postMessage: "Right $50! Thank you!",
            confirm: () => {
              dispatch(completeQuest("pewter-museum-1f-paid"));
              dispatch(takeMoney(50));
            },
            cancel: () => {
              dispatch(setPos({ x: pos.x, y: pos.y + 1 }));
            },
          })
        );
      },
    },
  ];

  return quests;
};

export default useQuests;
