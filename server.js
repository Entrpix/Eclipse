import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { baremuxPath } from "@mercuryworkshop/bare-mux";
import { fileURLToPath } from 'node:url';
import { createServer } from "node:http";
import wisp from "wisp-server-node";
import { hostname } from "node:os";
import express from "express";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.static("dist"));
app.use("/uv/", express.static(uvPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/baremux/", express.static(baremuxPath));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

const server = createServer();

server.on("request", (req, res) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  app(req, res);
});
server.on("upgrade", (req, socket, head) => {
  if (req.url.endsWith("/wisp/"))
    wisp.routeRequest(req, socket, head);
  else
    socket.end();
});

const port = 8000;

server.on("listening", () => {
  console.log(`Eclipse is Listening on: http://${hostname()}:${port}`);
});


server.listen({
  port,
});