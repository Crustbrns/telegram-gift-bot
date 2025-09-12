import { Router } from 'express';
import {
  createPrize,
  getPrizes,
  getPrizeById,
  updatePrize,
  deletePrize,
} from '../controllers/prizeController.ts';

const router = Router();

router.get('/', getPrizes);
router.get('/:id', getPrizeById);
router.post('/', createPrize);
router.put('/:id', updatePrize);
router.delete('/:id', deletePrize);

export default router;