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
    const { title, message } = req.body;
    const user = req.user;

    // Create the new Post
    await Post.create({ title, message, user: user._id });

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

    const filter = getFilters({ userId, stringDate: date as string });

    const posts = await Post.find(filter)
      .limit(numLimit)
      .skip(numSkip)
      .populate("user")
      .exec();

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

    const { date, search, limit, page } = req.query;

    const filter = getFilters({
      stringDate: date as string,
      search: search as string,
    });

    const { numLimit, numSkip } = getLimitAndSkip(
      limit ? (limit as string) : "3",
      page ? (page as string) : "1"
    );

    const posts = await Post.find(filter)
      .limit(numLimit)
      .skip(numSkip)
      .populate("user")
      .exec();

    const totalPosts = await Post.countDocuments(filter);
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
