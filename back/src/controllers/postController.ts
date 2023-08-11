import { NextFunction, Request, Response } from "express";
import { comparePasswords, hashPassword } from "../helpers/utils";
import User, { IUser } from "../models/User";
import { encodeJWT } from "../helpers/jwt";
import { AppError } from "../middlewares/errorHandler";
import Post from "../models/Post";

/**
 * Register a new user.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content } = req.body;
    const user = req.user;

    // Create the new Post
    await Post.create({ title, content, userId: user?._id });

    // Respond to the client
    res.status(201).json({
      message: "Post created successfully.",
    });
  } catch (error) {
    return next(error);
  }
};
