import { useDispatch, useSelector } from "react-redux";
import { MapId } from "../maps/map-types";
import useBadges from "./use-badges";
import {
  addPokemon,
  completeQuest,
  gainMoney,
  healPokemon,
  selectCompletedQuests,
  selectPos,
  setPos,
  takeMoney,
} from "../state/gameSlice";
import { setBlackScreen, showConfirmationMenu } from "../state/uiSlice";
import { getPokemonStats } from "./use-pokemon-stats";
import { getMoveMetadata } from "./use-move-metadata";

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

  const isComplete = (questId: string) => {
    return completedQuests.includes(questId);
  };

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
      active: () => badges.length === 0,
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
      active: () => !isComplete("pewter-museum-1f-paid"),
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
    {
      trigger: "talk",
      map: MapId.PalletTownHouseA1F,
      positions: {
        10: [18],
      },
      active: () => true,
      text: ["You have some food in the oven!"],
      action: () => {
        dispatch(
          showConfirmationMenu({
            preMessage: "Eat it to recover your pokemon's health?",
            postMessage: "Your pokemon are fully healed!",
            confirm: () => {
              dispatch(healPokemon());
            },
          })
        );
      },
    },
    {
      trigger: "walk",
      map: MapId.PalletTownHouseB,
      positions: {
        3: [0, 1, 2, 3, 4, 5, 6, 7],
      },
      active: () => !isComplete("chase-0"),
      text: ["Lien!!! You're finally awake!", "Yay!!!"],
      action: () => {
        dispatch(completeQuest("chase-0"));
      },
    },
    {
      trigger: "talk",
      map: MapId.PalletTownHouseB,
      positions: {
        1: [4],
      },
      active: () => !isComplete("chase-1"),
      text: [
        "Hey Lien!",
        "It's so great to see you!",
        "I've missed you!",
        "Welcome to my home!",
        "There's mini milks in the fridge if you are hungry",
        "I heard you are going on a Pokemon adventure!",
        "That's so cool!",
        "I wish I could go with you!",
        "But I have some programming to do",
        "What's that?",
        "You don't have any Pokemon!?",
        "Oh no!!!",
        "I have a spare one you can have!",
        "Here you go!",
        "Lien received EEVEE!",
        "It's my favourite Pokemon!",
        "It's so cute right!?",
        "Please take good care of EEVEE!",
        "Good luck on your adventure Lien!",
        "Please come back and visit me often!",
        "I will miss you lots while you're gone!",
        "Oh before you go!",
        "Can you do me a favour?",
        "Can you pick me up something from the store?",
        "In Bethnal Green there is a Poke Mart",
        "They sell Poke Balls there",
        "Can you buy me one and bring it back?",
        "You can catch the central line from Stratford",
        "Here, take this",
        "Lien received $400",
        "That should be enough to buy a Poke Ball",
        "I'll be waiting for you here!",
        "Good luck Lien!",
        "I'll see you soon!",
      ],
      action: () => {
        dispatch(gainMoney(400));
        dispatch(completeQuest("chase-1"));
        dispatch(
          addPokemon({
            id: 133,
            level: 5,
            xp: 0,
            hp: getPokemonStats(133, 5).hp,
            moves: [
              {
                id: "tackle",
                pp: getMoveMetadata("tackle").pp ?? 0,
              },
              {
                id: "sand-attack",
                pp: getMoveMetadata("sand-attack").pp ?? 0,
              },
            ],
          })
        );
      },
    },
  ];

  return quests;
};

export default useQuests;
