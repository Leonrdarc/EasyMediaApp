import { NextFunction, Request, Response } from "express";
import { comparePasswords, hashPassword } from "../helpers/utils";
import User, { IUser } from "../models/User";
import { encodeJWT } from "../helpers/jwt";
import { AppError } from "../middlewares/errorHandler";

/**
 * Register a new user.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    // Check if user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError(400, "User with this email already exists.");
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the new user
    const user: IUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const userJSON = user.toJSON();
    const token = encodeJWT(userJSON);

    // Respond to the client
    res.status(201).json({
      message: "User created successfully.",
      user: userJSON,
      token,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Login an user.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Check if user with the given email exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(404, "User not found");
    }

    // Check if the password matches the hash in DB
    const isPasswordCorrect = await comparePasswords(password, user.password);

    if (isPasswordCorrect) {
      const userJSON = user.toJSON();
      const token = encodeJWT(userJSON);

      // Respond to the client with the user and the token
      res.status(201).json({
        message: "User loged in successfully.",
        user: userJSON,
        token,
      });
    } else {
      // Respond for a incorrect password
      throw new AppError(401, "Incorrect password.");
    }
  } catch (error) {
    return next(error);
  }
};
