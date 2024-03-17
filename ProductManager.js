class ProductManager {
  static #products = [];
  create(data) {
    
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
