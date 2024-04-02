import { Router } from "express";
import productsManager from "../../data/fs/ProductManager.fs.js";

const productsRouter = Router();

// PRODUCTS ROUTES
// crear productos nuevos
const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    const one = await productsManager.create(data);
    return res.json({
      statusCode: 201,
      message: "Created ID: " + one.id,
    });
  } catch (error) {
    return next (error)
  }
};
productsRouter.post("/", createProduct);

// leer todos los productos y filtrar por category
const readProducts = async (req, res, next) => {
  try {
    const { category } = req.query;
    const all = await productsManager.read(category);
    if (all.length !== 0) {
      return res.status(200).json({
        response: all,
        category,
        success: true,
      });
    } else {
      const error = new Error("Not found, not products");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next (error)
  }
};
productsRouter.get("/", readProducts);

// buscar y leer productos por ID
const readOneProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.readOne(pid);
    if (one) {
      return res.status(200).json({
        respone: one,
        success: true,
      });
    } else {
      const error = new Error("Not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next (error)
  }
};
productsRouter.get("/:pid", readOneProduct);

// actualizar producto
const updateProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const one = await usersProduct.update(pid, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next (error)
  }
};
productsRouter.put("/:pid", updateProduct);

// eliminar producto
const destroyProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.destroyOne(pid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next (error)
  }
};
productsRouter.delete("/:pid", destroyProduct);

export default productsRouter;
