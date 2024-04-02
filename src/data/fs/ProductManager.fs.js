import fs from "fs";
import crypto from "crypto";

class ProductsManager {
  constructor() {
    this.ruta = "./src/data/fs/files/products.json";
    this.init();
  }
  init() {
    const existe = fs.existsSync(this.ruta);
    if (!existe) {
      const datos = JSON.stringify([], null, 2);
      fs.writeFileSync(this.ruta, datos);
      console.log("File created");
    } else {
      console.log("File exists");
    }
  }
  async create(data) {
    try {
      if (!data.title) {
        throw new Error("Write title");
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo:
            data.photo ||
            "https://st2.depositphotos.com/1007168/6106/v/450/depositphotos_61069335-stock-illustration-grey-magnifying-glass.jpg",
          category: data.category || "other",
          price: data.price || 1,
          stock: data.stock || 1,
        };
        let productos = await fs.promises.readFile(this.ruta, "utf-8");
        productos = JSON.parse(productos);
        productos.push(product);
        productos = JSON.stringify(productos, null, 2);
        await fs.promises.writeFile(this.ruta, productos);
        console.log("Product created");
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async read(filt) {
    try {
      let productos = await fs.promises.readFile(this.ruta, "utf-8");
      productos = JSON.parse(productos);
      if (!filt) {
        return productos;
      } else {
        const q = productos.some((each) => each.category == filt);
        if (!q) {
          const error = new Error("Not found");
          error.statusCode = 404;
          throw error;
        } else {
          productos = productos.filter((each) => each.category == filt);
          if (productos.length === 0) {
            console.log("Not products");
          } else {
            console.log("Amount of products: " + productos.length);
            console.log(productos);
          }
          return productos;
        }
      }
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      let productos = await fs.promises.readFile(this.ruta, "utf-8");
      productos = JSON.parse(productos);
      let filtered = productos.find((each) => each.id === id);
      if (!filtered) {
        throw new Error("Product not found");
      } else {
        console.log("The product is:");
        console.log(filtered);
      }
      return filtered;
    } catch (error) {
      throw error;
    }
  }
  async destroyOne(id) {
    try {
      let productos = await fs.promises.readFile(this.ruta, "utf-8");
      productos = JSON.parse(productos);
      let filtered = productos.filter((each) => each.id !== id);
      filtered = JSON.stringify(filtered, null, 2);
      let one = productos.find((each) => each.id === id);
      if (!one) {
        throw new Error("Product not found");
      } else {
        console.log("Product deleted");
        await fs.promises.writeFile(this.ruta, filtered);
      }
      return filtered;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data){
    try {
      let all =  await this.read()
      let one = all.find((each) => each.id === id)
      if (one) {
        for (let prop in data){
          one[prop] = data[prop]
        }
        all = JSON.stringify(all, null, 2)
        await fs.promises.writeFile(this.path, all)
        return one
      } else {
        const error = new Error("Not found")
        error.statusCode = 404
        throw error
      }
    } catch (error) {
      throw error;
    }
  }
}

const productsManager = new ProductsManager();
export default productsManager;

