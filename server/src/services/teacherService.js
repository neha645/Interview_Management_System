import { Teacher } from '../models/Teacher.js';

export const findTeacherByEmailService = async (email) => {
    return await Teacher.findOne({ email });
};

export const createTeacherService = async (teacherData) => {
    try {
        const newTeacher = new Teacher(teacherData);
        return await newTeacher.save();
    } catch (error) {
        throw new Error('Error creating teacher: ' + error.message);
    }
};

export const getAllTeachersService = async () => {
    try {
        return await Teacher.find({});
    } catch (error) {
        throw new Error('Error fetching TeacherServices: ' + error.message);
    }
};

export const getTeacherByIdService = async (id) => {
    try {
        const teacher = await Teacher.findById(id);
        if (!teacher) {
            throw new Error('Teacher not found');
        }
        return teacher;
    } catch (error) {
        throw new Error('Error fetching TeacherService: ' + error.message);
    }
};

export const updateTeacherByIdService = async (id, updateData) => {
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedTeacher) {
            throw new Error('Teacher not found');
        }
        return updatedTeacher;
    } catch (error) {
        throw new Error('Error updating teacher: ' + error.message);
    }
};

export const deleteTeacherByIdService = async (id) => {
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(id);
        if (!deletedTeacher) {
            throw new Error('Teacher not found');
        }
        return deletedTeacher;
    } catch (error) {
        throw new Error('Error deleting teacher: ' + error.message);
    }
};