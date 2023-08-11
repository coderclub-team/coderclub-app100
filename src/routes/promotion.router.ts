import express from 'express';
import { getAllPromotions } from '../controllers/Promotion.controller';

const router = express.Router();

router.get('/', getAllPromotions);

export default router;
