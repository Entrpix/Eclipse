import { LocationProvider, Router, Route } from "preact-iso";
import { NotFound } from "./pages/NotFound";
import { Suspense } from "./pages/Suspense";
import { Home } from "./pages/Home";

import "./style.css";

export default function Routes() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/index.js", {
        scope: "/"
    });
}
  return (
    <LocationProvider>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/suspense" component={Suspense} />
        <Route default component={NotFound} />
      </Router>
    </LocationProvider>
  );
}