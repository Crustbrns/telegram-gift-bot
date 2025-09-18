import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import config from '../config/config.js';

const router = Router();

router.get('', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pingURL = config.pingURL;
    console.log('Sending ping to ' + pingURL);
    fetch(pingURL).then(() => console.log("Successful!"));
    res.status(200).json('Ping done!');
  } catch (error) {
    next(error);
  }
});

export default router;
