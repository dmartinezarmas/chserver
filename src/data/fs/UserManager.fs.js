import fs from "fs";
import crypto from "crypto";

class UsersManager {
  constructor() {
    this.ruta = "./src/data/fs/files/users.json";
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
      if (!data.email || !data.password) {
        throw new Error("Write all items");
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          photo:
            data.photo ||
            "https://pic.onlinewebfonts.com/thumbnails/icons_79265.svg",
          email: data.email,
          password: data.password,
          role: data.role || "0",
        };
        let usuarios = await fs.promises.readFile(this.ruta, "utf-8");
        usuarios = JSON.parse(usuarios);
        usuarios.push(user);
        usuarios = JSON.stringify(usuarios, null, 2);
        await fs.promises.writeFile(this.ruta, usuarios);
        console.log("User created");
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async read(filt) {
    try {
      let usuarios = await fs.promises.readFile(this.ruta, "utf-8");
      usuarios = JSON.parse(usuarios);
      if (!filt) {
        return usuarios;
      } else {
        const q = usuarios.some((each) => each.role == filt);
        if (!q) {
          const error = new Error("Not found");
          error.statusCode = 404;
          throw error;
        } else {
          usuarios = usuarios.filter((each) => each.role == filt);
          console.log("Amount of users: " + usuarios.length);
          console.log(usuarios);
          return usuarios;
        }
      }
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      let usuarios = await fs.promises.readFile(this.ruta, "utf-8");
      usuarios = JSON.parse(usuarios);
      let filtered = usuarios.find((each) => each.id === id);
      return filtered;
    } catch (error) {
      throw error;
    }
  }
  async destroyOne(id) {
    try {
      let usuarios = await fs.promises.readFile(this.ruta, "utf-8");
      usuarios = JSON.parse(usuarios);
      let filtered = usuarios.filter((each) => each.id !== id);
      filtered = JSON.stringify(filtered, null, 2);
      let one = usuarios.find((each) => each.id === id);
      if (!one) {
        throw new Error("User not found");
      } else {
        console.log("User deleted");
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
        await fs.promises.writeFile(this.ruta, all)
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

const usersManager = new UsersManager();
export default usersManager;

