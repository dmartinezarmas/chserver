class ProductManager {
  static #products = [];
  create(data) {
    const product = {
      id:
        ProductManager.#products.length === 0
          ? 1
          : ProductManager.#products[ProductManager.#products.length - 1].id +
            1,
      title: data.title,
      photo: data.photo,
      category: data.category,
      price: data.price,
      stock: data.stock,
    };
    ProductManager.#products.push(product);
  }
  read() {
    return ProductManager.#products;
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
console.log(productsManager.read());
