import dotenv from 'dotenv';
dotenv.config();

// DATABASE SERVER CONFIG
export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT;
export const DEFAULT_USER_PASSWORD = process.env.DEFAULT_USER_PASSWORD;
export const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;

// JWT SECTRE
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
