import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import config from '../config/config.js';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pingURL = config.pingURL;
    await fetch(pingURL);
    console.log('Sended ping to ' + pingURL);
    res.status(200);
  } catch (error) {
    next(error);
  }
});

export default router;
