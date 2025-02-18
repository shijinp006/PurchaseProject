import express from "express";

const router = express.Router();

import { AddItems } from "../Controller/AddItems.js";

router.post("/additems", AddItems);

export default router;
