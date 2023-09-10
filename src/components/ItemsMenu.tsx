import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu";
import { hideItemsMenu, selectItemsMenu } from "../state/uiSlice";
import { InventoryItemType, selectInventory } from "../state/gameSlice";

const ItemsMenu = () => {
  const dispatch = useDispatch();
  const show = useSelector(selectItemsMenu);
  const inventory = useSelector(selectInventory);

  return (
    <Menu
      show={show}
      close={() => dispatch(hideItemsMenu())}
      menuItems={inventory.map((item: InventoryItemType) => {
        return {
          label: item.item,
          value: item.amount,
          action: () => console.log(item.item),
        };
      })}
    />
  );
};

export default ItemsMenu;
