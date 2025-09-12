import { Router } from 'express';
import {
  roll
} from "../controllers/rollController.ts";

const router = Router();

router.post('/', roll);

export default router;