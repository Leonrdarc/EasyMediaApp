import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { hashPassword } from '../helpers/utils';
import User, { IUser } from '../models/User';


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
            message: 'User with this email already exists.'
        });
    }

    try {
        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create the new user
        const user: IUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        // Respond to the client
        res.status(201).json({
            message: 'User created successfully.',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating user.',
            error: error
        });
    }
};
