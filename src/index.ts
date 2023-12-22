import express from "express";
import { emailRoutes } from "./routes";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config();

app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL);

app.get("/", (_, res) => {
  res.send({
    message: "Hello world.",
  });
});

app.use("/email", emailRoutes);

app.listen(8080);
