import type { Request, Response, NextFunction } from "express";

export const roll = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  throw { name: "NotImplementedError", message: "too lazy to implement" };
};