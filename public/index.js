const stockSW = "/uv/sw.js";
const swAllowedHostnames = ["localhost", "127.0.0.1"];


async function RegisterSW() {
  if (!navigator.serviceWorker) {
    if (
      location.protocol !== "https:" &&
      !swAllowedHostnames.includes(location.hostname)
    )
      throw new Error("Service workers cannot be registered without https.");

    throw new Error("Your browser doesn't support service workers.");
  }

  await navigator.serviceWorker.register(stockSW);

  let wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
  await BareMux.SetTransport("EpxMod.EpoxyClient", { wisp: wispUrl });
}

async function initSW() {
  try {
    await RegisterSW();
  } catch (err) {
    console.error(err);
    throw err;
  }
}
initSW();