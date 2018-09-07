const projects = require("./routes/projects");
const express = require("express");
const home = require("./routes/home");
const actions = require("./routes/actions");

const server = express();

server.use(express.json());
server.use("/projects", projects);
server.use("/actions", actions);
server.use("/", home);

server.listen(9000, () => console.log("\n== API on port 9k ==\n"));
