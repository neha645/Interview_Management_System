export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const isOTPValid = (otpExpiry) => {
    return new Date() < new Date(otpExpiry);
};