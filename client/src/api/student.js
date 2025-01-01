import { axiosInstance } from "./axiosInstance";

// Function to get all students
export const getAllStudents = async () => {
    try {
        const response = await axiosInstance.get('/api/student');
        return response.data;
    } catch (error) {
        console.error("Error fetching students:", error);
    }
};

// Function to get student by ID
export const getStudentById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/student/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching students:", error);
    }
};

// Function to add a new student with a UUID
export const addStudent = async (studentData) => {
    try {
        const response = await axiosInstance.post('/api/student', studentData);
        return response.data;
    } catch (error) {
        console.error("Error adding student:", error);
    }
};

