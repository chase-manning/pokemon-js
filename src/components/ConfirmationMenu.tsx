import { useEffect, useState } from "react";
import styled from "styled-components";
import Frame from "./Frame";
import Menu from "./Menu";
import useEvent from "../app/use-event";
import { Event } from "../app/emitter";
import useIsMobile from "../app/use-is-mobile";
import { useDispatch, useSelector } from "react-redux";
import { hideConfirmationMenu, selectConfirmationMenu } from "../state/uiSlice";

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  z-index: 100;

  @media (max-width: 1000px) {
    height: 30%;
  }
`;

const ConfirmationMenu = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const isMobile = useIsMobile();
  const data = useSelector(selectConfirmationMenu);

  const show = !!data;

  useEffect(() => {
    if (!show) {
      setLoading(false);
      setConfirmed(false);
    }
  }, [show]);

  useEvent(Event.A, () => {
    if (!confirmed) return;
    dispatch(hideConfirmationMenu());
  });

  if (!show) return null;

  return (
    <>
      <Container>
        <Frame wide tall>
          {confirmed
            ? data.postMessage
            : loading
            ? data.loadingText
              ? data.loadingText
              : "Loading..."
            : data.preMessage}
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
            action: async () => {
              setLoading(true);
              await data.confirm();
              setConfirmed(true);
            },
          },
          {
            label: "No",
            action: () => {
              if (data.cancel) data.cancel();
              dispatch(hideConfirmationMenu());
            },
          },
        ]}
      />
    </>
  );
};

export default ConfirmationMenu;
