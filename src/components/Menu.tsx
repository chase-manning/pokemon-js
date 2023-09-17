import { useState } from "react";
import styled from "styled-components";
import { Event } from "../app/emitter";
import useEvent from "../app/use-event";

interface MenuProps {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  compact?: boolean;
}

const StyledMenu = styled.div<MenuProps>`
  position: absolute;
  z-index: 100;
  background: var(--bg);

  right: ${(props) => (props.right ? props.right : props.left ? "auto" : "0")};
  top: ${(props) => (props.top ? props.top : props.bottom ? "auto" : "50%")};
  left: ${(props) => (props.left ? props.left : "auto")};
  bottom: ${(props) => (props.bottom ? props.bottom : "auto")};
  transform: ${(props) =>
    props.bottom || props.top ? "none" : "translateY(-50%)"};
  width: ${(props) => (props.compact ? "410px" : "auto")};

  @media (max-width: 768px) {
    width: ${(props) => (props.compact ? "130px" : "auto")};
  }
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
  value?: string | number;
  pokemon?: boolean;
}

interface Props {
  show: boolean;
  menuItems: MenuItemType[];
  close: () => void;
  disabled?: boolean;
  noSelect?: boolean;
  noExit?: boolean;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  padding?: string;
  compact?: boolean;
}

const Menu = ({
  show,
  menuItems,
  close,
  disabled,
  noSelect,
  noExit,
  top,
  right,
  bottom,
  left,
  padding,
  compact,
}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // TODO Change to use Arrow component

  useEvent(Event.Up, () => {
    if (disabled) return;
    if (!show) return;

    if (compact) {
      setActiveIndex((prev) => {
        if (prev === 0) return prev;
        if (prev === 1) return prev;
        return prev - 2;
      });
      return;
    }

    setActiveIndex((prev) => {
      if (prev === 0) return prev;
      return prev - 1;
    });
  });

  useEvent(Event.Down, () => {
    if (disabled) return;
    if (!show) return;

    if (compact) {
      setActiveIndex((prev) => {
        if (prev === menuItems.length - 1) return prev;
        if (prev === menuItems.length - 2) return prev;
        return prev + 2;
      });
      return;
    }

    setActiveIndex((prev) => {
      if (prev === menuItems.length) return prev;
      return prev + 1;
    });
  });

  useEvent(Event.Left, () => {
    if (!compact) return;

    setActiveIndex((prev) => {
      if (prev === 0) return prev;
      if (prev === 2) return prev;
      return prev - 1;
    });
  });

  useEvent(Event.Right, () => {
    if (!compact) return;

    setActiveIndex((prev) => {
      if (prev === menuItems.length - 1) return prev;
      if (prev === menuItems.length - 3) return prev;
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

  useEvent(Event.B, () => {
    if (noExit) return;
    if (disabled) return;
    if (!show) return;
    close();
    setActiveIndex(0);
  });

  if (!show) return null;

  return (
    <StyledMenu
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      compact={compact}
    >
      <ul
        className={`framed buttons ${compact ? "compact" : ""}`}
        style={{ width: "100%", paddingRight: padding || "0" }}
      >
        {(noSelect || noExit
          ? menuItems
          : [
              ...menuItems,
              {
                label: "Exit",
                action: close,
              },
            ]
        ).map((item: MenuItemType, index: number) => {
          return (
            <li key={item.label}>
              <Button
                className={`${
                  noSelect
                    ? "no-select-button"
                    : activeIndex === index
                    ? "active-button"
                    : ""
                } ${item.pokemon ? "pokemon" : ""}`}
              >
                {item.label}
                {item.value !== undefined && <Bold>{item.value}</Bold>}
              </Button>
            </li>
          );
        })}
      </ul>
    </StyledMenu>
  );
};

export default Menu;
