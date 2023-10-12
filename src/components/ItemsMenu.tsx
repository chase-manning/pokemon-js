import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu";
import {
  hideItemsMenu,
  selectActionOnPokemon,
  selectConfirmationMenu,
  selectItemsMenu,
  selectLearningMove,
  showConfirmationMenu,
  showText,
} from "../state/uiSlice";
import {
  consumeItem,
  selectInventory,
  selectIsTeleporting,
  selectMap,
  selectName,
  selectPokemonEncounter,
} from "../state/gameSlice";
import { useState } from "react";
import useItemData, { ItemType } from "../app/use-item-data";
import { InventoryItemType } from "../state/state-types";

const ItemsMenu = () => {
  const dispatch = useDispatch();
  const show = useSelector(selectItemsMenu);
  const inventory = useSelector(selectInventory);
  const name = useSelector(selectName);
  const inBattle = !!useSelector(selectPokemonEncounter);
  const itemData = useItemData();
  const usingItem = !!useSelector(selectActionOnPokemon);
  const learningMove = !!useSelector(selectLearningMove);
  const tossing = !!useSelector(selectConfirmationMenu);
  const map = useSelector(selectMap);
  const isTeleporting = useSelector(selectIsTeleporting);

  const [selected, setSelected] = useState<number | null>(null);

  const item = selected !== null ? itemData[inventory[selected].item] : null;

  return (
    <>
      <Menu
        disabled={selected !== null || usingItem || learningMove}
        show={show}
        close={() => dispatch(hideItemsMenu())}
        menuItems={inventory
          .filter(
            (item: InventoryItemType) =>
              item.amount > 0 && !itemData[item.item].badge
          )
          .map((item: InventoryItemType, index) => {
            return {
              label: item.item,
              value: item.amount,
              action: () => setSelected(index),
            };
          })}
      />
      {item && selected !== null && (
        <Menu
          disabled={tossing || usingItem}
          show={selected !== null}
          close={() => setSelected(null)}
          menuItems={[
            {
              label: "Use",
              action: () => {
                // Can't use
                if (
                  (inBattle && !item.usableInBattle) ||
                  !item.consumable ||
                  (item.pokeball && !inBattle) ||
                  (item.type === ItemType.PikachuDoll &&
                    !map.town &&
                    !isTeleporting)
                ) {
                  dispatch(
                    showText([
                      `CHASE: ${name}! This isn't the`,
                      "time to use that!",
                    ])
                  );
                }

                // Can use
                else {
                  item.action();
                  setSelected(null);
                }
              },
            },
            {
              label: "Toss",
              action: () => {
                dispatch(
                  showConfirmationMenu({
                    preMessage: `Is it OK to toss ${inventory[selected].item}`,
                    postMessage: `${name} tossed ${inventory[selected].item}`,
                    confirm: () =>
                      dispatch(consumeItem(inventory[selected].item)),
                  })
                );
              },
            },
          ]}
        />
      )}
    </>
  );
};

export default ItemsMenu;
