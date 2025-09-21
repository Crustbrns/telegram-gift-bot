import { Router } from 'express';
import {
  auth,
} from "../controllers/userController.js";

const router = Router();

router.post('/auth', auth);

export default router;