import { User } from '../models/User.js';
import { findUserByEmail, validatePassword, createTokens, verifyRefreshToken } from '../services/userService.js';
import { ApiResponse, ApiError } from '../utils/apiResponse.js';

export const registerUser = async (req, res, next) => {
    try {
        console.log("Request received in login user controller");
        console.log("Request Body: ", req.body)

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return ApiError(res, {
                message: 'Email or Password are missing',
                statusCode: 400
            });
        }
        const user = await findUserByEmail(email);

        if (user) {
            return ApiError(res, {
                message: 'User Already Exists',
                statusCode: 409
            });
        }

        const newUser = new User({ name, email, password })

        await newUser.save();

        // Return the response
        return ApiResponse(res, {
            message: 'User Registered successful',
            data: { newUser }
        });

    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        console.log("Request received in login user controller");

        const { email, password } = req.body;

        if (!email || !password) {
            return ApiError(res, {
                message: 'Email or Password are missing',
                statusCode: 400
            });
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return ApiError(res, {
                message: 'User not found',
                statusCode: 404
            });
        }

        const isPasswordValid = await validatePassword(password, user.password);

        if (!isPasswordValid) {
            return ApiError(res, {
                message: 'Invalid Password',
            });
        }

        if (!user.isActive) {
            return ApiError(res, {
                message: 'Your account is not active. Please contact admin',
            });
        }


        // Create both access and refresh tokens
        const { accessToken, refreshToken } = createTokens(user);

        // Set refresh token in HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Return the response with access token
        return ApiResponse(res, {
            message: 'Login successful',
            data: { user, accessToken }
        });
    } catch (error) {
        next(error);
    }
};

export const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return ApiError(res, {
                message: 'Refresh token not found',
                statusCode: 401
            });
        }

        const userData = await verifyRefreshToken(refreshToken);
        console.log('User data from refresh token:', userData);

        if (!userData) {
            return ApiError(res, {
                message: 'Invalid refresh token',
                statusCode: 401
            });
        }

        const { accessToken, refreshToken: newRefreshToken } = createTokens(userData);

        // Set new refresh token in HTTP-only cookie
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return ApiResponse(res, {
            message: 'Token refreshed successfully',
            data: { accessToken }
        });
    } catch (error) {
        next(error);
    }
};