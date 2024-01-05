import { Request, Response, NextFunction } from "express";

type ControllerType<T = Request> = (
  req: T,
  res: Response,
  next: NextFunction
) => Promise<void>;

const asyncHandler =
  <T = Request>(controller: ControllerType<T>) =>
  async (req: T, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };

export { asyncHandler };
