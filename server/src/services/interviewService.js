import { Student } from "../models/Student.js";
import { Interview } from "../models/Interview.js";
import { moveNextLevel } from "../utils/interview.js";

export const createInterviewService = async (stdId, interviewData) => {
  try {
    const student = await Student.findById(stdId);
    if (!student) {
      throw new Error("Student not found.");
    }

    if (!interviewData.interviewer) {
      throw new Error("Interviewer ID is required.");
    }

    const interview = new Interview({
      ...interviewData,
      student: stdId,
      interviewer: interviewData.interviewer
    });

    student.interviews.push(interview._id);

    if (interviewData.result === "Passed") {
      student.level = moveNextLevel(interviewData.level);
    }

    await Promise.all([interview.save(), student.save()]);

    const populatedInterview = await Interview.findById(interview._id).populate({ path: "interviewer", model: "User" })

    return populatedInterview;
  } catch (error) {
    throw new Error(`Failed to create interview: ${error.message}`);
  }
};

export const getInterviewsService = async () => {
  try {
    return await Interview.find().populate("student");
  } catch (error) {
    throw new Error(`Failed to retrieve interviews: ${error.message}`);
  }
};

export const getInterviewByIdService = async (id) => {
  try {
    const interview = await Interview.findById(id).populate("student");
    return interview;
  } catch (error) {
    throw new Error(`Failed to retrieve interview: ${error.message}`);
  }
};


export const getInterviewByStudentService = async (stdId) => {
  try {
    return await Interview.find({ student: stdId }).populate("student").populate({ path: "interviewer", model: "User" });
  } catch (error) {
    throw new Error(`Failed to retrieve interviews: ${error.message}`);
  }
}