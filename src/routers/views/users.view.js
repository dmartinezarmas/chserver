import { Router } from "express";
import usersManager from "../../data/fs/UserManager.fs.js";

const usersViewRouter = Router();
usersViewRouter.get("/", async(req, res, next) => {
    try {
        const users = await usersManager.read()
        return res.render("users", { users })
    } catch (error) {
        return (next)
    }
})
usersViewRouter.get("/register", async(req, res, next) => {
    try {
        return res.render("register", { title: "REGISTER" })
    } catch (error) {
        return (next)
    }
})
usersViewRouter.get("/:uid", async(req, res, next) => {
    try {
        const {uid} = req.params
        const one = await usersManager.readOne(uid)
        return res.render("user", {user: one})
    } catch (error) {
        return (next)
    }
})
export default usersViewRouter;