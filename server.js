import { triggerAsyncId } from "async_hooks";
import express from "express";
import usersManager from "./data/fs/UserManager.fs.js";
import productsManager from "./data/fs/ProductManager.fs.js";

// configuracion del servidor
const server = express();
const port = 8080;
const ready = () => console.log("Server ready on port " + port);
server.listen(port, ready);

server.use(express.urlencoded({ extended: true }));

server.get("/", async (req, res) => {
  try {
    return res.status(200).json({
      response: "Coder Api",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      response: "Coder Api Error",
      success: false,
    });
  }
});

// USERS SECTION
// crear usuarios
server.get("/api/users/:email/:password/:role", async (req, res) => {
  try {
    const { email, password, role } = req.params;
    const data = { email, password, role };
    const one = await usersManager.create(data);
    return res.status(201).json({
      response: one,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      response: "Error to create",
      success: false,
    });
  }
});

// leer todos los usuarios y filtrar por role
server.get("/api/users", async (req, res) => {
  try {
    const { role } = req.query;
      const all = await usersManager.read(role);
    if (all.length !== 0) {
      return res.status(200).json({
        response: all,
        role,
        success: true,
      });
    } else {
      const error = new Error("Not founded, not users");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      response: null,
      success: false,
    })
  }
});

// buscar y leer usuario por ID
server.get("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params
    const one = await usersManager.readOne(uid)
    if (one) {
      return res.status(200).json({
          respone: one,
          success: true
        })
    } else {
      const error = new Error ("Not founded")
      error.statusCode = 404
      throw error
    }
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      response: null,
      success: false,
    })
  }
});

// PRODUCTS SECTION
// crear productos nuevos
server.get("/api/products/:title/:photo/:category/:price/:stock", async (req, res) => {
  try {
    const { title, photo, category, price, stock } = req.params;
    const data = { title, photo, category, price, stock };
    const one = await productsManager.create(data);
    return res.status(201).json({
      response: one,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      response: "Error to create",
      success: false,
    });
  }
});

// leer todos los productos y filtrar por category
server.get("/api/products", async (req, res) => {
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
      const error = new Error("Not founded, not products");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      response: null,
      success: false,
    })
  }
});

// buscar y leer productos por ID
server.get("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params
    const one = await productsManager.readOne(pid)
    if (one) {
      return res.status(200).json({
          respone: one,
          success: true
        })
    } else {
      const error = new Error ("Not founded")
      error.statusCode = 404
      throw error
    }
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      response: null,
      success: false,
    })
  }
});
