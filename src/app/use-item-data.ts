import { useDispatch, useSelector } from "react-redux";
import {
  consumeItem,
  selectPokemon,
  updateSpecificPokemon,
} from "../state/gameSlice";
import { getPokemonStats } from "./use-pokemon-stats";
import { showActionOnPokemon } from "../state/uiSlice";

export enum ItemType {
  MasterBall = "master-ball",
  UltraBall = "ultra-ball",
  GreatBall = "great-ball",
  PokeBall = "poke-ball",
  TownMap = "town-map",
  Bicycle = "bicycle",
  SafariBall = "safari-ball",
  Pokedex = "pokedex",
  MoonStone = "moon-stone",
  Antidote = "antidote",
  BurnHeal = "burn-heal",
  IceHeal = "ice-heal",
  Awakening = "awakening",
  ParlyzHeal = "parlyz-heal",
  FullRestore = "full-restore",
  MaxPotion = "max-potion", // DONE
  HyperPotion = "hyper-potion",
  SuperPotion = "super-potion",
  Potion = "potion",
  BoulderBadge = "boulder-badge",
  CascadeBadge = "cascade-badge",
  ThunderBadge = "thunder-badge",
  RainbowBadge = "rainbow-badge",
  SoulBadge = "soul-badge",
  MarshBadge = "marsh-badge",
  VolcanoBadge = "volcano-badge",
  EarthBadge = "earth-badge",
  EscapeRope = "escape-rope",
  Repel = "repel",
  OldAmber = "old-amber",
  FireStone = "fire-stone",
  ThunderStone = "thunder-stone",
  WaterStone = "water-stone",
  HpUp = "hp-up",
  Protein = "protein",
  Iron = "iron",
  Carbos = "carbos",
  Calcium = "calcium",
  RareCandy = "rare-candy",
  DomeFossil = "dome-fossil",
  HelixFossil = "helix-fossil",
  SecretKey = "secret-key",
  BikeVoucher = "bike-voucher",
  XAccuracy = "x-accuracy",
  LeafStone = "leaf-stone",
  CardKey = "card-key",
  Nugget = "nugget",
  PpUp = "pp-up",
  PokeDoll = "poke-doll",
  FullHeal = "full-heal",
  Revive = "revive",
  MaxRevive = "max-revive",
  GuardSpec = "guard-spec",
  SuperRepel = "super-repel",
  MaxRepel = "max-repel",
  DireHit = "dire-hit",
  Coin = "coin",
  FreshWater = "fresh-water",
  SodaPop = "soda-pop",
  Lemondade = "lemonade",
  SSTicket = "ss-ticket",
  GoldTeeth = "gold-teeth",
  XAttack = "x-attack",
  XDefend = "x-defend",
  XSpeed = "x-speed",
  XSpecial = "x-special",
  CoinCase = "coin-case",
  OaksParcel = "oaks-parcel",
  ItemFinder = "item-finder",
  SilphScope = "silph-scope",
  PokeFlute = "poke-flute",
  LiftKey = "lift-key",
  ExpAll = "exp-all",
  OldRod = "old-rod",
  GoodRod = "good-rod",
  SuperRod = "super-rod",
  Ether = "ether",
  MaxEther = "max-ether",
  Elixer = "elixer",
  MaxElixer = "max-elixer",
  Hm01 = "hm01",
  Hm02 = "hm02",
  Hm03 = "hm03",
  Hm04 = "hm04",
  Hm05 = "hm05",
  Tm01 = "tm01",
  Tm02 = "tm02",
  Tm03 = "tm03",
  Tm04 = "tm04",
  Tm05 = "tm05",
  Tm06 = "tm06",
  Tm07 = "tm07",
  Tm08 = "tm08",
  Tm09 = "tm09",
  Tm10 = "tm10",
  Tm11 = "tm11",
  Tm12 = "tm12",
  Tm13 = "tm13",
  Tm14 = "tm14",
  Tm15 = "tm15",
  Tm16 = "tm16",
  Tm17 = "tm17",
  Tm18 = "tm18",
  Tm19 = "tm19",
  Tm20 = "tm20",
  Tm21 = "tm21",
  Tm22 = "tm22",
  Tm23 = "tm23",
  Tm24 = "tm24",
  Tm25 = "tm25",
  Tm26 = "tm26",
  Tm27 = "tm27",
  Tm28 = "tm28",
  Tm29 = "tm29",
  Tm30 = "tm30",
  Tm31 = "tm31",
  Tm32 = "tm32",
  Tm33 = "tm33",
  Tm34 = "tm34",
  Tm35 = "tm35",
  Tm36 = "tm36",
  Tm37 = "tm37",
  Tm38 = "tm38",
  Tm39 = "tm39",
  Tm40 = "tm40",
  Tm41 = "tm41",
  Tm42 = "tm42",
  Tm43 = "tm43",
  Tm44 = "tm44",
  Tm45 = "tm45",
  Tm46 = "tm46",
  Tm47 = "tm47",
  Tm48 = "tm48",
  Tm49 = "tm49",
  Tm50 = "tm50",
  Tm51 = "tm51",
  Tm52 = "tm52",
  Tm53 = "tm53",
  Tm54 = "tm54",
  Tm55 = "tm55",
}

export interface ItemData {
  type: ItemType;
  name: string;
  countable: boolean;
  consumable: boolean;
  usableInBattle: boolean;
  pokeball: boolean;
  cost: number;
  sellPrice: number;
  action: () => void;
}

const useItemData = () => {
  const dispatch = useDispatch();
  const pokemon = useSelector(selectPokemon);

  const data: Record<string, ItemData> = {
    [ItemType.MaxPotion]: {
      type: ItemType.MaxPotion,
      name: "Max Potion",
      countable: true,
      consumable: true,
      usableInBattle: true,
      pokeball: false,
      cost: 2500,
      sellPrice: 1250,
      action: () => {
        dispatch(
          showActionOnPokemon((index: number) => {
            dispatch(
              updateSpecificPokemon({
                index,
                pokemon: {
                  ...pokemon[index],
                  hp: getPokemonStats(pokemon[index].id, pokemon[index].level)
                    .hp,
                },
              })
            );
            dispatch(consumeItem(ItemType.MaxPotion));
          })
        );
      },
    },
  };
  return data;
};

export default useItemData;
