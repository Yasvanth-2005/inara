import {
  editUser,
  getUser,
  loginUser,
  registerUser,
  topupBalance,
} from "../Controllers/User.js";
import tokenCheck from "../Middleware/tokenCheck.js";
import express from "express";

import upload from "../multerconfig.js";

const router = express.Router();

router.get("/", tokenCheck, getUser);
router.put("/edit", tokenCheck, upload.single("image"), editUser);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.patch("/topup", tokenCheck, topupBalance);

export default router;
