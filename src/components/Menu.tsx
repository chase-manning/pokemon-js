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

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Bold = styled.div`
  font-weight: bold;
  color: black;
  margin-left: 45px;

  font-size: 3rem;
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1;
    margin-left: 15px;
  }
`;

interface MenuItemType {
  label: string;
  action: () => void;
  value?: number;
}

interface Props {
  show: boolean;
  menuItems: MenuItemType[];
  close: () => void;
  disabled?: boolean;
}

const Menu = ({ show, menuItems, close, disabled }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEvent(Event.Up, () => {
    if (disabled) return;
    if (!show) return;
    setActiveIndex((prev) => {
      if (prev === 0) return prev;
      return prev - 1;
    });
  });

  useEvent(Event.Down, () => {
    if (disabled) return;
    if (!show) return;
    setActiveIndex((prev) => {
      if (prev === menuItems.length) return prev;
      return prev + 1;
    });
  });

  useEvent(Event.A, () => {
    if (disabled) return;
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
              <Button className={activeIndex === index ? "active-button" : ""}>
                {item.label}
                {item.value && <Bold>{item.value}</Bold>}
              </Button>
            </li>
          );
        })}
      </ul>
    </StyledMenu>
  );
};

export default Menu;
