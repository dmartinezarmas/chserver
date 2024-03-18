class UserManager {
  static #users = [];
  create(data) {
    try {
      if (!data.photo || !data.email || !data.password) {
        throw new Error("INGRESE TODOS LOS DATOS");
      } else {
        const user = {
          id:
            UserManager.#users.length === 0
              ? 1
              : UserManager.#users[UserManager.#users.length - 1].id + 1,
          photo: data.photo,
          email: data.email,
          password: data.password,
          role: 0,
        };
        UserManager.#users.push(user);
        console.log("Producto cargado");
      }
    } catch (error) {
      console.log(error);
    }
  }
  read() {
    try {
      if (UserManager.#users.length === 0) {
        throw new Error("No hay usuarios");
      } else {
        return UserManager.#users;
      }
    } catch (error) {
      console.log(error);
    }
  }
  readOne(id) {
    try {
      const one = UserManager.#users.find((each) => each.id === id);
      if (!one) {
        throw new Error("No existe ese usuario");
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
        const filtered = UserManager.#users.filter((each) => each.id !== id);
        UserManager.#users = filtered;
        console.log("Usuario eliminado correctamente");
      } else {
        console.log("Usuario inexistente");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const usersManager = new UserManager();
usersManager.create({
  photo: "img1.png",
  email: "carlosromero@gmail.com",
  password: "carlos1234",
});
usersManager.create({
  photo: "img2.png",
  email: "pedrotorres@yahoo.com",
  password: "pedropeter",
});
console.log(usersManager.read());
console.log(usersManager.readOne(2));
console.log(usersManager.readOne(15));
usersManager.destroy(1);
usersManager.destroy(25);
