import { useEffect, useState } from "react";
import styled from "styled-components";
import { Event } from "../app/emitter";
import useEvent from "../app/use-event";
import Arrow from "./Arrow";

interface MenuProps {
  $top?: string;
  $right?: string;
  $bottom?: string;
  $left?: string;
  $compact?: boolean;
  $wide?: boolean;
}

const StyledMenu = styled.div<MenuProps>`
  position: absolute;
  z-index: 100;
  background: var(--bg);

  right: ${(props) =>
    props.$right ? props.$right : props.$left ? "auto" : "0"};
  top: ${(props) => (props.$top ? props.$top : props.$bottom ? "auto" : "50%")};
  left: ${(props) => (props.$left ? props.$left : "auto")};
  bottom: ${(props) => (props.$bottom ? props.$bottom : "auto")};
  transform: ${(props) =>
    props.$bottom || props.$top ? "none" : "translateY(-50%)"};
  width: ${(props) =>
    props.$compact ? "410px" : props.$wide ? "100%" : "auto"};

  @media (max-width: 768px) {
    width: ${(props) =>
      props.$compact ? "130px" : props.$wide ? "100%" : "auto"};
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

const ArrowContainer = styled.div`
  position: absolute;
  left: 0;
  top: -1px;

  @media (max-width: 768px) {
    top: auto;
    bottom: -1px;
    left: 1px;
  }
`;

export interface MenuItemType {
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
  noExitOption?: boolean;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  padding?: string;
  compact?: boolean;
  padd?: number;
  tight?: boolean;
  wide?: boolean;
  setHovered?: (index: number) => void;
}

const Menu = ({
  show,
  menuItems,
  close,
  disabled,
  noSelect,
  noExit,
  noExitOption,
  top,
  right,
  bottom,
  left,
  padding,
  compact,
  padd,
  tight,
  wide,
  setHovered,
}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // TODO Change to use Arrow component

  useEffect(() => {
    if (setHovered) setHovered(activeIndex);
  }, [activeIndex, setHovered]);

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
      if (noExit || noExitOption) {
        if (prev === menuItems.length - 1) return prev;
      } else {
        if (prev === menuItems.length) return prev;
      }
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
      $top={top}
      $right={right}
      $bottom={bottom}
      $left={left}
      $compact={compact}
      $wide={wide}
    >
      <ul
        className={`framed buttons ${compact ? "compact" : ""}`}
        style={{ width: "100%", paddingRight: padding || "0" }}
      >
        {(noSelect || noExit || noExitOption
          ? padd
            ? [
                ...menuItems,
                ...Array.from(Array(padd - menuItems.length).keys()).map(
                  (i) => {
                    return {
                      label: "-",
                      action: () => {},
                    };
                  }
                ),
              ]
            : menuItems
          : [
              ...menuItems,
              {
                label: "Exit",
                action: close,
              },
            ]
        ).map((item: MenuItemType, index: number) => {
          return (
            <li key={index}>
              <Button
                className={`${noSelect ? "no-select-button" : ""} ${
                  item.pokemon ? "pokemon" : ""
                }`}
                style={{ margin: tight ? "1px 0" : "" }}
              >
                {item.label}
                {item.value !== undefined && <Bold>{item.value}</Bold>}
                <ArrowContainer>
                  <Arrow
                    disabled={disabled}
                    menu
                    show={activeIndex === index}
                  />
                </ArrowContainer>
              </Button>
            </li>
          );
        })}
      </ul>
    </StyledMenu>
  );
};

export default Menu;
