import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user: {
    role: string;
  };
}

const admin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== "admin") {
    res.status(404).json({
      success: false,
      message: "Access denied. Check role",
    });
  }
  next();
};

export { admin };
