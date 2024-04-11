import { Router } from "express";
import indexApiRouter from "./api/index.api.js";
import indexViewRouter from "./views/index.view.js";

const indexRouter = Router();
indexRouter.use("/api", indexApiRouter);
indexRouter.use("/", indexViewRouter);

export default indexRouter;
