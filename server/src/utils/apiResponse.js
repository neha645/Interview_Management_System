
export const ApiResponse = (res, { success = true, message, data, statusCode = 200 }) => {
    console.log(`API Response: [${statusCode}] ${success} - ${message}`);

    res.status(statusCode).json({
        success,
        message,
        data,
    });
};

export const ApiError = (res, { success = false, message, statusCode = 500, errors }) => {
    console.error(`API Error: [${statusCode}] ${message}`, errors);

    res.status(statusCode).json({
        success,
        message,
        ...(errors && { errors }),
    });
};
