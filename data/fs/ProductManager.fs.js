import fs from "fs";
import crypto from "crypto";

class ProductsManager {
  constructor() {
    this.ruta = "./data/fs/files/products.json";
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
      if (!data.title || !data.category || !data.price || !data.stock) {
        throw new Error("Write all items");
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo:
            data.photo ||
            "https://st2.depositphotos.com/1007168/6106/v/450/depositphotos_61069335-stock-illustration-grey-magnifying-glass.jpg",
          category: data.category,
          price: data.price,
          stock: data.stock,
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
          const error = new Error("Not founded");
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
        throw new Error("Product not founded");
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
        throw new Error("Producto no encontrado");
      } else {
        console.log("Producto eliminado");
        await fs.promises.writeFile(this.ruta, filtered);
      }
      return filtered;
    } catch (error) {
      throw error;
    }
  }
}

const productsManager = new ProductsManager();
export default productsManager;

// async function prueba() {
//   try {
//     const products = new ProductManager();
// products.create({
//     title: "Secador de pelo",
//     category: "fashion",
//     price: "200",
//     stock: 20,
//   });
// products.create({
//   title: "Smart TV OLED 52pulg",
//   photo: "oled52.png",
//   category: "tecno",
//   price: "1300",
//   stock: 10,
// });
// products.create({
//   title: "Tablet Samsung 10pulg",
//   photo: "tablet10.png",
//   category: "tecno",
//   price: "600",
//   stock: 12,
// });
// products.create({
//   title: "Espejo smart LED",
//   category: "fashion",
//   price: "300",
//   stock: 8,
// });
// products.create({
//   title: "Sábanas premium Queen size",
//   category: "blancos",
//   price: "300",
//   stock: 10,
// });
// products.create({
//   title: "Acolchado Queen size",
//   category: "blancos",
//   price: "500",
//   stock: 14,
// });
// products.create({
//   title: "Smartphone TCL P200",
//   photo: "tcl_p200.png",
//   category: "tecno",
//   price: "1500",
//   stock: 30,
// });
// products.create({
//   title: "Smartphone BGH alpha5",
//   photo: "bgh_alpha5.png",
//   category: "tecno",
//   price: "1300",
//   stock: 50,
// });
// products.create({
//   title: "Balanza de baño smart BGH",
//   photo: "bgh_balanza.png",
//   category: "fashion",
//   price: "380",
//   stock: 8,
// });
// products.create({
//   title: "Rizador de pelo GAMMA",
//   photo: "gamma_rizador.png",
//   category: "fashion",
//   price: "580",
//   stock: 5,
// });
// products.read();
// products.readOne("882edb104e5b3ce872ae5407")
// Para probar esta función descomentarla y utilizar un id válido y/o uno inválido
// products.destroyOne("882edb104e5b3ce872a")
// Para probar esta función descomentarla y utilizar un id válido y/o uno inválido
//   } catch (error) {
//     console.log(error);
//   }
// }
// prueba();
