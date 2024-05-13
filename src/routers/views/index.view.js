import { Router } from "express";
import productsViewRouter from "./products.view.js";
import usersViewRouter from "./users.view.js";
import cartsViewRouter from "./carts.view.js";

const indexViewRouter = Router();
indexViewRouter.use("/products", productsViewRouter);
indexViewRouter.use("/users", usersViewRouter);
indexViewRouter.use("/carts", cartsViewRouter);
indexViewRouter.get("/", (req, res, next) => {
    try {
        return res.render("index", {title: "Lonera", favi: "https://scontent.fmdq7-1.fna.fbcdn.net/v/t39.30808-6/298594436_428058682675574_2917021255902085627_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=j4DwX-Bv1_gAb6t2Ekd&_nc_oc=AdiOfYVydsxArRNR6ZqjOIj_Xyo1QceMPt5-AxN4bVGe507DspICeIMg0Cp-xZQAnpo&_nc_ht=scontent.fmdq7-1.fna&oh=00_AfDC2En9XIkX_eBULjLndrvJY7SQguGONNXDs92Sa7tzKw&oe=661BAA85" })
    } catch (error) {
        return next(error)        
    }
})

export default indexViewRouter;
