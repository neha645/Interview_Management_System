import { DEFAULT_USER_PASSWORD } from '../configs/env.js';
import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

// Create a base user Schema  
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, default: DEFAULT_USER_PASSWORD },
    role: { type: String, enum: ["Admin", "teacher", "Student"], required: true },
    isActive: { type: Boolean, default: true },
    otp: { type: String },
    otpExpiry: { type: Date }
}, {
    timestamps: true,
    discriminatorKey: 'role',
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            delete ret.__t;
            return ret;
        }
    }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Create the base User model
export const User = mongoose.model('User', userSchema);

