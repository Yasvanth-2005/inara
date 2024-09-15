import express from "express";
import tokenCheck from "../Middleware/tokenCheck.js";
import { editAuthor, newAuthor } from "../Controllers/Author.js";

const router = express.Router();

router.post("/", tokenCheck, newAuthor);
router.put("/edit", tokenCheck, editAuthor);

export default router;
