import { useDispatch, useSelector } from "react-redux";
import { MapId } from "../maps/map-types";
import useBadges from "./use-badges";
import {
  addInventory,
  addPokemon,
  completeQuest,
  consumeItem,
  gainMoney,
  healPokemon,
  selectCompletedQuests,
  selectInventory,
  selectPokemon,
  selectPos,
  setPos,
  takeMoney,
} from "../state/gameSlice";
import { setBlackScreen, showConfirmationMenu } from "../state/uiSlice";
import { getPokemonStats } from "./use-pokemon-stats";
import { getMoveMetadata } from "./use-move-metadata";
import { ItemType } from "./use-item-data";

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
  const inventory = useSelector(selectInventory);
  const pokemon = useSelector(selectPokemon);

  const isComplete = (questId: string) => {
    return completedQuests.includes(questId);
  };

  const hasItem = (item: ItemType) => {
    return inventory.some((inventoryItem) => inventoryItem.item === item);
  };

  const hasPokemon = (id: number) => {
    return pokemon.some((pokemon) => pokemon.id === id);
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
      map: MapId.PalletTown,
      positions: {
        1: [10, 11],
      },
      active: () => pokemon.length === 0,
      text: ["You don't have any POKEMON!"],
      action: () => {
        dispatch(setPos({ x: pos.x, y: pos.y + 1 }));
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
    {
      trigger: "talk",
      map: MapId.PalletTownHouseB,
      positions: {
        1: [4],
      },
      active: () => !isComplete("chase-2") && hasItem(ItemType.PokeBall),
      text: [
        "Yay Lien you're back!",
        "So happy to see you!",
        "Are you having fun on your adventure?",
        "How is EEVEE?",
        "Are you treating her well?",
        "I hope so!",
        "Oh yeah!",
        "Did you get me that Poke Ball?",
        "You did!?",
        "Yay!",
        "Chase took the Poke Ball",
        "Thank you so much!",
        "To thank you, I have a gift for you!",
        "It's a pikachu doll!",
        "Lien received PIKACHU DOLL!",
        "It has a special ability",
        "When you hug it, it will bring you home!",
        "And if you hug it again",
        "It will take you back to where you were!",
        "You can only use it in towns though",
        "It's so cool right!?",
        "Try it out when you're next in Bethnal Green!",
        "Can you do me another favour?",
        "I really want to see a real life Pikachu!",
        "I heard they live in Weavers Fields",
        "Just outside Bethnal Green",
        "Can you go there and catch one?",
        "I'll be waiting for you here!",
        "Good luck Lien!",
        "I'll see you soon!",
      ],
      action: () => {
        dispatch(completeQuest("chase-2"));
        dispatch(addInventory({ item: ItemType.PikachuDoll, amount: 1 }));
        dispatch(consumeItem(ItemType.PokeBall));
      },
    },
    {
      trigger: "talk",
      map: MapId.PalletTownHouseB,
      positions: {
        1: [4],
      },
      active: () => !isComplete("chase-3") && hasPokemon(25),
      text: [
        "Lien!!!",
        "Welcome back!",
        "I've missed you! I've missed you!",
        "You are looking beautiful today!",
        "I'm so happy to see you!",
        "How is your adventure going?",
        "Have you caught a Pikachu yet?",
        "You have!?",
        "Yay!",
        "Can I see it?",
        "It's so cute!",
        "I love it!",
        "Thank you so much!",
        "You can keep it!",
        "I just wanted to see one!",
        "To thank you, I have a gift for you!",
        "Lien received ULTRA BALL",
        "If you continue through Weavers Fields",
        "You can walk to Shoreditch",
        "There is a gym there!",
        "Try to beat the gym leader!",
        "I'll be waiting for you here!",
      ],
      action: () => {
        dispatch(completeQuest("chase-3"));
        dispatch(addInventory({ item: ItemType.UltraBall, amount: 1 }));
      },
    },
  ];

  return quests;
};

export default useQuests;
