import { useDispatch, useSelector } from "react-redux";
import {
  consumeItem,
  selectPokemon,
  updateSpecificPokemon,
} from "../state/gameSlice";
import { getPokemonStats } from "./use-pokemon-stats";
import {
  hideItemsMenu,
  learnMove,
  showActionOnPokemon,
  showEvolution,
  throwPokeball,
} from "../state/uiSlice";
import { getMoveMetadata } from "./use-move-metadata";

export enum ItemType {
  MasterBall = "master-ball", // DONE
  UltraBall = "ultra-ball", // DONE
  GreatBall = "great-ball", // DONE
  PokeBall = "poke-ball", // DONE
  TownMap = "town-map",
  Bicycle = "bicycle",
  SafariBall = "safari-ball",
  Pokedex = "pokedex",
  MoonStone = "moon-stone", // DONE
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
  BoulderBadge = "boulder-badge", // DONE
  CascadeBadge = "cascade-badge", // DONE
  ThunderBadge = "thunder-badge", // DONE
  RainbowBadge = "rainbow-badge", // DONE
  SoulBadge = "soul-badge", // DONE
  MarshBadge = "marsh-badge", // DONE
  VolcanoBadge = "volcano-badge", // DONE
  EarthBadge = "earth-badge", // DONE
  EscapeRope = "escape-rope",
  Repel = "repel",
  OldAmber = "old-amber",
  FireStone = "fire-stone", // DONE
  ThunderStone = "thunder-stone", // DONE
  WaterStone = "water-stone", // DONE
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
  LeafStone = "leaf-stone", // DONE
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
  Hm01 = "hm01", // DONE
  Hm02 = "hm02", // DONE
  Hm03 = "hm03", // DONE
  Hm04 = "hm04", // DONE
  Hm05 = "hm05", // DONE
  Tm01 = "tm01", // DONE
  Tm02 = "tm02", // DONE
  Tm03 = "tm03", // DONE
  Tm04 = "tm04", // DONE
  Tm05 = "tm05", // DONE
  Tm06 = "tm06", // DONE
  Tm07 = "tm07", // DONE
  Tm08 = "tm08", // DONE
  Tm09 = "tm09", // DONE
  Tm10 = "tm10", // DONE
  Tm11 = "tm11", // DONE
  Tm12 = "tm12", // DONE
  Tm13 = "tm13", // DONE
  Tm14 = "tm14", // DONE
  Tm15 = "tm15", // DONE
  Tm16 = "tm16", // DONE
  Tm17 = "tm17", // DONE
  Tm18 = "tm18", // DONE
  Tm19 = "tm19", // DONE
  Tm20 = "tm20", // DONE
  Tm21 = "tm21", // DONE
  Tm22 = "tm22", // DONE
  Tm23 = "tm23", // DONE
  Tm24 = "tm24", // DONE
  Tm25 = "tm25", // DONE
  Tm26 = "tm26", // DONE
  Tm27 = "tm27", // DONE
  Tm28 = "tm28", // DONE
  Tm29 = "tm29", // DONE
  Tm30 = "tm30", // DONE
  Tm31 = "tm31", // DONE
  Tm32 = "tm32", // DONE
  Tm33 = "tm33", // DONE
  Tm34 = "tm34", // DONE
  Tm35 = "tm35", // DONE
  Tm36 = "tm36", // DONE
  Tm37 = "tm37", // DONE
  Tm38 = "tm38", // DONE
  Tm39 = "tm39", // DONE
  Tm40 = "tm40", // DONE
  Tm41 = "tm41", // DONE
  Tm42 = "tm42", // DONE
  Tm43 = "tm43", // DONE
  Tm44 = "tm44", // DONE
  Tm45 = "tm45", // DONE
  Tm46 = "tm46", // DONE
  Tm47 = "tm47", // DONE
  Tm48 = "tm48", // DONE
  Tm49 = "tm49", // DONE
  Tm50 = "tm50", // DONE
  Tm51 = "tm51", // DONE
  Tm52 = "tm52", // DONE
  Tm53 = "tm53", // DONE
  Tm54 = "tm54", // DONE
  Tm55 = "tm55", // DONE
}

