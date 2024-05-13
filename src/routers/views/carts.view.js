import { Router } from "express";
import cartsManager from "../../data/mongo/CartsManager.mongo.js";

  
const cartsViewRouter = Router();

cartsViewRouter.get("/", async(req, res, next) => {
     try {
    const {user_id} = req.query
    const cart=await cartsManager.read({user_id})
    return res.render("carts", {cart});
  } catch (error) {
    return next(error);
  }
})

// productsViewRouter.get("/paginate", async(req, res, next) => {
//     try {
//         const filter = {};
//         const opts = {};
//         if(req.query.limit){
//           opts.limit = req.query.limit
//         } else {opts.limit = 6}
//         if(req.query.page){
//           opts.page = req.query.page
//         }
//         if(req.query.category){
//           filter.category = req.query.category
//         }
//         const allProducts = await productsManager.paginate({filter, opts})
//         const products = allProducts.docs.map((doc) => doc.toObject());
//         const prevPageLink = allProducts.prevPage ? `/products/paginate?page=${allProducts.prevPage}` : null;
//         const nextPageLink = allProducts.nextPage ? `/products/paginate?page=${allProducts.nextPage}` : null;
//         return res.render("products", {
//             products,
//             prevPageLink,
//             nextPageLink
//           });
//     } catch (error) {
//         return next (error)
//     }
// })

// cartsViewRouter.get("/:uid", async(req, res, next) => {
//     try {
//         const {uid} = req.params
//         const cart = await cartsManager.readOne(uid)
//         const one = cart.toObject()
//         const idString = one._id.toHexString()
//         return res.render("productDetails", {product: one, idString})
//     } catch (error) {
//         return (next)
//     }
// })

export default cartsViewRouter;