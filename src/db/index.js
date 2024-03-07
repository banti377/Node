import mongoose from "mongoose";

export const connectDB = (params) => {
  return mongoose
    .connect("mongodb://127.0.0.1:27017/ecommerce")
    .then(() => console.log("Database connected...!"))
    .catch((err) => console.log(err));
};
