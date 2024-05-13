import { Router } from "express";
// import productsManager from "../../data/fs/ProductManager.fs.js";
import productsManager from "../../data/mongo/ProductsManager.mongo.js";

  
const productsViewRouter = Router();

productsViewRouter.get("/", async(req, res, next) => {
    try {
        const filter = {};
        if(req.query.category){
            filter.category = req.query.category
          }
        const products = await productsManager.read(filter)
        return res.render("products", { products })
    } catch (error) {
        return next (error)
    }
})

productsViewRouter.get("/paginate", async(req, res, next) => {
    try {
        const filter = {};
        const opts = {};
        if(req.query.limit){
          opts.limit = req.query.limit
        } else {opts.limit = 6}
        if(req.query.page){
          opts.page = req.query.page
        }
        if(req.query.category){
          filter.category = req.query.category
        }
        const allProducts = await productsManager.paginate({filter, opts})
        const products = allProducts.docs.map((doc) => doc.toObject());
        const prevPageLink = allProducts.prevPage ? `/products/paginate?page=${allProducts.prevPage}` : null;
        const nextPageLink = allProducts.nextPage ? `/products/paginate?page=${allProducts.nextPage}` : null;
        return res.render("products", {
            products,
            prevPageLink,
            nextPageLink
          });
    } catch (error) {
        return next (error)
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
        const product = await productsManager.readOne(pid)
        console.log(product);
        const one = product.toObject()
        const idString = one._id.toHexString()
        return res.render("productDetails", {product: one, idString})
    } catch (error) {
        return (next)
    }
})

export default productsViewRouter;