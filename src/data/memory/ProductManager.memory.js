class ProductManager {
  static #products = [];
  create(data) {
    try {
      if (!data.title) {
        throw new Error("Write title");
      } else {
        const product = {
          id:
            ProductManager.#products.length === 0
              ? 1
              : ProductManager.#products[ProductManager.#products.length - 1]
                  .id + 1,
          title: data.title,
          photo: data.photo || "https://st2.depositphotos.com/1007168/6106/v/450/depositphotos_61069335-stock-illustration-grey-magnifying-glass.jpg",
          category: data.category || "other",
          price: data.price || 1,
          stock: data.stock || 1,
        };
        ProductManager.#products.push(product);
        console.log("Product created");
      }
    } catch (error) {
      console.log(error);
    }
  }
  read() {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("Not products");
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
        throw new Error("Not found");
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
        console.log("Product deleted");
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
productsManager.create({
  title: "Acolchado Queen size",
  photo: "acolchadoqueen.png",
  category: "blancos",
  price: "500",
  stock: 14,
});
productsManager.create({
  title: "Smartphone TCL P200",
  photo: "tcl_p200.png",
  category: "tecno",
  price: "1500",
  stock: 30,
});
productsManager.create({
  title: "Smartphone BGH alpha5",
  photo: "bgh_alpha5.png",
  category: "tecno",
  price: "1300",
  stock: 50,
});
productsManager.create({
  title: "Balanza de baño smart BGH",
  photo: "bgh_balanza.png",
  category: "fashion",
  price: "380",
  stock: 8,
});
productsManager.create({
  title: "Rizador de pelo GAMMA",
  photo: "gamma_rizador.png",
  category: "fashion",
  price: "580",
  stock: 5,
});

console.log(productsManager.read());
console.log(productsManager.readOne(2));
console.log(productsManager.readOne(15));
productsManager.destroy(1);
productsManager.destroy(25);
