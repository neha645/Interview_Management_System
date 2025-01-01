import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState('');

    const handleSendOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/forgot-password', { email });
            setMessage(response.data.message);
            setStep(2);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error sending OTP');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/reset-password', {
                email,
                otp,
                newPassword
            });
            setMessage(response.data.message);
            setStep(3);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error resetting password');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {message && (
                        <div className="alert alert-info">{message}</div>
                    )}
                    
                    {step === 1 && (
                        <form onSubmit={handleSendOTP}>
                            <h2>Forgot Password</h2>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">
                                Send OTP
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleResetPassword}>
                            <h2>Reset Password</h2>
                            <div className="form-group">
                                <label>Enter OTP:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">
                                Reset Password
                            </button>
                        </form>
                    )}

                    {step === 3 && (
                        <div className="text-center">
                            <h2>Password Reset Successful!</h2>
                            <p>You can now login with your new password.</p>
                            <a href="/login" className="btn btn-primary">
                                Go to Login
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;