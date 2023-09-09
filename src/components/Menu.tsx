import { useState } from "react";
import styled from "styled-components";
import { Event } from "../app/emitter";
import useEvent from "../app/use-event";

const StyledMenu = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  background: white;
`;

interface MenuItemType {
  label: string;
  action: () => void;
}

interface Props {
  show: boolean;
  menuItems: MenuItemType[];
  close: () => void;
}

const Menu = ({ show, menuItems, close }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEvent(Event.Up, () => {
    if (!show) return;
    setActiveIndex((prev) => {
      if (prev === 0) return prev;
      return prev - 1;
    });
  });

  useEvent(Event.Down, () => {
    if (!show) return;
    setActiveIndex((prev) => {
      if (prev === menuItems.length) return prev;
      return prev + 1;
    });
  });

  useEvent(Event.A, () => {
    if (!show) return;
    if (activeIndex < menuItems.length) {
      menuItems[activeIndex].action();
    } else {
      close();
      setActiveIndex(0);
    }
  });

  if (!show) return null;

  return (
    <StyledMenu>
      <ul className="framed buttons">
        {[
          ...menuItems,
          {
            label: "Exit",
            action: close,
          },
        ].map((item: MenuItemType, index: number) => {
          return (
            <li key={item.label}>
              <button className={activeIndex === index ? "active-button" : ""}>
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </StyledMenu>
  );
};

export default Menu;
