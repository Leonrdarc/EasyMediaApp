import { NextFunction, Request, Response } from "express";
import {
  comparePasswords,
  getFilters,
  getLimitAndSkip,
  hashPassword,
} from "../helpers/utils";
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
    if (!req.user) {
      return next(new AppError(401, "Authentication is required"));
    }
    const { title, content } = req.body;
    const user = req.user;

    // Create the new Post
    await Post.create({ title, content, userId: user._id });

    // Respond to the client
    res.status(201).json({
      message: "Post created successfully.",
    });
  } catch (error) {
    return next(error);
  }
};

export const getMyPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(new AppError(401, "Authentication is required"));
    }

    const userId = req.user._id;
    const { date, limit, page } = req.query;

    const { numLimit, numSkip } = getLimitAndSkip(
      limit ? (limit as string) : "3",
      page ? (page as string) : "1"
    );

    // Filter by publishDate if provided in query params
    const filter = getFilters(userId, date as string | undefined);

    const posts = await Post.find(filter).limit(numLimit).skip(numSkip).exec();

    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / numLimit);

    res.json({
      data: posts,
      meta: {
        total: totalPosts,
        page: page,
        limit: numLimit,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(new AppError(401, "Authentication is required"));
    }

    const { limit, page } = req.query;

    const { numLimit, numSkip } = getLimitAndSkip(
      limit ? (limit as string) : "3",
      page ? (page as string) : "1"
    );

    const posts = await Post.find({}).limit(numLimit).skip(numSkip).exec();

    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / numLimit);

    res.json({
      data: posts,
      meta: {
        total: totalPosts,
        page: page,
        limit: numLimit,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    return next(error);
  }
};
