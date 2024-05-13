import { Router } from "express";
// import productsManager from "../../data/fs/ProductManager.fs.js";
import productsManager from "../../data/mongo/ProductsManager.mongo.js";

const productsRouter = Router();

// PRODUCTS ROUTES
// crear productos nuevos
async function createProduct(req, res, next) {
  try {
    const data = req.body;
    const one = await productsManager.create(data);
    return res.json({
      statusCode: 201,
      response: one.id,
      message: "Created ID: " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}
productsRouter.post("/", createProduct);

// leer todos los productos y filtrar por category
async function readProducts(req, res, next) {
  try {
    const { category } = req.query;
    const all = await productsManager.read({category});
    if (all.length != 0) {
      return res.json({
        statusCode: 200,
        response: all
      });
    } else {
      const error = new Error("Not found, not products");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}
productsRouter.get("/",readProducts);

// paginar los productos y filtrar por category
async function paginate(req, res, next) {
  try {
    const filter = {};
    const opts = {};
    if(req.query.limit){
      opts.limit = req.query.limit
    }
    if(req.query.page){
      opts.page = req.query.page
    }
    if(req.query.category){
      filter.category = req.query.category
    }
    const all = await productsManager.paginate({filter, opts});
    return res.json({
      statusCode: 200,
      response: all.docs,
      info:{
        page: all.page,
        totalPage: all.totalPage,
        limit: all.limit,
        prevPage: all.prevPage,
        nextPage: all.NextPage,
      }
    });
  } catch (error) {
    return next(error);
  }
}
productsRouter.get("/paginate", paginate);

// buscar y leer productos por ID
async function readOneProduct(req, res, next) {
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
    return next(error);
  }
}
productsRouter.get("/:pid", readOneProduct);

// actualizar producto
async function updateProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const data = req.body;
    const one = await productsManager.update(pid, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}
productsRouter.put("/:pid", updateProduct);

// eliminar producto
async function destroyProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await productsManager.destroyOne(pid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}
productsRouter.delete("/:pid", destroyProduct);

export default productsRouter;
