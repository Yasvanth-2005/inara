import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import userRouter from "./Routes/UserRoutes.js";
import booksRouter from "./Routes/BookRoutes.js";
import authorRouter from "./Routes/AuthorRoutes.js";

const app = express();

// Middleware
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ extended: true, limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

// Routes
app.use("/user", userRouter);
app.use("/books", booksRouter);
app.use("/author", authorRouter);

// Serve static files from 'uploads' directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(2024, () => {
      console.log(`Server running on port 2024 🔥`);
      console.log("Database Connected Successfully ");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
