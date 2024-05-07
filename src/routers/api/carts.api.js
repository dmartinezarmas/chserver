import { Router } from "express";
import cartsManager from "../../data/mongo/CartsManager.mongo.js";

const cartsRouter = Router();
// CREAR CARRITO
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
// LEER CARRITO
cartsRouter.get("/", async (req, res, next) => {
  try {
    const { user_id } = req.query;
    if (!user_id){
        const error = new Error("Enter a User ID");
        error.statusCode = 400;
        throw error;
    }
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
// ACTUALIZAR CARRITO
cartsRouter.put("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params
        const data = req.body
        const one = await cartsManager.update(uid, data)
        return res.json({
            statusCode: 200,
            response: one
        })
    } catch (error) {
        return next(error)
    }
})
// BORRAR CARRITO
cartsRouter.delete("/:uid", async (req, res, next) => {
    try {
      const { uid } = req.params;
      const one = await cartsManager.destroyOne(uid);
      return res.json({
        statusCode: 200,
        response: one,
      });
    } catch (error) {
      return next (error)
    }
  });

export default cartsRouter;
