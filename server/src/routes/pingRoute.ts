import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pingURL = req.host + '/ping';
    await fetch(pingURL);
    console.log('Sended ping to ' + pingURL);
    res.status(200);
  } catch (error) {
    next(error);
  }
});

export default router;
