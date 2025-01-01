import { ApiResponse, ApiError } from '../utils/apiResponse.js';
import {
  getAllTeachersService,
  getTeacherByIdService,
  updateTeacherByIdService,
  deleteTeacherByIdService,
  createTeacherService
} from '../services/teacherService.js';

export const createTeacher = async (req, res, next) => {
  try {
    const { name, email, phone, specialization, experience } = req.body;
    const newTeacher = await createTeacherService({ name, email, phone, specialization, experience });
    ApiResponse(res, { message: "Teacher created successfully", data: newTeacher, statusCode: 201 });
  } catch (error) {
    next(error);
  }
};

export const getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await getAllTeachersService();
    ApiResponse(res, { message: "Teachers fetched successfully", data: teachers });
  } catch (error) {
    next(error);
  }
};

export const getTeacherById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const teacher = await getTeacherByIdService(id);
    if (!teacher) {
      return ApiError(res, { message: "Teacher not found", statusCode: 404 });
    }
    ApiResponse(res, { message: "Teacher fetched successfully", data: teacher });
  } catch (error) {
    next(error);
  }
};

export const updateTeacherById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTeacher = await updateTeacherByIdService(id, req.body);
    if (!updatedTeacher) {
      return ApiError(res, { message: "Teacher not found", statusCode: 404 });
    }
    ApiResponse(res, { message: "Teacher updated successfully", data: updatedTeacher });
  } catch (error) {
    next(error);
  }
};

export const deleteTeacherById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTeacher = await deleteTeacherByIdService(id);
    if (!deletedTeacher) {
      return ApiError(res, { message: "Teacher not found", statusCode: 404 });
    }
    ApiResponse(res, { message: "Teacher deleted successfully" });
  } catch (error) {
    next(error);
  }
};