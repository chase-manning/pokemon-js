import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setMenuOpen } from "../state/gameSlice";

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
  const dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (show) dispatch(setMenuOpen(true));
  }, [show, dispatch]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!show) return;
      if (e.key === "ArrowDown") {
        setActiveIndex((prev) => {
          if (prev === menuItems.length) return prev;
          return prev + 1;
        });
      }

      if (e.key === "ArrowUp") {
        setActiveIndex((prev) => {
          if (prev === 0) return prev;
          return prev - 1;
        });
      }

      if (e.key === "Enter") {
        if (activeIndex < menuItems.length) {
          menuItems[activeIndex].action();
        } else {
          close();
          dispatch(setMenuOpen(false));
          setActiveIndex(0);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setActiveIndex, close, menuItems, activeIndex, show, dispatch]);

  console.log(activeIndex);

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
