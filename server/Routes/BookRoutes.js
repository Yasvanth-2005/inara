import express from "express";
import {
  getLatestBooks,
  getSearchBooks,
  newBook,
  getBook,
  saveBook,
  removeSavedBook,
} from "../Controllers/Books.js";
import tokenCheck from "../Middleware/tokenCheck.js";
import upload from "../multerconfig.js";

const router = express.Router();

router.post("/new", tokenCheck, upload.single("bookCover"), newBook);
router.put("/save/:id", tokenCheck, saveBook);
router.put("/remove/:id", tokenCheck, removeSavedBook);
router.get("/get/:id", getBook);
router.get("/latest", getLatestBooks);
router.get("/search/:search", getSearchBooks);

export default router;
