import styled from "styled-components";

import PixelImage from "../styles/PixelImage";
import { xToPx, yToPx } from "../app/position-helper";
import pokeball from "../assets/misc/pokeball.png";
import { MapItemType } from "../maps/map-types";
import useEvent from "../app/use-event";
import { Event } from "../app/emitter";
import { useDispatch, useSelector } from "react-redux";
import {
  addInventory,
  collectItem,
  selectCollectedItems,
  selectDirection,
  selectMapId,
  selectName,
  selectPos,
} from "../state/gameSlice";
import { selectStartMenu, showTextThenAction } from "../state/uiSlice";
import { directionModifier } from "../app/map-helper";
import useItemData from "../app/use-item-data";

interface ItemProps {
  x: number;
  y: number;
}

const StyledItem = styled.div<ItemProps>`
  position: absolute;
  top: ${(props) => yToPx(props.y)};
  left: ${(props) => xToPx(props.x)};
  transform: translateY(-20%);
`;

const Sprite = styled(PixelImage)`
  width: ${xToPx(1)};
`;

interface Props {
  item: MapItemType;
}

const Item = ({ item }: Props) => {
  const dispatch = useDispatch();
  const collectedItems = useSelector(selectCollectedItems);
  const mapId = useSelector(selectMapId);
  const startMenuOpen = useSelector(selectStartMenu);
  const facing = useSelector(selectDirection);
  const pos = useSelector(selectPos);
  const name = useSelector(selectName);
  const itemData = useItemData();

  const itemId = `${mapId}-${item.pos.x}-${item.pos.y}`;

  const isCollected = collectedItems.includes(itemId);

  useEvent(Event.A, () => {
    if (isCollected) return;
    if (startMenuOpen) return;

    const directionMod = directionModifier(facing);

    if (
      item.pos.x === pos.x + directionMod.x &&
      item.pos.y === pos.y + directionMod.y
    ) {
      dispatch(
        showTextThenAction({
          text: [`${name} found ${itemData[item.item].name}!`],
          action: () => {
            dispatch(collectItem(item));
            dispatch(addInventory({ item: item.item, amount: 1 }));
          },
        })
      );
    }
  });

  if (isCollected || item.hidden) return null;

  return (
    <StyledItem x={item.pos.x} y={item.pos.y}>
      <Sprite src={pokeball} />
    </StyledItem>
  );
};

export default Item;
