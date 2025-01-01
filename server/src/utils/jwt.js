import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../configs/env.js';

// Generate JWT Token
export const generateToken = (id, role) => {
    return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '1h' });
};

// Verify JWT Token
export const verifyJWTToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};
