import { ApiError } from "../utils/apiResponse.js";

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Return a standardized error response
    ApiError(res, {
        success: false,
        message,
        statusCode,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Include stack trace in development
    });
};

export default errorHandler;

