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
  selectName,
  selectPokemonEncounter,
} from "../state/gameSlice";
import { useState } from "react";
import useItemData, { ItemData } from "../app/use-item-data";
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

  const [selected, setSelected] = useState<ItemData | null>(null);

  return (
    <>
      <Menu
        disabled={!!selected || usingItem || learningMove}
        show={show}
        close={() => dispatch(hideItemsMenu())}
        menuItems={inventory
          .filter(
            (item: InventoryItemType) =>
              item.amount > 0 && !itemData[item.item].badge
          )
          .map((item: InventoryItemType, index) => {
            return {
              label: itemData[item.item].name,
              value: item.amount,
              action: () => setSelected(itemData[item.item]),
            };
          })}
      />
      {selected && (
        <Menu
          disabled={tossing || usingItem}
          show={!!selected}
          close={() => setSelected(null)}
          menuItems={[
            {
              label: "Use",
              action: () => {
                // Can't use
                if (
                  (inBattle && !selected.usableInBattle) ||
                  !selected.consumable ||
                  (selected.pokeball && !inBattle)
                ) {
                  dispatch(
                    showText([
                      `OAK: ${name}! This isn't the`,
                      "time to use that!",
                    ])
                  );
                }

                // Can use
                else {
                  selected.action();
                  setSelected(null);
                }
              },
            },
            {
              label: "Toss",
              action: () => {
                dispatch(
                  showConfirmationMenu({
                    preMessage: `Is it OK to toss ${selected.name}`,
                    postMessage: `${name} tossed ${selected.name}`,
                    confirm: () => dispatch(consumeItem(selected.type)),
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
