const express = require("express");
const accountsRoutes = require("./accounts/accounts-router.js");

const server = express();

server.use(express.json());
server.use("/api/accounts", accountsRoutes);

module.exports = server;
