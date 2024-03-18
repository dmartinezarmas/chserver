class ProductManager {
  static #products = [];
  create(data) {
    try {
      if (
        !data.title ||
        !data.photo ||
        !data.category ||
        !data.price ||
        !data.stock
      ) {
        throw new Error("INGRESE TODOS LOS DATOS");
      } else {
        const product = {
          id:
            ProductManager.#products.length === 0
              ? 1
              : ProductManager.#products[ProductManager.#products.length - 1]
                  .id + 1,
          title: data.title,
          photo: data.photo,
          category: data.category,
          price: data.price,
          stock: data.stock,
        };
        ProductManager.#products.push(product);
        console.log("Producto cargado");
      }
    } catch (error) {
      console.log(error);
    }
  }
  read() {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("No hay productos");
      } else {
        return ProductManager.#products;
      }
    } catch (error) {
      console.log(error);
    }
  }
  readOne(id) {
    try {
      const one = ProductManager.#products.find((each) => each.id === id);
      if (!one) {
        throw new Error("No existe ese producto");
      } else {
        return one;
      }
    } catch (error) {
      console.log(error);
    }
  }
  destroy(id) {
    try {
      this.readOne(id);
      if (!!this.readOne(id)) {
        const filtered = ProductManager.#products.filter(
          (each) => each.id !== id
        );
        ProductManager.#products = filtered;
        console.log("Producto eliminado correctamente");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const productsManager = new ProductManager();
productsManager.create({
  title: "Secador de pelo",
  photo: "secador.png",
  category: "fashion",
  price: "200",
  stock: 20,
});
productsManager.create({
  title: "Smart TV OLED 52pulg",
  photo: "oled52.png",
  category: "tecno",
  price: "1300",
  stock: 10,
});
productsManager.create({
  title: "Tablet Samsung 10pulg",
  photo: "tablet10.png",
  category: "tecno",
  price: "600",
  stock: 12,
});
productsManager.create({
  title: "Espejo smart LED",
  photo: "espejo.png",
  category: "fashion",
  price: "300",
  stock: 8,
});
productsManager.create({
  title: "Sábanas premium Queen size",
  photo: "sabanasqueen.png",
  category: "blancos",
  price: "300",
  stock: 10,
});
console.log(productsManager.read());
console.log(productsManager.readOne(2));
console.log(productsManager.readOne(15));
productsManager.destroy(1);
productsManager.destroy(25);
