import { createInterviewService, getInterviewsService, getInterviewByIdService, getInterviewByStudentService } from '../services/interviewService.js';
import { ApiResponse, ApiError } from '../utils/apiResponse.js';

/**
 * Adds a new interview
 */
export const addInterview = async (req, res, next) => {
  try {
    const { stdId } = req.params;
    const { id: interviewerId } = req.user;

    if (!stdId) {
      return ApiError(res, {
        message: 'Student ID is required',
        statusCode: 400
      });
    }

    const interview = await createInterviewService(stdId, { ...req.body, interviewer: interviewerId });

    return ApiResponse(res, {
      statusCode: 201,
      message: 'Interview created successfully',
      data: interview
    });
  } catch (error) {
    next(error);
  }
};

// get Interview By Student
export const getInterviewByStudent = async (req, res, next) => {
  try {
    const { stdId } = req.params;
    if (!stdId) {
      return ApiError(res, {
        message: 'Student ID is required.',
        statusCode: 400
      });
    }

    const interviews = await getInterviewByStudentService(stdId);
    return ApiResponse(res, {
      message: 'Interviews retrieved successfully',
      data: interviews
    });
  } catch (error) {
    next(error);
  }
}


/**
 * Fetches all interviews
 */
export const getAllInterviews = async (req, res, next) => {
  try {
    const interviews = await getInterviewsService();
    return ApiResponse(res, {
      message: 'Interviews retrieved successfully',
      data: interviews
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Fetches a single interview by ID
 */
export const getInterview = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return ApiError(res, {
        message: 'Interview ID is required',
        statusCode: 400
      });
    }

    const interview = await getInterviewByIdService(id);
    return ApiResponse(res, {
      message: 'Interview retrieved successfully',
      data: interview
    });
  } catch (error) {
    next(error);
  }
};

