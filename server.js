import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import {createServer} from "http"
import { Server } from "socket.io";

import indexRouter from "./src/routers/index.router.js";
import socketCb from "./src/routers/index.socket.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";

// configuracion del servidor
const server = express();
const port = 8080;
const ready = () => console.log("Server ready on port " + port);
const nodeServer = createServer(server)
const socketServer = new Server(nodeServer)
socketServer.on("connection", socketCb)
nodeServer.listen(port, ready);

server.engine("handlebars",engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname+'/src/views')

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(express.static("public"))

server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
