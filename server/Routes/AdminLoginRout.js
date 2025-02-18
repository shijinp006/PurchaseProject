import express from "express";

const router = express.Router();

import { login, AdminLogout } from "../Controller/AdminLogin.js";

router.post("/login", login);
router.post("/logout", AdminLogout);

export default router;
