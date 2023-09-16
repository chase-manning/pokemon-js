import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu";
import { hideItemsMenu, selectItemsMenu, showText } from "../state/uiSlice";
import {
  InventoryItemType,
  removeInventory,
  selectInventory,
  selectName,
} from "../state/gameSlice";
import { useState } from "react";
import ConfirmationMenu from "./ConfirmationMenu";

const ItemsMenu = () => {
  const dispatch = useDispatch();
  const show = useSelector(selectItemsMenu);
  const inventory = useSelector(selectInventory);
  const name = useSelector(selectName);

  const [selected, setSelected] = useState<number | null>(null);
  const [tossing, setTossing] = useState(false);

  return (
    <>
      <Menu
        disabled={selected !== null}
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
      <Menu
        disabled={tossing}
        show={selected !== null}
        close={() => setSelected(null)}
        menuItems={[
          {
            label: "Use",
            action: () =>
              dispatch(
                showText([`OAK: ${name}! This isn't the`, "time to use that!"])
              ),
          },
          {
            label: "Toss",
            action: () => setTossing(true),
          },
        ]}
      />
      {selected !== null && (
        <ConfirmationMenu
          show={tossing}
          preMessage={`Is it OK to toss ${inventory[selected].item}`}
          postMessage={`${name} tossed ${inventory[selected].item}`}
          confirm={() => dispatch(removeInventory(inventory[selected]))}
          cancel={() => setTossing(false)}
        />
      )}
    </>
  );
};

export default ItemsMenu;
