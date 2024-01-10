import express from "express";
import mongoose, { Schema, Types } from "mongoose";
import cookieParser from "cookie-parser";
import { Users } from "./models/user.js";
import { Questions } from "./models/questions.js";
import router from "./routes/user.js";
import questionRouter from "./routes/questions.js";
const app = express();
mongoose
  .connect("mongodb://127.0.0.1:27017", { dbName: "polling" })
  .then(() => {
    console.log("db connected");
  });
app.use(cookieParser());
app.use(express.json());

app.use("/user", router);
app.use(questionRouter);

app.get("/", (req, res) => {
  res.send("running");
});

app.listen(5000, () => {
  console.log("server ready..");
});
