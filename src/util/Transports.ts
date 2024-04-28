// Credit: Nebula

import { SetTransport } from "@mercuryworkshop/bare-mux";

declare global {
    interface Window {
        setTransport: () => void;
    }
}

function changeTransport(transport: string, wispUrl: string) {
    switch (transport) {
        case "epoxy":
            localStorage.setItem("transport", "epoxy");
            console.log("Setting transport to Epoxy");
            SetTransport("EpxMod.EpoxyClient", { wisp: wispUrl });
            break;
        case "libcurl":
            localStorage.setItem("transport", "libcurl");
            console.log("Setting transport to Libcurl");
            SetTransport("CurlMod.LibcurlClient", {
                wisp: wispUrl
            });
            break;
        case "bare":
            localStorage.setItem("transport", "bare");
            console.log("Setting transport to Bare");
            const bare =
                localStorage.getItem("bare") || window.location.origin + "/bare/";
            console.log("Bare URL: " + bare);
            SetTransport("BareMod.BareClient", bare);
            break;
        default:
            SetTransport("CurlMod.LibcurlClient", {
                wisp: wispUrl
            });
            break;
    }
}

function getTransport() {
    return localStorage.getItem("transport") || "epoxy";
}

const wispUrl =
    (location.protocol === "https:" ? "wss://" : "ws://") +
    location.host +
    "/wisp/";

function setTransport() {
    changeTransport(
        localStorage.getItem("transport") || "libcurl",
        localStorage.getItem("wispUrl") || wispUrl
    );
}

window.setTransport = setTransport;

export { changeTransport, getTransport, setTransport };