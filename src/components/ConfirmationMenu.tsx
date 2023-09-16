import { useEffect, useState } from "react";
import styled from "styled-components";
import Frame from "./Frame";
import Menu from "./Menu";
import useEvent from "../app/use-event";
import { Event } from "../app/emitter";
import useIsMobile from "../app/use-is-mobile";

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  z-index: 100;

  @media (max-width: 768px) {
    height: 30%;
  }
`;

interface Props {
  show: boolean;
  preMessage: string;
  postMessage: string;
  confirm: () => void;
  cancel: () => void;
}

const ConfirmationMenu = ({
  show,
  preMessage,
  postMessage,
  confirm,
  cancel,
}: Props) => {
  const [confirmed, setConfirmed] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!show) setConfirmed(false);
  }, [show]);

  useEvent(Event.A, () => {
    if (!confirmed) return;
    cancel();
  });

  if (!show) return null;

  return (
    <>
      <Container>
        <Frame wide tall>
          {confirmed ? postMessage : preMessage}
        </Frame>
      </Container>
      <Menu
        left="0"
        padding="1vw"
        bottom={isMobile ? "30%" : "20%"}
        show={!confirmed}
        close={() => setConfirmed(true)}
        noExit
        menuItems={[
          {
            label: "Yes",
            action: () => {
              setConfirmed(true);
              confirm();
            },
          },
          {
            label: "No",
            action: () => {
              setConfirmed(true);
              cancel();
            },
          },
        ]}
      />
    </>
  );
};

export default ConfirmationMenu;
