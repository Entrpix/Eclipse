import { LocationProvider, Router, Route } from "preact-iso";
import { setTransport } from "./util/Transports";
import { ProxyFrame } from "./components/Proxy";
import { AboutBlank } from "./components/AboutBlank";
import { Settings } from "./pages/Settings";
import { NotFound } from "./pages/NotFound";
import { Games } from "./pages/Games";
import { Home } from "./pages/Home";

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
        <Route path="/ab/:url" component={AboutBlank} />
        <Route default component={NotFound} />
      </Router>
    </LocationProvider>
  );
}