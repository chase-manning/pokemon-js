import { useDispatch, useSelector } from "react-redux";
import {
  consumeItem,
  selectPokemon,
  updateSpecificPokemon,
} from "../state/gameSlice";
import { getPokemonStats } from "./use-pokemon-stats";
import { showActionOnPokemon } from "../state/uiSlice";
import { getMoveMetadata } from "./use-move-metadata";

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
  HyperPotion = "hyper-potion", // DONE
  SuperPotion = "super-potion", // DONE
  Potion = "potion", // DONE
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
  Nugget = "nugget", // DONE
  PpUp = "pp-up", // DONE
  PokeDoll = "poke-doll",
  FullHeal = "full-heal",
  Revive = "revive", // DONE
  MaxRevive = "max-revive", // DONE
  GuardSpec = "guard-spec",
  SuperRepel = "super-repel",
  MaxRepel = "max-repel",
  DireHit = "dire-hit",
  Coin = "coin",
  FreshWater = "fresh-water", // DONE
  SodaPop = "soda-pop", // DONE
  Lemondade = "lemonade", // DONE
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
  Ether = "ether", // DONE
  MaxEther = "max-ether", // DONE
  Elixer = "elixer", // DONE
  MaxElixer = "max-elixer", // DONE
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
  cost: number | null;
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
    [ItemType.HyperPotion]: {
      type: ItemType.HyperPotion,
      name: "Hyper Potion",
      countable: true,
      consumable: true,
      usableInBattle: true,
      pokeball: false,
      cost: 1500,
      sellPrice: 750,
      action: () => {
        dispatch(
          showActionOnPokemon((index: number) => {
            dispatch(
              updateSpecificPokemon({
                index,
                pokemon: {
                  ...pokemon[index],
                  hp: Math.min(
                    getPokemonStats(pokemon[index].id, pokemon[index].level).hp,
                    pokemon[index].hp + 200
                  ),
                },
              })
            );
            dispatch(consumeItem(ItemType.HyperPotion));
          })
        );
      },
    },
    [ItemType.SuperPotion]: {
      type: ItemType.SuperPotion,
      name: "Super Potion",
      countable: true,
      consumable: true,
      usableInBattle: true,
      pokeball: false,
      cost: 700,
      sellPrice: 350,
      action: () => {
        dispatch(
          showActionOnPokemon((index: number) => {
            dispatch(
              updateSpecificPokemon({
                index,
                pokemon: {
                  ...pokemon[index],
                  hp: Math.min(
                    getPokemonStats(pokemon[index].id, pokemon[index].level).hp,
                    pokemon[index].hp + 50
                  ),
                },
              })
            );
            dispatch(consumeItem(ItemType.SuperPotion));
          })
        );
      },
    },
    [ItemType.Potion]: {
      type: ItemType.Potion,
      name: "Potion",
      countable: true,
      consumable: true,
      usableInBattle: true,
      pokeball: false,
      cost: 300,
      sellPrice: 150,
      action: () => {
        dispatch(
          showActionOnPokemon((index: number) => {
            dispatch(
              updateSpecificPokemon({
                index,
                pokemon: {
                  ...pokemon[index],
                  hp: Math.min(
                    getPokemonStats(pokemon[index].id, pokemon[index].level).hp,
                    pokemon[index].hp + 20
                  ),
                },
              })
            );
            dispatch(consumeItem(ItemType.Potion));
          })
        );
      },
    },
    [ItemType.Nugget]: {
      type: ItemType.Nugget,
      name: "Nugget",
      countable: true,
      consumable: false,
      usableInBattle: false,
      pokeball: false,
      cost: null,
      sellPrice: 5000,
      action: () => {},
    },
    [ItemType.PpUp]: {
      type: ItemType.PpUp,
      name: "PP Up",
      countable: true,
      consumable: true,
      usableInBattle: true,
      pokeball: false,
      cost: null,
      sellPrice: 0,
      action: () => {
        dispatch(
          showActionOnPokemon((index: number) => {
            dispatch(
              updateSpecificPokemon({
                index,
                pokemon: {
                  ...pokemon[index],
                  moves: pokemon[index].moves.map((move) => ({
                    ...move,
                    pp: Math.min(
                      getMoveMetadata(move.name).pp || 0,
                      Math.round(
                        move.pp + (getMoveMetadata(move.name).pp || 0) * 0.2
                      )
                    ),
                  })),
                },
              })
            );
            dispatch(consumeItem(ItemType.PpUp));
          })
        );
      },
    },
    [ItemType.Revive]: {
      type: ItemType.Revive,
      name: "Revive",
      countable: true,
      consumable: true,
      usableInBattle: true,
      pokeball: false,
      cost: 1500,
      sellPrice: 750,
      action: () => {
        dispatch(
          showActionOnPokemon((index: number) => {
            dispatch(
              updateSpecificPokemon({
                index,
                pokemon: {
                  ...pokemon[index],
                  hp: Math.round(
                    getPokemonStats(pokemon[index].id, pokemon[index].level)
                      .hp * 0.5
                  ),
                },
              })
            );
            dispatch(consumeItem(ItemType.Revive));
          })
        );
      },
    },
    [ItemType.MaxRevive]: {
      type: ItemType.MaxRevive,
      name: "Max Revive",
      countable: true,
      consumable: true,
      usableInBattle: true,
      pokeball: false,
      cost: null,
      sellPrice: 2000,
      action: () => {
        dispatch(
          showActionOnPokemon((index: number) => {
            dispatch(
              updateSpecificPokemon({
                index,
                pokemon: {
                  ...pokemon[index],
                  hp: Math.round(
                    getPokemonStats(pokemon[index].id, pokemon[index].level).hp
                  ),
                },
              })
            );
            dispatch(consumeItem(ItemType.MaxRevive));
          })
        );
      },
    },
    [ItemType.FreshWater]: {
      type: ItemType.FreshWater,
      name: "Fresh Water",
      countable: true,
      consumable: true,
      usableInBattle: true,
      pokeball: false,
      cost: 200,
      sellPrice: 100,
      action: () => {
        dispatch(
          showActionOnPokemon((index: number) => {
            dispatch(
              updateSpecificPokemon({
                index,
                pokemon: {
                  ...pokemon[index],
                  hp: Math.min(
                    getPokemonStats(pokemon[index].id, pokemon[index].level).hp,
                    pokemon[index].hp + 50
                  ),
                },
              })
            );
            dispatch(consumeItem(ItemType.FreshWater));
          })
        );
      },
    },
    [ItemType.SodaPop]: {
      type: ItemType.SodaPop,
      name: "Soda Pop",
      countable: true,
      consumable: true,
      usableInBattle: true,
      pokeball: false,
      cost: 300,
      sellPrice: 150,
      action: () => {
        dispatch(
          showActionOnPokemon((index: number) => {
            dispatch(
              updateSpecificPokemon({
                index,
                pokemon: {
                  ...pokemon[index],
                  hp: Math.min(
                    getPokemonStats(pokemon[index].id, pokemon[index].level).hp,
                    pokemon[index].hp + 60
                  ),
                },
              })
            );
            dispatch(consumeItem(ItemType.SodaPop));
          })
        );
      },
    },
    [ItemType.Lemondade]: {
      type: ItemType.Lemondade,
      name: "Lemondade",
      countable: true,
      consumable: true,
      usableInBattle: true,
      pokeball: false,
      cost: 350,
      sellPrice: 175,
      action: () => {
        dispatch(
          showActionOnPokemon((index: number) => {
            dispatch(
              updateSpecificPokemon({
                index,
                pokemon: {
                  ...pokemon[index],
                  hp: Math.min(
                    getPokemonStats(pokemon[index].id, pokemon[index].level).hp,
                    pokemon[index].hp + 80
                  ),
                },
              })
            );
            dispatch(consumeItem(ItemType.Lemondade));
          })
        );
      },
    },
    [ItemType.Ether]: {
      type: ItemType.Ether,
      name: "Ether",
      countable: true,
      consumable: true,
      usableInBattle: true,
      pokeball: false,
      cost: null,
      sellPrice: 0,
      action: () => {
        dispatch(
          showActionOnPokemon((index: number) => {
            dispatch(
              updateSpecificPokemon({
                index,
                pokemon: {
                  ...pokemon[index],
                  moves: pokemon[index].moves.map((move) => ({
                    ...move,
                    pp: Math.min(
                      getMoveMetadata(move.name).pp || 0,
                      Math.round(move.pp + 10)
                    ),
                  })),
                },
              })
            );
          })
        );
        dispatch(consumeItem(ItemType.Ether));
      },
    },
    [ItemType.MaxEther]: {
      type: ItemType.MaxEther,
      name: "Max Ether",
      countable: true,
      consumable: true,
      usableInBattle: true,
      pokeball: false,
      cost: null,
      sellPrice: 0,
      action: () => {
        dispatch(
          showActionOnPokemon((index: number) => {
            dispatch(
              updateSpecificPokemon({
                index,
                pokemon: {
                  ...pokemon[index],
                  moves: pokemon[index].moves.map((move) => ({
                    ...move,
                    pp: getMoveMetadata(move.name).pp || 0,
                  })),
                },
              })
            );
          })
        );
        dispatch(consumeItem(ItemType.MaxEther));
      },
    },
    [ItemType.Elixer]: {
      type: ItemType.Elixer,
      name: "Elixer",
      countable: true,
      consumable: true,
      usableInBattle: true,
      pokeball: false,
      cost: null,
      sellPrice: 0,
      action: () => {
        dispatch(
          showActionOnPokemon((index: number) => {
            dispatch(
              updateSpecificPokemon({
                index,
                pokemon: {
                  ...pokemon[index],
                  moves: pokemon[index].moves.map((move) => ({
                    ...move,
                    pp: Math.min(
                      getMoveMetadata(move.name).pp || 0,
                      Math.round(move.pp + 10)
                    ),
                  })),
                },
              })
            );
          })
        );
        dispatch(consumeItem(ItemType.Elixer));
      },
    },
    [ItemType.MaxElixer]: {
      type: ItemType.MaxElixer,
      name: "Max Elixer",
      countable: true,
      consumable: true,
      usableInBattle: true,
      pokeball: false,
      cost: null,
      sellPrice: 0,
      action: () => {
        dispatch(
          showActionOnPokemon((index: number) => {
            dispatch(
              updateSpecificPokemon({
                index,
                pokemon: {
                  ...pokemon[index],
                  moves: pokemon[index].moves.map((move) => ({
                    ...move,
                    pp: getMoveMetadata(move.name).pp || 0,
                  })),
                },
              })
            );
          })
        );
        dispatch(consumeItem(ItemType.MaxElixer));
      },
    },
  };
  return data;
};

export default useItemData;
