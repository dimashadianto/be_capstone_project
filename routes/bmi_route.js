import express from 'express';
import { calculateBMI } from '../controllers/bmi_controller';

const router = express.Router();

router.post('/', calculateBMI);

export default router;