// y-websocket-server/server.js
const http = require('http');
const WebSocket = require('ws');
// require the exported helper from the package root
const { setupWSConnection } = require('y-websocket');

const url = require('url');

const port = process.env.PORT || 1234;
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('y-websocket server');
});
const wss = new WebSocket.Server({ noServer: true });

server.on('upgrade', (request, socket, head) => {
  // let setupWSConnection handle the ws connection
  wss.handleUpgrade(request, socket, head, (ws) => {
    // setupWSConnection expects (conn, req)
    setupWSConnection(ws, request);
  });
});

server.listen(port, () => {
  console.log(`y-websocket server listening on ws://localhost:${port}`);
});
