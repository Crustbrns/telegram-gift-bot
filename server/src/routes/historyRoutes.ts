import { Router } from 'express';
import {
  getByUserId,
} from "../controllers/historyController.js";

const router = Router();

router.get('/:id', getByUserId);

export default router;