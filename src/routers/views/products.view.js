import { Router } from "express";
import productsManager from "../../data/fs/ProductManager.fs.js";

const productsViewRouter = Router();
productsViewRouter.get("/", async(req, res, next) => {
    try {
        const products = await productsManager.read()
        return res.render("products", { products })
    } catch (error) {
        return (next)
    }
})
productsViewRouter.get("/real", async(req, res, next) => {
    try {
        return res.render("realProducts", { title: "REAL" })
    } catch (error) {
        return (next)
    }
})
productsViewRouter.get("/:pid", async(req, res, next) => {
    try {
        const {pid} = req.params
        const one = await productsManager.readOne(pid)
        return res.render("productDetails", {product: one})
    } catch (error) {
        return (next)
    }
})
export default productsViewRouter;