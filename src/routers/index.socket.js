// import productsManager from "../data/fs/ProductManager.fs.js"
import productsManager from "../data/mongo/ProductsManager.mongo.js";

export default async (socket) => {
    console.log(`User id: ${socket.id} is connected`)
    socket.emit("products", await productsManager.read())
    socket.on("register", async data => {
        await productsManager.create(data)
        socket.emit("products", await productsManager.read())
    })
}