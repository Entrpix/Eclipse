import { Suspense, lazy } from "preact/compat";
import { render } from "preact";

const Routes = lazy(() => import("./routes"));

export default function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes />
        </Suspense>
    );
};

const appElement = document.getElementById("app");
if (appElement) {
    render(
        <App />,
        appElement
    );
}