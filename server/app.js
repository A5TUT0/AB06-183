const express = require("express");
const http = require("http");
const { initializeAPI } = require("./api");
require("dotenv").config();

const pinoHttp = require("pino-http")();

const app = express();
app.use(express.json());

// Usar pino-http como middleware
app.use(pinoHttp);

const server = http.createServer(app);

app.use(express.static("client"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

initializeAPI(app);

const serverPort = process.env.PORT || 3000;
server.listen(serverPort, () => {
  console.log(`Express Server started on port ${serverPort}`);
});
