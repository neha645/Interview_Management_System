import {
  checkStudentExistsService,
  createStudentService,
  getAllStudentsService,
  getStudentByIdService,
} from '../services/studentService.js';
import { ApiResponse, ApiError } from '../utils/apiResponse.js';

/**
 * Creates a new student
 */
export const createStudent = async (req, res, next) => {
  try {
    const existenceCheck = await checkStudentExistsService(req.body.email);
    if (existenceCheck) {
      return ApiError(res, {
        message: 'Email already exists.',
        statusCode: 409
      });
    }
    const student = await createStudentService(req.body);
    return ApiResponse(res, {
      statusCode: 201,
      message: 'Student created successfully',
      data: student
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Fetches all students
 */
export const getStudents = async (req, res, next) => {
  try {
    const students = await getAllStudentsService();
    return ApiResponse(res, {
      message: 'Students retrieved successfully.',
      data: students
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Fetches a single student by ID
 */
export const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ID parameter
    if (!id) {
      return ApiError(res, {
        message: 'Student ID is required.',
        statusCode: 400
      });
    }

    const student = await getStudentByIdService(id);

    if (!student) {
      return ApiError(res, {
        message: 'Student not found',
        statusCode: 404
      });
    }

    return ApiResponse(res, {
      message: 'Student retrieved successfully.',
      data: student
    });
  } catch (error) {
    next(error);
  }
};