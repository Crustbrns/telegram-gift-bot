import type { Request, Response, NextFunction } from 'express';
import { History } from '../models/history.js';

export async function getByUserId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const history = await History.find({ user: id }).populate([
      'user',
      'prize',
      'roll',
    ]);
    if (!history) {
      res.status(404).json({ message: 'History not found' });
      return;
    }

    res.status(200).json(history);
  } catch (error) {
    next(error);
  }
}
