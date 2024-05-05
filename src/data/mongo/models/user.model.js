import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    photo: {
      type: String,
      default:
        "https://pic.onlinewebfonts.com/thumbnails/icons_79265.svg",
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "0", enum: ["0", "1", "2"] },
  },
  {
    timestamps: true,
  }
);
const User = model(collection, schema);
export default User;
