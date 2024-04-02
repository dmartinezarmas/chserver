class UserManager {
  static #users = [];
  create(data) {
    try {
      if (!data.email || !data.password) {
        throw new Error("Write all items");
      } else {
        const user = {
          id:
            UserManager.#users.length === 0
              ? 1
              : UserManager.#users[UserManager.#users.length - 1].id + 1,
          photo: data.photo || "https://pic.onlinewebfonts.com/thumbnails/icons_79265.svg",
          email: data.email,
          password: data.password,
          role: data.role || 0,
        };
        UserManager.#users.push(user);
        console.log("User created");
      }
    } catch (error) {
      console.log(error);
    }
  }
  read() {
    try {
      if (UserManager.#users.length === 0) {
        throw new Error("Not users");
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
        const filtered = UserManager.#users.filter((each) => each.id !== id);
        UserManager.#users = filtered;
        console.log("User deleted");
      } else {
        console.log("User not found");
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
usersManager.create({
  photo: "img3.png",
  email: "lic_rodriguez01@yahoo.com",
  password: "rodri_01",
});
usersManager.create({
  photo: "img4.png",
  email: "hernandez_adrian@gmail.com",
  password: "dontgiveup",
});

console.log(usersManager.read());
console.log(usersManager.readOne(2));
console.log(usersManager.readOne(15));
usersManager.destroy(1);
usersManager.destroy(25);
