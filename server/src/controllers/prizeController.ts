import type { Request, Response, NextFunction } from 'express';
import { Prize } from '../model/prize.ts';
import { randomUUID } from 'crypto';

// Create an Prize
export async function createPrize(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add new prize.',
            schema: {
                name: 'Flower',
                cost: 100,
                droprate: 0.1
            }
    } */
  try {
    const { name, cost, droprate }: { name: string, cost: number, droprate: number } = req.body;
    const newPrize = await Prize.create({ id: randomUUID(), name, cost, droprate });
    res.status(201).json(newPrize);
  } catch (error) {
    next(error);
  }
}

// Read all Prizes
export const getPrizes = (req: Request, res: Response, next: NextFunction) => {
  throw { name: 'NotImplementedError', message: 'too lazy to implement' };
};

// Read single Prize
export const getPrizeById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  throw { name: 'NotImplementedError', message: 'too lazy to implement' };
};

// Update an Prize
export const updatePrize = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  throw { name: 'NotImplementedError', message: 'too lazy to implement' };
};

// Delete an Prize
export const deletePrize = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  throw { name: 'NotImplementedError', message: 'too lazy to implement' };
};
