import type { Request, Response, NextFunction } from 'express';
import { Roll, type IRoll } from '../models/roll.js';
import { User } from '../models/user.js';
import { Prize, type IPrize } from '../models/prize.js';
import config from '../config/config.js';

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
    const rolls = await Roll.find({}, { prizes: 0 }).sort({ cost: 1 });
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
    const roll = await Roll.findById(id).populate('prizes');
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
    ).populate('prizes');

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
    const roll = await Roll.findById(rollId).populate('prizes');
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

    const result = rollPrize(roll);
    await user.updateOne({ balance: (user.balance -= roll.cost) });
    res
      .status(200)
      .json({ message: 'Success roll', prize: result.prize, chance: result.chance });
  } catch (error) {
    next(error);
  }
}

export async function chances(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const roll = await Roll.findById(id).populate('prizes');
    if (!roll) {
      res.status(404).json({ message: 'Roll not found' });
      return;
    }
    const calculatedChances = calculateChances(roll);
    res.status(200).json(calculatedChances);
  } catch (error) {
    next(error);
  }
}

type RollResult = {
  prize: IPrize | null; // null = no prize
  chance: number; // probability [0..1]
};

function rollPrize(roll: IRoll): RollResult {
  // Let calculateChances throw on internal errors — we don't swallow them here.
  const chances = calculateChances(roll); // returns RollChance[] possibly containing { prize: null, chance }

  if (!chances || chances.length === 0) {
    throw new Error('No chances returned for roll.');
  }

  const total = chances.reduce((s, c) => s + Math.max(0, c.chance), 0);
  if (total <= 0) {
    throw new Error('Total chance is zero or negative.');
  }

  let r = Math.random() * total;
  for (const ch of chances) {
    const p = Math.max(0, ch.chance);
    if (r <= p) {
      // return both the prize (nullable) and the actual probability of this outcome
      return { prize: ch.prize ?? null, chance: p / total };
    }
    r -= p;
  }

  // Rounding fallback: return last defined outcome (may be null = no prize)
  const last = chances[chances.length - 1];
  return { prize: last?.prize ?? null, chance: Math.max(0, last?.chance ?? 0) / total };
}

type RollChance = {
  prize: IPrize | null; // null = no prize
  chance: number; // probability [0..1]
};

function calculateChances(roll: IRoll) {
  if (roll.prizes.length <= 0) {
    throw new Error('No prizes in roll.');
  }
  if (roll.prizes.some((p) => !p.cost)) {
    throw new Error(
      'No cost in prize. Try to populate prize data with mongoose.',
    );
  }

  const RTP = config.RTP;
  const targetReturn = roll.cost * RTP;
  const prizes = roll.prizes;

  // If none of the prizes has cost <= roll.cost, add a "no prize" option (cost 0)
  const hasAffordable = prizes.some((p) => p.cost <= roll.cost);
  const includeNoPrize = !hasAffordable;

  // Build original costs array (append 0 for "no prize" when needed)
  const costs = prizes.map((p) => p.cost);
  if (includeNoPrize) costs.push(0);

  // Transform costs to compress large gaps so expensive prizes still get reasonable probability.
  // We will compute softmax on transformedCosts but expected payout uses original costs.
  const transformedCosts = costs.map((c) => Math.log(1 + c));

  const softmaxOnTransformed = (alpha: number) => {
    const scaled = transformedCosts.map((tc) => alpha * tc);
    const maxC = Math.max(...scaled);
    const exps = scaled.map((s) => Math.exp(s - maxC));
    const sumExps = exps.reduce((a, b) => a + b, 0);
    const probs = exps.map((e) => e / sumExps);
    const expected = probs.reduce((s, p, i) => s + p * costs[i]!, 0);
    return { probs, expected };
  };

  // If all transformed costs are equal (very unlikely), return uniform distribution
  const allEqual = transformedCosts.every((c) => c === transformedCosts[0]);
  if (allEqual) {
    const uniform = 1 / costs.length;
    const result: RollChance[] = prizes.map((p) => ({
      prize: p,
      chance: uniform,
    }));
    if (includeNoPrize) result.push({ prize: null, chance: uniform });
    return result;
  }

  // Binary search on alpha to try to match expected payout to targetReturn
  let low = -50;
  let high = 50;
  let bestProbs = costs.map(() => 1 / costs.length);
  let bestDiff = Infinity;

  for (let iter = 0; iter < 80; iter++) {
    const mid = (low + high) / 2;
    const { probs, expected } = softmaxOnTransformed(mid);
    const diff = Math.abs(expected - targetReturn);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestProbs = probs;
    }
    // increasing alpha increases weight on larger transformed costs => increases expected
    if (expected > targetReturn) {
      high = mid;
    } else {
      low = mid;
    }
  }

  // Enforce a small minimum chance per outcome so expensive prizes never become effectively 0%
  const MIN_CHANCE = 1e-4; // adjust as needed
  const n = bestProbs.length;
  const floorSum = MIN_CHANCE * n;

  let adjusted: number[] = [];

  if (floorSum >= 1) {
    // If floor would exceed 1 (extremely large MIN_CHANCE or tiny n), fallback to uniform
    adjusted = bestProbs.map(() => 1 / n);
  } else {
    // Give each outcome the MIN_CHANCE floor, then distribute remaining mass proportionally
    const remainingMass = 1 - floorSum;
    const probsWithoutFloor = bestProbs.map((p) => Math.max(0, p - MIN_CHANCE));
    const sumWithoutFloor = probsWithoutFloor.reduce((a, b) => a + b, 0);

    if (sumWithoutFloor <= 0) {
      // If nothing left after floor, distribute remaining mass uniformly
      const extra = remainingMass / n;
      adjusted = Array(n).fill(MIN_CHANCE + extra);
    } else {
      adjusted = probsWithoutFloor.map(
        (p) => MIN_CHANCE + (p / sumWithoutFloor) * remainingMass,
      );
    }
  }

  // Final normalization to avoid floating rounding issues
  const sumAdjusted = adjusted.reduce((a, b) => a + b, 0);
  adjusted = adjusted.map((p) => p / sumAdjusted);

  // Build result; if we added "no prize", it is the last probability
  const result: RollChance[] = [];
  for (let i = 0; i < prizes.length; i++) {
    result.push({ prize: prizes[i] ?? null, chance: adjusted[i]! });
  }
  if (includeNoPrize) {
    const noPrizeChance = adjusted[adjusted.length - 1]!;
    result.push({ prize: null, chance: noPrizeChance });
  }

  return result;
}
