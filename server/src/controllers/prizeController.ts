import type { Request, Response, NextFunction } from 'express';
import { Prize } from '../models/prize.ts';
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
    //const { name, cost, droprate } = req.body;
    const newPrize = await Prize.create(req.body);
    res.status(201).json(newPrize);
  } catch (error) {
    next(error);
  }
}

// Read all Prizes
export async function getPrizes(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const prizes = await Prize.find();
    if (prizes.length == 0) {
      res.status(404).json({ message: 'Prizes not found' });
      return;
    }

    res.status(200).json(prizes);
  } catch (error) {
    next(error);
  }
}

// Read single Prize
export async function getPrizeById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const prize = await Prize.findById(id);
    if (!prize) {
      res.status(404).json({ message: 'Prize not found' });
      return;
    }

    res.status(200).json(prize);
  } catch (error) {
    next(error);
  }
}

// Update an Prize
export async function updatePrize(
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
  const { id } = req.params;
  try {
    const updatedPrize = await Prize.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedPrize) {
      return res.status(404).json({ message: 'Prize not found' });
    }

    res
      .status(200)
      .json({ message: 'Prize updated successfully', user: updatedPrize });
  } catch (error) {
    next(error);
  }
}

// Delete an Prize
export async function deletePrize(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params;
  try {
    const deletedPrize = await Prize.findByIdAndDelete(id);
    if (!deletedPrize) {
      return res.status(404).json({ message: 'Prize not found' });
    }

    res
      .status(200)
      .json({ message: 'Prize deleted successfully', user: deletedPrize });
  } catch (error) {
    next(error);
  }
}
