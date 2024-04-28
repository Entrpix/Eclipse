"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { createBareServer } = require('@tomphttp/bare-server-node');
const wisp = require("wisp-server-node");
const http = require('node:http');
const bareServer = createBareServer('/bare/');
const requestHandler = (req, res) => {
    if (req.url.startsWith("/wisp/")) {
        wisp.routeRequest(req, res);
    }
    else if (bareServer.shouldRoute(req)) {
        bareServer.routeRequest(req, res);
    }
    else {
        res.writeHead(400);
        res.end('Not found.');
    }
};
const upgradeHandler = (req, socket, head) => {
    if (req.url.endsWith("/wisp/")) {
        wisp.routeRequest(req, socket, head);
    }
    else if (bareServer.shouldRoute(req)) {
        bareServer.routeUpgrade(req, socket, head);
    }
    else {
        socket.end();
    }
    ;
};
const httpServer = http.createServer(requestHandler);
httpServer.on("upgrade", upgradeHandler);
const port = 3000;
httpServer.listen(port, () => {
    console.log(`Eclipse Server is Running on port: ${port}\nFrontend is Running on Port: 8000`);
});
