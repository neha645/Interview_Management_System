import axiosInstance from "./axiosInstance";

export const loginUser = async ({ email, password }) => {
    const response = await axiosInstance .post(`/api/user/login`, { email, password })
    return response.data;
}