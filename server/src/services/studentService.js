import { Student } from '../models/Student.js';

export const createStudentService = async (studentData) => {
    try {
        const student = new Student(studentData);
        await student.save();
        return student;
    } catch (error) {
        throw new Error(`Failed to create student: ${error.message}`);
    }
};

export const checkStudentExistsService = async (email) => {
    try {
        const student = await Student.findOne({ email });
        return!!student;
    } catch (error) {
        throw new Error(`Failed to check student existence: ${error.message}`);
    }
};

export const getAllStudentsService = async () => {
    try {
        const students = await Student.find().populate({
            path: "interviews",
            populate: { path: "interviewer", model: "User" },
        });

        return students;
    } catch (error) {
        throw new Error(`Failed to retrieve students: ${error.message}`);
    }
};

export const getStudentByIdService = async (id) => {
    try {
        const student = await Student.findById(id).populate({
            path: "interviews",
            populate: {
                path: "interviewer",
                model: "User"
            }
        });

        return student;
    } catch (error) {
        throw new Error(`Failed to retrieve student: ${error.message}`);
    }
};