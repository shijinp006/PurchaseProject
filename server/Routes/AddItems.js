import express from 'express';

const router = express.Router();

import { AddItems, getItems } from '../Controller/AddItems.js';

router.post('/additems', AddItems);
router.get('/getitems', getItems);

export default router;
