import { Router } from 'express';
import {
  chances,
  createRoll,
  deleteRoll,
  getRollById,
  getRolls,
  roll,
  updateRoll
} from "../controllers/rollController.js";

const router = Router();

router.get('/', getRolls);
router.get('/:id', getRollById);
router.post('/', createRoll);
router.put('/:id', updateRoll);
router.delete('/:id', deleteRoll);

router.post('/roll', roll);
router.get('/chances/:id', chances);

export default router;