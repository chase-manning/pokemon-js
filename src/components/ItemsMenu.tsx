import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu";
import {
  hideItemsMenu,
  selectActionOnPokemon,
  selectItemsMenu,
  showText,
} from "../state/uiSlice";
import {
  InventoryItemType,
  consumeItem,
  selectInventory,
  selectName,
  selectPokemonEncounter,
} from "../state/gameSlice";
import { useState } from "react";
import ConfirmationMenu from "./ConfirmationMenu";
import useItemData from "../app/use-item-data";

const ItemsMenu = () => {
  const dispatch = useDispatch();
  const show = useSelector(selectItemsMenu);
  const inventory = useSelector(selectInventory);
  const name = useSelector(selectName);
  const inBattle = !!useSelector(selectPokemonEncounter);
  const itemData = useItemData();
  const usingItem = !!useSelector(selectActionOnPokemon);

  const [selected, setSelected] = useState<number | null>(null);
  const [tossing, setTossing] = useState(false);

  const item = selected !== null ? itemData[inventory[selected].item] : null;

  return (
    <>
      <Menu
        disabled={selected !== null || usingItem}
        show={show}
        close={() => dispatch(hideItemsMenu())}
        menuItems={inventory
          .filter((item: InventoryItemType) => item.amount > 0)
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
                  (item.pokeball && !inBattle)
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
                  item.action();
                  setSelected(null);
                }
              },
            },
            {
              label: "Toss",
              action: () => setTossing(true),
            },
          ]}
        />
      )}
      {selected !== null && (
        <ConfirmationMenu
          show={tossing}
          preMessage={`Is it OK to toss ${inventory[selected].item}`}
          postMessage={`${name} tossed ${inventory[selected].item}`}
          confirm={() => dispatch(consumeItem(inventory[selected].item))}
          cancel={() => setTossing(false)}
        />
      )}
    </>
  );
};

export default ItemsMenu;
