import express from 'express';
import { calculateCalorie } from '../controllers/calorie_controller';

const router = express.Router();

router.post('/', calculateCalorie);

export default router;