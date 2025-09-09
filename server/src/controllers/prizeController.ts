import type { Request, Response, NextFunction } from "express";
import type { Prize, prizes } from "../model/prize.ts";

// Create an Prize
export const createPrize = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  throw { name: "NotImplementedError", message: "too lazy to implement" };
};

// Read all Prizes
export const getPrizes = (req: Request, res: Response, next: NextFunction) => {
  throw { name: "NotImplementedError", message: "too lazy to implement" };
};

// Read single Prize
export const getPrizeById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  throw { name: "NotImplementedError", message: "too lazy to implement" };
};

// Update an Prize
export const updatePrize = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  throw { name: "NotImplementedError", message: "too lazy to implement" };
};

// Delete an Prize
export const deletePrize = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  throw { name: "NotImplementedError", message: "too lazy to implement" };
};
