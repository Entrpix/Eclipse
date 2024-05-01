import { LocationProvider, Router, Route } from "preact-iso";
import { NotFound } from "./pages/NotFound";;
import { Home } from "./pages/Home";

import "./style.css";

export default function Routes() {
  return (
    <LocationProvider>
      <Router>
        <Route path="/" component={Home} />
        <Route default component={NotFound} />
      </Router>
    </LocationProvider>
  );
}