export interface ItemData {
  type: ItemType;
  name: string;
  countable: boolean;
  consumable: boolean;
  usableInBattle: boolean;
  badge: boolean;
  pokeball: boolean;
  cost: number | null;
  sellPrice: number | null;
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
      badge: false,
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
      badge: false,
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
      badge: false,
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
      badge: false,
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
      badge: false,
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
      badge: false,
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
                      getMoveMetadata(move.id).pp || 0,
                      Math.round(
                        move.pp + (getMoveMetadata(move.id).pp || 0) * 0.2
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
      badge: false,
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
      badge: false,
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
      badge: false,
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
      badge: false,
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
      badge: false,
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
      badge: false,
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
                      getMoveMetadata(move.id).pp || 0,
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
      badge: false,
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
                    pp: getMoveMetadata(move.id).pp || 0,
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
      badge: false,
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
                      getMoveMetadata(move.id).pp || 0,
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
      badge: false,
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
                    pp: getMoveMetadata(move.id).pp || 0,
                  })),
                },
              })
            );
          })
        );
        dispatch(consumeItem(ItemType.MaxElixer));
      },
    },
    [ItemType.MoonStone]: {
      type: ItemType.MoonStone,
      name: "Moon Stone",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 0,
      action: () => {
        const EVOLUTIONS: Record<number, number> = {
          30: 31,
          33: 34,
          35: 36,
          39: 40,
        };

        dispatch(
          showActionOnPokemon((index: number) => {
            const pokemonId = pokemon[index].id;
            const evolveToId = EVOLUTIONS[pokemonId];
            if (!evolveToId) return;
            dispatch(
              showEvolution({
                index,
                evolveToId,
              })
            );
            dispatch(consumeItem(ItemType.MoonStone));
          })
        );
      },
    },
    [ItemType.LeafStone]: {
      type: ItemType.LeafStone,
      name: "Leaf Stone",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: 2100,
      sellPrice: 1050,
      action: () => {
        const EVOLUTIONS: Record<number, number> = {
          44: 45,
          70: 71,
          102: 103,
        };

        dispatch(
          showActionOnPokemon((index: number) => {
            const pokemonId = pokemon[index].id;
            const evolveToId = EVOLUTIONS[pokemonId];
            if (!evolveToId) return;
            dispatch(
              showEvolution({
                index,
                evolveToId,
              })
            );
            dispatch(consumeItem(ItemType.LeafStone));
          })
        );
      },
    },
    [ItemType.FireStone]: {
      type: ItemType.FireStone,
      name: "Fire Stone",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: 2100,
      sellPrice: 1050,
      action: () => {
        const EVOLUTIONS: Record<number, number> = {
          37: 38,
          58: 59,
          133: 136,
        };

        dispatch(
          showActionOnPokemon((index: number) => {
            const pokemonId = pokemon[index].id;
            const evolveToId = EVOLUTIONS[pokemonId];
            if (!evolveToId) return;
            dispatch(
              showEvolution({
                index,
                evolveToId,
              })
            );
            dispatch(consumeItem(ItemType.FireStone));
          })
        );
      },
    },
    [ItemType.WaterStone]: {
      type: ItemType.WaterStone,
      name: "Water Stone",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: 2100,
      sellPrice: 1050,
      action: () => {
        const EVOLUTIONS: Record<number, number> = {
          61: 62,
          90: 91,
          120: 121,
          133: 134,
        };

        dispatch(
          showActionOnPokemon((index: number) => {
            const pokemonId = pokemon[index].id;
            const evolveToId = EVOLUTIONS[pokemonId];
            if (!evolveToId) return;
            dispatch(
              showEvolution({
                index,
                evolveToId,
              })
            );
            dispatch(consumeItem(ItemType.WaterStone));
          })
        );
      },
    },
    [ItemType.ThunderStone]: {
      type: ItemType.ThunderStone,
      name: "Thunder Stone",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: 2100,
      sellPrice: 1050,
      action: () => {
        const EVOLUTIONS: Record<number, number> = {
          25: 26,
          133: 135,
        };

        dispatch(
          showActionOnPokemon((index: number) => {
            const pokemonId = pokemon[index].id;
            const evolveToId = EVOLUTIONS[pokemonId];
            if (!evolveToId) return;
            dispatch(
              showEvolution({
                index,
                evolveToId,
              })
            );
            dispatch(consumeItem(ItemType.ThunderStone));
          })
        );
      },
    },
    [ItemType.MasterBall]: {
      type: ItemType.MasterBall,
      name: "Master Ball",
      countable: true,
      consumable: true,
      usableInBattle: true,
      pokeball: true,
      badge: false,
      cost: null,
      sellPrice: 0,
      action: () => {
        dispatch(hideItemsMenu());
        dispatch(throwPokeball(ItemType.MasterBall));
        dispatch(consumeItem(ItemType.MasterBall));
      },
    },
    [ItemType.UltraBall]: {
      type: ItemType.UltraBall,
      name: "Ultra Ball",
      countable: true,
      consumable: true,
      usableInBattle: true,
      pokeball: true,
      badge: false,
      cost: 1200,
      sellPrice: 600,
      action: () => {
        dispatch(hideItemsMenu());
        dispatch(throwPokeball(ItemType.UltraBall));
        dispatch(consumeItem(ItemType.UltraBall));
      },
    },
    [ItemType.GreatBall]: {
      type: ItemType.GreatBall,
      name: "Great Ball",
      countable: true,
      consumable: true,
      usableInBattle: true,
      pokeball: true,
      badge: false,
      cost: 600,
      sellPrice: 300,
      action: () => {
        dispatch(hideItemsMenu());
        dispatch(throwPokeball(ItemType.GreatBall));
        dispatch(consumeItem(ItemType.GreatBall));
      },
    },
    [ItemType.PokeBall]: {
      type: ItemType.PokeBall,
      name: "Poke Ball",
      countable: true,
      consumable: true,
      usableInBattle: true,
      pokeball: true,
      badge: false,
      cost: 200,
      sellPrice: 100,
      action: () => {
        dispatch(hideItemsMenu());
        dispatch(throwPokeball(ItemType.PokeBall));
        dispatch(consumeItem(ItemType.PokeBall));
      },
    },
    [ItemType.BoulderBadge]: {
      type: ItemType.BoulderBadge,
      name: "Boulder Badge",
      countable: false,
      consumable: false,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 0,
      action: () => {},
    },
    [ItemType.CascadeBadge]: {
      type: ItemType.CascadeBadge,
      name: "Cascade Badge",
      countable: false,
      consumable: false,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 0,
      action: () => {},
    },
    [ItemType.ThunderBadge]: {
      type: ItemType.ThunderBadge,
      name: "Thunder Badge",
      countable: false,
      consumable: false,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 0,
      action: () => {},
    },
    [ItemType.RainbowBadge]: {
      type: ItemType.RainbowBadge,
      name: "Rainbow Badge",
      countable: false,
      consumable: false,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 0,
      action: () => {},
    },
    [ItemType.SoulBadge]: {
      type: ItemType.SoulBadge,
      name: "Soul Badge",
      countable: false,
      consumable: false,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 0,
      action: () => {},
    },
    [ItemType.MarshBadge]: {
      type: ItemType.MarshBadge,
      name: "Marsh Badge",
      countable: false,
      consumable: false,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 0,
      action: () => {},
    },
    [ItemType.VolcanoBadge]: {
      type: ItemType.VolcanoBadge,
      name: "Volcano Badge",
      countable: false,
      consumable: false,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 0,
      action: () => {},
    },
    [ItemType.EarthBadge]: {
      type: ItemType.EarthBadge,
      name: "Earth Badge",
      countable: false,
      consumable: false,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 0,
      action: () => {},
    },
    [ItemType.Tm01]: {
      type: ItemType.Tm01,
      name: "TM01",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: 3000,
      sellPrice: 1500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM01",
            move: "mega-punch",
            consume: true,
            item: ItemType.Tm01,
          })
        );
      },
    },
    [ItemType.Tm02]: {
      type: ItemType.Tm02,
      name: "TM02",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: 2000,
      sellPrice: 1000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM02",
            move: "razor-wind",
            consume: true,
            item: ItemType.Tm02,
          })
        );
      },
    },
    [ItemType.Tm03]: {
      type: ItemType.Tm03,
      name: "TM03",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 1000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM03",
            move: "swords-dance",
            consume: true,
            item: ItemType.Tm03,
          })
        );
      },
    },
    [ItemType.Tm04]: {
      type: ItemType.Tm04,
      name: "TM04",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM04",
            move: "whirlwind",
            consume: true,
            item: ItemType.Tm04,
          })
        );
      },
    },
    [ItemType.Tm05]: {
      type: ItemType.Tm05,
      name: "TM05",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: 3000,
      sellPrice: 1500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM05",
            move: "mega-kick",
            consume: true,
            item: ItemType.Tm05,
          })
        );
      },
    },
    [ItemType.Tm06]: {
      type: ItemType.Tm06,
      name: "TM06",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 2000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM06",
            move: "toxic",
            consume: true,
            item: ItemType.Tm06,
          })
        );
      },
    },
    [ItemType.Tm07]: {
      type: ItemType.Tm07,
      name: "TM07",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: 2000,
      sellPrice: 1000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM07",
            move: "horn-drill",
            consume: true,
            item: ItemType.Tm07,
          })
        );
      },
    },
    [ItemType.Tm08]: {
      type: ItemType.Tm08,
      name: "TM08",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 2000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM08",
            move: "body-slam",
            consume: true,
            item: ItemType.Tm08,
          })
        );
      },
    },
    [ItemType.Tm09]: {
      type: ItemType.Tm09,
      name: "TM09",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: 3000,
      sellPrice: 1500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM09",
            move: "take-down",
            consume: true,
            item: ItemType.Tm09,
          })
        );
      },
    },
    [ItemType.Tm10]: {
      type: ItemType.Tm10,
      name: "TM10",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 2000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM10",
            move: "double-edge",
            consume: true,
            item: ItemType.Tm10,
          })
        );
      },
    },
    [ItemType.Tm11]: {
      type: ItemType.Tm11,
      name: "TM11",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 1000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM11",
            move: "bubble-beam",
            consume: true,
            item: ItemType.Tm11,
          })
        );
      },
    },
    [ItemType.Tm12]: {
      type: ItemType.Tm12,
      name: "TM12",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM12",
            move: "water-gun",
            consume: true,
            item: ItemType.Tm12,
          })
        );
      },
    },
    [ItemType.Tm13]: {
      type: ItemType.Tm13,
      name: "TM13",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 2000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM13",
            move: "ice-beam",
            consume: true,
            item: ItemType.Tm13,
          })
        );
      },
    },
    [ItemType.Tm14]: {
      type: ItemType.Tm14,
      name: "TM14",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 2500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM14",
            move: "blizzard",
            consume: true,
            item: ItemType.Tm14,
          })
        );
      },
    },
    [ItemType.Tm15]: {
      type: ItemType.Tm15,
      name: "TM15",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 2500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM15",
            move: "hyper-beam",
            consume: true,
            item: ItemType.Tm15,
          })
        );
      },
    },
    [ItemType.Tm16]: {
      type: ItemType.Tm16,
      name: "TM16",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 2500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM16",
            move: "pay-day",
            consume: true,
            item: ItemType.Tm16,
          })
        );
      },
    },
    [ItemType.Tm17]: {
      type: ItemType.Tm17,
      name: "TM17",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: 3000,
      sellPrice: 1500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM17",
            move: "submission",
            consume: true,
            item: ItemType.Tm17,
          })
        );
      },
    },
    [ItemType.Tm18]: {
      type: ItemType.Tm18,
      name: "TM18",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 1000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM18",
            move: "counter",
            consume: true,
            item: ItemType.Tm18,
          })
        );
      },
    },
    [ItemType.Tm19]: {
      type: ItemType.Tm19,
      name: "TM19",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 1500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM19",
            move: "seismic-toss",
            consume: true,
            item: ItemType.Tm19,
          })
        );
      },
    },
    [ItemType.Tm20]: {
      type: ItemType.Tm20,
      name: "TM20",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 1000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM20",
            move: "rage",
            consume: true,
            item: ItemType.Tm20,
          })
        );
      },
    },
    [ItemType.Tm21]: {
      type: ItemType.Tm21,
      name: "TM21",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 2500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM21",
            move: "mega-drain",
            consume: true,
            item: ItemType.Tm21,
          })
        );
      },
    },
    [ItemType.Tm22]: {
      type: ItemType.Tm22,
      name: "TM22",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 2500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM22",
            move: "solar-beam",
            consume: true,
            item: ItemType.Tm22,
          })
        );
      },
    },
    [ItemType.Tm23]: {
      type: ItemType.Tm23,
      name: "TM23",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 2500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM23",
            move: "dragon-rage",
            consume: true,
            item: ItemType.Tm23,
          })
        );
      },
    },
    [ItemType.Tm24]: {
      type: ItemType.Tm24,
      name: "TM24",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 1000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM24",
            move: "thunderbolt",
            consume: true,
            item: ItemType.Tm24,
          })
        );
      },
    },
    [ItemType.Tm25]: {
      type: ItemType.Tm25,
      name: "TM25",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 2500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM25",
            move: "thunder",
            consume: true,
            item: ItemType.Tm25,
          })
        );
      },
    },
    [ItemType.Tm26]: {
      type: ItemType.Tm26,
      name: "TM26",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 2000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM26",
            move: "earthquake",
            consume: true,
            item: ItemType.Tm26,
          })
        );
      },
    },
    [ItemType.Tm27]: {
      type: ItemType.Tm27,
      name: "TM27",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 2500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM27",
            move: "fissure",
            consume: true,
            item: ItemType.Tm27,
          })
        );
      },
    },
    [ItemType.Tm28]: {
      type: ItemType.Tm28,
      name: "TM28",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 1000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM28",
            move: "dig",
            consume: true,
            item: ItemType.Tm28,
          })
        );
      },
    },
    [ItemType.Tm29]: {
      type: ItemType.Tm29,
      name: "TM29",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 2000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM29",
            move: "psychic",
            consume: true,
            item: ItemType.Tm29,
          })
        );
      },
    },
    [ItemType.Tm30]: {
      type: ItemType.Tm30,
      name: "TM30",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM30",
            move: "teleport",
            consume: true,
            item: ItemType.Tm30,
          })
        );
      },
    },
    [ItemType.Tm31]: {
      type: ItemType.Tm31,
      name: "TM31",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 1000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM31",
            move: "mimic",
            consume: true,
            item: ItemType.Tm31,
          })
        );
      },
    },
    [ItemType.Tm32]: {
      type: ItemType.Tm32,
      name: "TM32",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: 1000,
      sellPrice: 500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM32",
            move: "double-team",
            consume: true,
            item: ItemType.Tm32,
          })
        );
      },
    },
    [ItemType.Tm33]: {
      type: ItemType.Tm33,
      name: "TM33",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: 1000,
      sellPrice: 500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM33",
            move: "reflect",
            consume: true,
            item: ItemType.Tm33,
          })
        );
      },
    },
    [ItemType.Tm34]: {
      type: ItemType.Tm34,
      name: "TM34",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 1000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM34",
            move: "bide",
            consume: true,
            item: ItemType.Tm34,
          })
        );
      },
    },
    [ItemType.Tm35]: {
      type: ItemType.Tm35,
      name: "TM35",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 2000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM35",
            move: "metronome",
            consume: true,
            item: ItemType.Tm35,
          })
        );
      },
    },
    [ItemType.Tm36]: {
      type: ItemType.Tm36,
      name: "TM36",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 1000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM36",
            move: "self-destruct",
            consume: true,
            item: ItemType.Tm36,
          })
        );
      },
    },
    [ItemType.Tm37]: {
      type: ItemType.Tm37,
      name: "TM37",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: 2000,
      sellPrice: 1000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM37",
            move: "egg-bomb",
            consume: true,
            item: ItemType.Tm37,
          })
        );
      },
    },
    [ItemType.Tm38]: {
      type: ItemType.Tm38,
      name: "TM38",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 2500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM38",
            move: "fire-blast",
            consume: true,
            item: ItemType.Tm38,
          })
        );
      },
    },
    [ItemType.Tm39]: {
      type: ItemType.Tm39,
      name: "TM39",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 1000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM39",
            move: "swift",
            consume: true,
            item: ItemType.Tm39,
          })
        );
      },
    },
    [ItemType.Tm40]: {
      type: ItemType.Tm40,
      name: "TM40",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 2000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM40",
            move: "skull-bash",
            consume: true,
            item: ItemType.Tm40,
          })
        );
      },
    },
    [ItemType.Tm41]: {
      type: ItemType.Tm41,
      name: "TM41",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 1000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM41",
            move: "soft-boiled",
            consume: true,
            item: ItemType.Tm41,
          })
        );
      },
    },
    [ItemType.Tm42]: {
      type: ItemType.Tm42,
      name: "TM42",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 1000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM42",
            move: "dream-eater",
            consume: true,
            item: ItemType.Tm42,
          })
        );
      },
    },
    [ItemType.Tm43]: {
      type: ItemType.Tm43,
      name: "TM43",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 2500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM43",
            move: "sky-attack",
            consume: true,
            item: ItemType.Tm43,
          })
        );
      },
    },
    [ItemType.Tm44]: {
      type: ItemType.Tm44,
      name: "TM44",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 1000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM44",
            move: "rest",
            consume: true,
            item: ItemType.Tm44,
          })
        );
      },
    },
    [ItemType.Tm45]: {
      type: ItemType.Tm45,
      name: "TM45",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 1000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM45",
            move: "thunder-wave",
            consume: true,
            item: ItemType.Tm45,
          })
        );
      },
    },
    [ItemType.Tm46]: {
      type: ItemType.Tm46,
      name: "TM46",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 2000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM46",
            move: "psywave",
            consume: true,
            item: ItemType.Tm46,
          })
        );
      },
    },
    [ItemType.Tm47]: {
      type: ItemType.Tm47,
      name: "TM47",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: false,
      cost: null,
      sellPrice: 1500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM47",
            move: "explosion",
            consume: true,
            item: ItemType.Tm47,
          })
        );
      },
    },
    [ItemType.Tm48]: {
      type: ItemType.Tm48,
      name: "TM48",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 2000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM48",
            move: "rock-slide",
            consume: true,
            item: ItemType.Tm48,
          })
        );
      },
    },
    [ItemType.Tm49]: {
      type: ItemType.Tm49,
      name: "TM49",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: 2000,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM49",
            move: "tri-attack",
            consume: true,
            item: ItemType.Tm49,
          })
        );
      },
    },
    [ItemType.Tm50]: {
      type: ItemType.Tm50,
      name: "TM50",
      countable: true,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: 1000,
      sellPrice: 500,
      action: () => {
        dispatch(
          learnMove({
            itemName: "TM50",
            move: "substitute",
            consume: true,
            item: ItemType.Tm50,
          })
        );
      },
    },
    [ItemType.Hm01]: {
      type: ItemType.Hm01,
      name: "HM1",
      countable: false,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: null,
      action: () => {
        dispatch(
          learnMove({
            itemName: "HM1",
            move: "cut",
            consume: false,
            item: ItemType.Hm01,
          })
        );
      },
    },
    [ItemType.Hm02]: {
      type: ItemType.Hm02,
      name: "HM2",
      countable: false,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: null,
      action: () => {
        dispatch(
          learnMove({
            itemName: "HM2",
            move: "fly",
            consume: false,
            item: ItemType.Hm02,
          })
        );
      },
    },
    [ItemType.Hm03]: {
      type: ItemType.Hm03,
      name: "HM3",
      countable: false,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: null,
      action: () => {
        dispatch(
          learnMove({
            itemName: "HM3",
            move: "surf",
            consume: false,
            item: ItemType.Hm03,
          })
        );
      },
    },
    [ItemType.Hm04]: {
      type: ItemType.Hm04,
      name: "HM4",
      countable: false,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: null,
      action: () => {
        dispatch(
          learnMove({
            itemName: "HM4",
            move: "strength",
            consume: false,
            item: ItemType.Hm04,
          })
        );
      },
    },
    [ItemType.Hm05]: {
      type: ItemType.Hm05,
      name: "HM5",
      countable: false,
      consumable: true,
      usableInBattle: false,
      pokeball: false,
      badge: true,
      cost: null,
      sellPrice: null,
      action: () => {
        dispatch(
          learnMove({
            itemName: "HM5",
            move: "flash",
            consume: false,
            item: ItemType.Hm05,
          })
        );
      },
    },
  };
  return data;
};

export default useItemData;
