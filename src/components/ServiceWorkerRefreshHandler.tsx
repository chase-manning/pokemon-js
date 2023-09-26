import { useEffect } from "react";

import * as serviceWorkerRegistration from "../serviceWorkerRegistration";
import { VERSION } from "../app/constants";

// Read from local storage to see what version the user currently has
// If the version is different, then we need to refresh the page
// This is because the service worker caches all the files and they
// are not updated until the page is refreshed
const ServiceWorkerRefreshHandler = () => {
  useEffect(() => {
    const version = localStorage.getItem("version");
    if (version !== VERSION) {
      localStorage.setItem("version", VERSION);
      serviceWorkerRegistration.unregister();
      window.location.reload();
    }
  }, []);

  return null;
};

export default ServiceWorkerRefreshHandler;
