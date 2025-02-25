import express from 'express';

const router = express.Router();

import { AddDyingDetails } from '../Controller/Dying.js';
import {
  AddDesignCode,
  getDesignCodeDetails,
  getDesignCodeFabricItems,
  getDesignCodeDetailsBystatus,
} from '../Controller/DesignCode.js';
import { QualityCheck } from '../Controller/QualityCheck.js';
import { Shipping } from '../Controller/Shipping.js';
import { Complete } from '../Controller/Complete.js';

//Post Routes
router.post('/adddying/:id', AddDyingDetails);
router.post('/adddesigncode/:id', AddDesignCode);
router.post('/addqualitycheck/:id', QualityCheck);
router.post('/addshipping/:id', Shipping);
router.post('/addcomplete/:id', Complete);

//Get Routes

router.get('/getdesigncodedetails', getDesignCodeDetails);
router.get('/getdesigncodefabricitems/:id', getDesignCodeFabricItems);
router.get('/getdesigncodebystatus/:id', getDesignCodeDetailsBystatus);

export default router;
