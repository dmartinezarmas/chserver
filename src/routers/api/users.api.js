import { Router } from "express";
import usersManager from "../../data/fs/UserManager.fs.js";

const usersRouter = Router();

// USERS ROUTES
// crear usuarios
const createUser = async (req, res, next) => {
  try {
    const data = req.body;
    const one = await usersManager.create(data);
    return res.json({
      statusCode: 201,
      message: "Created ID: " + one.id,
    });
  } catch (error) {
    return next (error)
  }
};
usersRouter.post("/", createUser);

// leer todos los usuarios y filtrar por role
const readUsers = async (req, res, next) => {
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
      const error = new Error("Not found, not users");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next (error)
  }
};
usersRouter.get("/", readUsers);

// buscar y leer usuario por ID
const readOneUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await usersManager.readOne(uid);
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
usersRouter.get("/:uid", readOneUser);

// actualizar usuario
const updateUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const one = await usersManager.update(uid, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next (error)
  }
};
usersRouter.put("/:uid", updateUser);

// eliminar usuario
const destroyUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await usersManager.destroyOne(uid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next (error)
  }
};
usersRouter.delete("/:uid", destroyUser);

export default usersRouter;
