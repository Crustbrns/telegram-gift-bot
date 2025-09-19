import type { Request, Response, NextFunction } from 'express';
import { Prize } from '../models/prize.js';

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
                hash: 'TxEGqI0z7g'
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
                hash: 'TxEGqI0z7g'
            }
    } */
   try {
    const { id } = req.params;
    const updatedPrize = await Prize.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedPrize) {
      return res.status(404).json({ message: 'Prize not found' });
    }

    res
      .status(200)
      .json({ message: 'Prize updated successfully', prize: updatedPrize });
  } catch (error) {
    next(error);
  }
}

export async function deletePrize(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const deletedPrize = await Prize.findByIdAndDelete(id);
    if (!deletedPrize) {
      return res.status(404).json({ message: 'Prize not found' });
    }

    res
      .status(200)
      .json({ message: 'Prize deleted successfully', prize: deletedPrize });
  } catch (error) {
    next(error);
  }
}