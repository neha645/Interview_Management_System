import { axiosInstance } from "./axiosInstance";

// get interviews for a specific student
export const getInterviewsByStudentId = async (studentId) => {
    try {
        const response = await axiosInstance.get(`/api/interview/${studentId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching interviews:", error);
    }
};

// Function to add a new interview for a specific student
export const addInterview = async (studentId, interviewData) => {
    try {
        const response = await axiosInstance.post(`/api/interview/${studentId}`, interviewData);
        return response.data;
    } catch (error) {
        console.error("Error adding interview:", error);
    }
};