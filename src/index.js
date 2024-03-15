import "dotenv/config";
import bodyParser from "body-parser";
import express from "express";
import { connectDB } from "./db";
import userRouter from "./router/user";
import productRouter from "./router/product";
import orderRouter from "./router/order";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);

app.get("/", (req, res) => {
  res.send("------>");
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
