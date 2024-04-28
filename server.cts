// Credit: https://github.com/NebulaServices/Nebula/blob/main/server.ts

const createRammerhead = require("rammerhead/src/server/index.js");
const { createBareServer } = require("@tomphttp/bare-server-node");
const { createServer } = require("node:http");
const  { wisp } = require("wisp-server-node");
const { fastify } = require("fastify");

const bareServer = createBareServer("/bare/");
const rh = createRammerhead();

const rammerheadScopes = [
  "/rammerhead.js",
  "/hammerhead.js",
  "/transport-worker.js",
  "/task.js",
  "/iframe-task.js",
  "/worker-hammerhead.js",
  "/messaging",
  "/sessionexists",
  "/deletesession",
  "/newsession",
  "/editsession",
  "/needpassword",
  "/syncLocalStorage",
  "/api/shuffleDict",
  "/mainport"
];

const rammerheadSession = /^\/[a-z0-9]{32}/;

function shouldRouteRh(req: any) {
  const url = new URL(req.url, "http://0.0.0.0");
  return (
    rammerheadScopes.includes(url.pathname) ||
    rammerheadSession.test(url.pathname)
  );
}

function routeRhRequest(req: any, res: any) {
  rh.emit("request", req, res);
}

function routeRhUpgrade(req: any, socket: any, head: any) {
  rh.emit("upgrade", req, socket, head);
}

const serverFactory = (handler: any) => {
  return createServer()
    .on("request", (req: any, res: any) => {
      if (bareServer.shouldRoute(req)) {
        bareServer.routeRequest(req, res);
      } else if (shouldRouteRh(req)) {
        routeRhRequest(req, res);
      } else {
        handler(req, res);
      }
    })
    .on("upgrade", (req: any, socket: any, head: any) => {
      if (bareServer.shouldRoute(req)) {
        bareServer.routeUpgrade(req, socket, head);
      } else if (shouldRouteRh(req)) {
        routeRhUpgrade(req, socket, head);
      } else if (req.url.endsWith("/wisp/")) {
        wisp.routeRequest(req, socket, head);
      }
    });
};

const app = fastify({ logger: false, serverFactory });

console.log(`Backend is Running on Port: 3000`);
console.log("Frontend is Running on Port: 8000")

app.listen({
    port: 3000,
    host: "0.0.0.0"
});