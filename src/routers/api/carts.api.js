import { Router } from "express";
import cartsManager from "../../data/mongo/CartsManager.mongo.js";

const cartsRouter = Router();
cartsRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const one = await cartsManager.create(data);
    return res.json({
      statusCode: 201,
      message: "Created",
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});
cartsRouter.get("/", async (req, res, next) => {
  try {
    const { user_id } = req.query;
    if (user_id) {
      const all = await cartsManager.read({ user_id });
      if (all.length > 0) {
        return res.json({
          statusCode: 200,
          message: "Read",
          response: all,
        });
      }
    }
    const error = new Error("Not found");
    error.statusCode = 404;
    throw error;
  } catch (error) {
    return next(error);
  }
});

export default cartsRouter;
