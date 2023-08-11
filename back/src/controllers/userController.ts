import { Request, Response } from "express";
import { comparePasswords, hashPassword } from "../helpers/utils";
import User, { IUser } from "../models/User";
import { encodeJWT } from "../helpers/jwt";

/**
 * Register a new user.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Check if user with the given email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "User with this email already exists.",
    });
  }

  try {
    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the new user
    const user: IUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = encodeJWT(user);

    // Respond to the client
    res.status(201).json({
      message: "User created successfully.",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user.",
      error: error,
    });
  }
};

/**
 * Login an user.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 */
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if user with the given email exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  try {
    // Check if the password matches the hash in DB
    const isPasswordCorrect = await comparePasswords(password, user.password);

    if (isPasswordCorrect) {
      const userJSON = user.toJSON()
      const token = encodeJWT(userJSON);

      // Respond to the client with the user and the token
      res.status(201).json({
        message: "User loged in successfully.",
          userJSON,
          token,
      });
    } else {
      // Respond for a incorrect password
      res.status(401).json({
        message: "Incorrect password.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error login user.",
      error: error,
    });
  }
};
