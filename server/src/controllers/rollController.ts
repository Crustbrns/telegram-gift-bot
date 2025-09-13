import type { Request, Response, NextFunction } from 'express';
import { Roll, type IRoll } from '../models/roll.ts';
import { User } from '../models/user.ts';
import { Prize, type IPrize } from '../models/prize.ts';
import config from '../config/config.ts';

export async function createRoll(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add new roll.',
            schema: {
                name: 'Grant prize',
                cost: 100,
                prizeIds: ["68c57b26e3c95444e5073354","68c57b2de3c95444e5073356","68c57b35e3c95444e5073358"]
            }
    } */
  try {
    const { prizeIds } = req.body;
    const prizes = await Prize.find({
      _id: { $in: prizeIds },
    });
    const newRoll = await Roll.create({ ...req.body, prizes });
    res.status(201).json(newRoll);
  } catch (error) {
    next(error);
  }
}

export async function getRolls(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const rolls = await Roll.find();
    if (rolls.length == 0) {
      res.status(404).json({ message: 'Rolls not found' });
      return;
    }

    res.status(200).json(rolls);
  } catch (error) {
    next(error);
  }
}

export async function getRollById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const roll = await Roll.findById(id);
    if (!roll) {
      res.status(404).json({ message: 'Roll not found' });
      return;
    }

    res.status(200).json(roll);
  } catch (error) {
    next(error);
  }
}

export async function updateRoll(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add new roll.',
            schema: {
                name: 'Grant prize',
                cost: 100,
                prizeIds: ["68c57b26e3c95444e5073354","68c57b2de3c95444e5073356","68c57b35e3c95444e5073358"]
            }
    } */
  try {
    const { prizeIds } = req.body;
    const prizes = await Prize.find({
      _id: { $in: prizeIds },
    });

    const { id } = req.params;
    const updatedRoll = await Roll.findByIdAndUpdate(
      id,
      { ...req.body, prizes },
      {
        new: true,
      },
    );

    if (!updatedRoll) {
      return res.status(404).json({ message: 'Roll not found' });
    }

    res
      .status(200)
      .json({ message: 'Roll updated successfully', roll: updatedRoll });
  } catch (error) {
    next(error);
  }
}

export async function deleteRoll(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const deletedRoll = await Roll.findByIdAndDelete(id);
    if (!deletedRoll) {
      return res.status(404).json({ message: 'Roll not found' });
    }

    res
      .status(200)
      .json({ message: 'Roll deleted successfully', roll: deletedRoll });
  } catch (error) {
    next(error);
  }
}

export async function roll(req: Request, res: Response, next: NextFunction) {
  try {
    const { rollId, userId } = req.body;
    const roll = await Roll.findById(rollId);
    if (!roll) {
      res.status(404).json({ message: 'Roll not found' });
      return;
    }

    const user = await User.findById(userId); //auth check(?)
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (user.balance < roll.cost) {
      res.status(400).json({ message: 'Sufficient balance' });
      return;
    }

    //const prize = rollPrize(roll);
    user.balance -= roll.cost;
    //res.status(200).json({ message: 'Success roll', prize: prize });
  } catch (error) {
    next(error);
  }
}

export async function chances(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const roll = await Roll.findById(id);
    if (!roll) {
      res.status(404).json({ message: 'Roll not found' });
      return;
    }
    //const calculatedChances = calculateChances(roll);
    //res.status(200).json(calculatedChances);
  } catch (error) {
    next(error);
  }
}

// function rollPrize(roll: IRoll): IPrize | null {
//   const RTP = config.RTP;
//   const targetReturn = roll.cost * RTP;

//   // Weight prizes toward target RTP
//   const weights = roll.prizes.map((p) =>
//     Math.max(0.01, targetReturn / (p.cost || 1)),
//   );

//   const sum = weights.reduce((a, b) => a + b, 0);

//   const rand = Math.random() * sum;
//   let cumulative = 0;
//   for (let i = 0; i < roll.prizes.length; i++) {
//     cumulative += weights[i] ?? 0;
//     if (rand <= cumulative) {
//       return roll.prizes[i] ?? null;
//     }
//   }
//   return null;
// }

// type PrizeChance = {
//   prize: IPrize | null;
//   dropRate: number;
// };

// function calculateChances(roll: IRoll) {
//   const targetReturn = roll.cost * config.RTP;

//   // --- Step 1: calculate weights ---
//   // smaller-value prizes get higher weight, bigger-value prizes get lower
//   const weights = roll.prizes.map((p) =>
//     Math.max(0.01, targetReturn / (p.cost || 1)),
//   );

//   const sumWeights = weights.reduce((a, b) => a + b, 0);

//   // --- Step 2: convert to probabilities ---
//   const rawProbs = weights.map((w) => w / sumWeights);

//   // --- Step 3: compute expected return from these prizes ---
//   const expectedReturn = roll.prizes.reduce(
//     (sum, prize, i) => sum + prize.cost * rawProbs[i]!,
//     0,
//   );

//   // --- Step 4: adjust with "null" probability ---
//   // if expectedReturn > targetReturn, add null to reduce it
//   let nullRate = 0;
//   if (expectedReturn > targetReturn) {
//     nullRate = 1 - targetReturn / expectedReturn;
//   }

//   // scale down prize probabilities to fit remaining space
//   const scale = 1 - nullRate;
//   const finalProbs = rawProbs.map((p) => p * scale);

//   // --- Step 5: package result ---
//   const result: PrizeChance[] = roll.prizes.map((prize, i) => ({
//     prize,
//     dropRate: finalProbs[i]!,
//   }));

//   if (nullRate > 0) {
//     result.push({ prize: null, dropRate: nullRate });
//   }

//   return result;
// }
