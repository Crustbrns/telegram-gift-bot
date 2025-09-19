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

type RollChance = {
  prize: IPrize | null; // null = no prize
  chance: number; // probability [0..1]
};

function calculateChances(roll: IRoll) {
  if (roll.prizes.length <= 0) {
    throw new Error(
      'No prizes in roll.',
    );
  }
  if (roll.prizes.some((p) => !p.cost)) {
    throw new Error(
      'No cost in prize. Try to populate prize data with mongoose.',
    );
  }

const eps = 1e-12;
  const tol = 1e-9;

  const targetReturn = roll.cost * config.RTP;
  const prizes = roll.prizes;
  const rollCost = roll.cost;

  const totalPrizeCost = prizes.reduce((sum, p) => sum + p.cost, 0);

  const costs = prizes.map((p) => p.cost);
  const hasLowerPrize = costs.some((c) => c < rollCost);
  const includeNull = !hasLowerPrize;

  // extended arrays (optionally include null with cost=0)
  const costsExt = includeNull ? [...costs, 0] : [...costs];
  const nVars = costsExt.length;

  // quick feasibility checks:
  const maxCost = Math.max(...costs);
  const minCost = Math.min(...costs);
  if (!includeNull) {
    // if we must always give a prize (no null), expected return must be in [minCost, maxCost]
    if (targetReturn < minCost - tol || targetReturn > maxCost + tol) {
      throw new Error(
        `Impossible: when every roll must return a prize, target return (${targetReturn}) must be between min prize cost (${minCost}) and max prize cost (${maxCost}).`
      );
    }
  } else {
    // with null allowed, targetReturn must be in [0, maxCost]
    if (targetReturn < -tol || targetReturn > maxCost + tol) {
      throw new Error(
        `Impossible: target return (${targetReturn}) must be between 0 and max prize cost (${maxCost}) when "no prize" is allowed.`
      );
    }
  }

  // base weights (prefer lower-cost prizes): w_i = 1 / cost (null base = 0).
  // protect against division by zero
  const base = costsExt.map((c, i) =>
    i < prizes.length ? 1 / (c + eps) : 0
  );

  // constraints: A p = b
  // A rows: [1,1,1,...] (sum = 1) and [costs...] (expected payout = targetReturn)
  const b0 = 1;
  const b1 = targetReturn;

  // active-set style: freeIndices = indices we still solve for; others fixed to zero
  let freeIndices = Array.from(Array(nVars).keys());
  const fixedZero = new Set<number>();

  const solveForFree = (freeIdx: number[]): number[] => {
    // Solve p_free = w_free - A_free^T * lambda, where
    // lambda = inv(A_free A_free^T) * (A_free w_free - b)
    const k = freeIdx.length;
    if (k === 0) return [];

    const wf = freeIdx.map((i) => base[i]);
    const costsF = freeIdx.map((i) => costsExt[i]);

    // A_free * w_free
    const Aw0 = wf.reduce((s, v) => s! + v!, 0);
    const Aw1 = wf.reduce((s, v, idx) => s! + v! * costsF[idx]!, 0);

    const rhs0 = Aw0! - b0;
    const rhs1 = Aw1! - b1;

    // M = A_free * A_free^T (2x2)
    const M00 = k;
    const M01 = costsF.reduce((s, c) => s! + c!, 0);
    const M11 = costsF.reduce((s, c) => s! + c! * c!, 0);

    let det = M00 * M11! - M01! * M01!;

    // handle near-singular case
    if (Math.abs(det) < 1e-14) {
      // if k == 1, check direct feasibility; otherwise regularize slightly
      if (k === 1) {
        const c = costsF[0];
        // two equalities on single var: p = 1 and p * c = targetReturn
        // feasible only when c ~= targetReturn
        if (Math.abs(c! - targetReturn) < 1e-9) {
          return [1];
        } else {
          // this free set cannot satisfy both equalities; return the base as fallback
          throw new Error("idk");
        }
      } else {
        // small regularization to invert
        det += 1e-12;
      }
    }

    const inv00 = M11! / det;
    const inv01 = -M01! / det;
    const inv11 = M00 / det;

    const lam0 = inv00 * rhs0 + inv01 * rhs1;
    const lam1 = inv01 * rhs0 + inv11 * rhs1;

    // p_j = wf_j - (lam0 + lam1 * cost_j)
    const pFree = wf.map((wfj, idx) => wfj! - (lam0 + lam1 * costsF[idx]!));
    return pFree;
  };

  // iterative active-set: if some p_free < 0, fix them at zero and repeat
  for (let iter = 0; iter < 50; iter++) {
    const pFree = solveForFree(freeIndices);
    // find negative entries
    const negatives = pFree
      .map((v, i) => ({ idx: freeIndices[i], v }))
      .filter((x) => x.v < -1e-9)
      .map((x) => x.idx);

    if (negatives.length === 0) {
      // build full p vector
      const p = new Array(nVars).fill(0);
      for (let i = 0; i < freeIndices.length; i++) {
        const idx = freeIndices[i];
        p[idx!] = Math.max(0, pFree[i]!);
      }
      // final numerical cleanup (clip tiny negatives to 0)
      for (let i = 0; i < p.length; i++) {
        if (p[i] < 1e-12) p[i] = 0;
      }

      // return mapping to prizes + optional null
      const result: RollChance[] = [];
      for (let i = 0; i < prizes.length; i++) {
        result.push({ prize: prizes[i] ?? null, chance: p[i] ?? 0 });
      }
      if (includeNull) {
        const pNull = p[nVars - 1] ?? 0;
        result.push({ prize: null, chance: pNull });
      }
      // final numeric normalization to ensure sum ~ 1 (tiny rounding adjust)
      const sumCh = result.reduce((s, r) => s + r.chance, 0);
      if (Math.abs(sumCh - 1) > 1e-9) {
        // renormalize very tiny rounding errors (shouldn't change expectations significantly)
        for (const r of result) r.chance /= sumCh;
      }
      return result;
    }

    // fix those negatives to zero and repeat
    for (const idx of negatives) {
      if (!fixedZero.has(idx!)) {
        fixedZero.add(idx!);
        freeIndices = freeIndices.filter((i) => i !== idx);
      }
    }
    // if no free variables remain, break
    if (freeIndices.length === 0) break;
  }

  // fallback (shouldn't usually happen): distribute uniformly among remaining free indices then scale:
  const fallback = new Array(nVars).fill(0);
  const rem = freeIndices.length;
  if (rem === 0) {
    // nothing left; give all to null (if present) or throw
    if (includeNull) {
      fallback[nVars - 1] = 1;
      return [
        ...prizes.map((p) => ({ prize: p, chance: 0 })),
        { prize: null, chance: 1 },
      ];
    } else {
      throw new Error("Failed to compute probabilities (unexpected).");
    }
  } else {
    freeIndices.forEach((i) => (fallback[i] = 1 / rem));
    // normalize
    const sum = fallback.reduce((s, v) => s + v, 0);
    for (let i = 0; i < fallback.length; i++) fallback[i] /= sum;
    const out: RollChance[] = [];
    for (let i = 0; i < prizes.length; i++)
      out.push({ prize: prizes[i]?? null, chance: fallback[i] ?? 0 });
    if (includeNull) out.push({ prize: null, chance: fallback[nVars - 1] ?? 0 });
    return out;
  }
}
