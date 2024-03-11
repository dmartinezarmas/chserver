class UserManager {
  static #users = [];
  create(data) {
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
  }
  read(){
    return UserManager.#users
  }
}

const usersManager = new UserManager()
usersManager.create({
    photo: "img1.png",
    email: "carlosromero@gmail.com",
    password: "carlos1234"
})
usersManager.create({
    photo: "img2.png",
    email: "pedrotorres@yahoo.com",
    password: "pedropeter"
})
console.log(usersManager.read())
