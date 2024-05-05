import { Schema, model } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true },
    photo: {
      type: String,
      default:
        "https://st2.depositphotos.com/1007168/6106/v/450/depositphotos_61069335-stock-illustration-grey-magnifying-glass.jpg",
    },
    category: {
      type: String,
      enum: ["frashion", "tecno", "blancos"],
      default: "other"
    },
    price: { type: Number, default: 1 },
    stock: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);
const Product = model(collection, schema);
export default Product