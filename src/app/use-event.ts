import { useEffect } from "react";
import emitter, { Event } from "./emitter";

const useEvent = (event: Event, action: () => void) => {
  useEffect(() => {
    // Attach the event listener
    emitter.on(event, action);

    // Clean up the listener on component unmount
    return () => {
      emitter.off(event, action);
    };
  }, [event, action]);
};

export default useEvent;
