// src/models/User.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
});

export default mongoose.model<IUser>('User', userSchema);
