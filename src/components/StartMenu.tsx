import Menu from "./Menu";
import { useEffect, useState } from "react";

const StartMenu = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        setShow(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Menu
      show={show}
      close={() => setShow(false)}
      menuItems={[
        {
          label: "Pokédex",
          action: () => console.log("TODO"),
        },
        {
          label: "Pokémon",
          action: () => console.log("TODO"),
        },
        {
          label: "Item",
          action: () => console.log("TODO"),
        },
        {
          label: "Player",
          action: () => console.log("TODO"),
        },
        {
          label: "Save",
          action: () => console.log("TODO"),
        },
        {
          label: "Option",
          action: () => console.log("TODO"),
        },
      ]}
    />
  );
};

export default StartMenu;
