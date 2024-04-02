import express from "express";
import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";

// configuracion del servidor
const server = express();
const port = 0;
const ready = () => console.log("Server ready on port " + port);
server.listen(port, ready);

server.use(express.json())
server.use(express.urlencoded({ extended: true }));

server.use("/", indexRouter)
server.use(errorHandler)
server.use(pathHandler)

//RUTA GENERAL INICIAL
// server.get("/", async (req, res) => {
//   try {
//     return res.status(200).json({
//       response: "Api OK",
//       success: true,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       response: "Api Error",
//       success: false,
//     });
//   }
// });

