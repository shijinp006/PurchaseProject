import e from "express";
import express from "express";
const router = express.Router();

import { Purchase } from "../Controller/Purchase.js";

router.post("/addpurchase", Purchase);

export default router;
