import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectMongoDB from "./database/connectMongoDB.js";
import authRouter from "./routers/auth.router.js";

const app = express();

import dotenv from "dotenv";
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:4000",
  })
);
app.use(express.json()); // for parsing application/json

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser()); // for parsing cookies in requests

app.use("/api/auth", authRouter); // http://localhost:5000/api/auth/signup

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  connectMongoDB();
});
