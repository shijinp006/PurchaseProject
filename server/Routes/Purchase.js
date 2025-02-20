import e from "express";
import express from "express";
const router = express.Router();

import {
  Purchase,
  getPurchaseDetails,
  getPurchaseItems,
} from "../Controller/Purchase.js";

router.post("/addpurchase", Purchase);
router.get("/viewpurchase", getPurchaseDetails);
router.get("/viewpurchaseitems/:Id", getPurchaseItems);

export default router;
