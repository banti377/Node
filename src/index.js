import bodyParser from "body-parser";
import Express from "express";
import { connectDB } from "./db";
import userRouter from "./router/user";

const app = Express();

const port = process.env.PORT || 3000;

hello world

app.use(Express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("------>");
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
