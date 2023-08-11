import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./errorHandler";
import { JWT_SECRET } from "../config/env";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError(401, "Authentication token is missing"));
  }

  // Expecting the token in the format: "Bearer TOKEN_VALUE"
  const token = authHeader.split(" ")[1];

  try {
    // Verifying the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // You can store user information in the req object if the token contains it
    //@ts-ignore
    req.user = decoded;

    next();
  } catch (error) {
    return next(new AppError(401, "Invalid or expired token"));
  }
};
