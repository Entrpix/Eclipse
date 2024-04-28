import { LocationProvider, Router, Route } from "preact-iso";
import { setTransport } from "./util/Transports";
import { Settings } from "./pages/Settings";
import { NotFound } from "./pages/NotFound";
import { ProxyFrame } from "./components/Proxy";
import { Games } from "./pages/Games";
import { Home } from "./pages/Home";
import { ab } from "./pages/ab";

import "./style.css";

export default function Routes() {
  // const wispUrl =
    (location.protocol === "https:" ? "wss://" : "ws://") +
    location.host +
    "/wisp/";

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(async () => {
      setTransport();
    });
    navigator.serviceWorker.register("/sw.js", {
      scope: "/"
    });
  } // Credit: Nebula
  return (
    <LocationProvider>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/games" component={Games} />
        <Route path="/url/:url" component={ProxyFrame} />
        <Route path="/settings" component={Settings} />
        <Route path="/ab/:url" component={ab} />
        <Route default component={NotFound} />
      </Router>
    </LocationProvider>
  );
}