import { useSelector } from "react-redux";
import { selectInventory } from "../state/gameSlice";
import useItemData from "./use-item-data";

const useBadges = () => {
  const inventory = useSelector(selectInventory);
  const itemData = useItemData();

  return inventory.filter(
    (item) => itemData[item.item].badge && item.amount > 0
  );
};

export default useBadges;
