import React from "react";
import {
  FaGraduationCap,
  FaCode,
  FaStar,
  FaCheckCircle,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";

const InterviewCard = ({ interview }) => {
  const getResultColor = (result) => {
    switch (result.toLowerCase()) {
      case "passed":
        return "text-green-500";
      case "failed":
        return "text-red-500";
      default:
        return "text-yellow-500";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-700 dark:text-white rounded-lg shadow-md p-6 mb-4 transition-all duration-300 hover:shadow-lg border-l-4 border-blue-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
          <FaGraduationCap className="mr-2 text-blue-500" />
          {interview.level} Interview
        </h3>
        <span className="text-sm text-gray-500 dark:text-white flex items-center">
          <FaCalendarAlt className="mr-1 text-blue-500" />
          {new Date(interview.date).toLocaleDateString()}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <p className="text-gray-600 dark:text-white flex items-center">
          <FaCode className="mr-2 text-blue-500" />
          <span className="font-semibold px-2">Skills:</span> {interview.skills}
        </p>
        <p className="text-gray-600 dark:text-white flex items-center">
          <FaStar className="mr-2 text-yellow-500" />
          <span className="font-semibold px-2">Score:</span> {interview.score}
        </p>
        <p
          className={`flex items-center ${getResultColor(
            interview.result
          )}`}
        >
          <FaCheckCircle className="mr-2" />
          <span className="font-semibold px-2 ">Result:</span> {interview.result}
        </p>
        <p className="text-gray-600 dark:text-white flex items-center">
          <FaUser className="mr-2 text-blue-500" />
              <span className="font-semibold px-2">Interviewer:</span>{" "}
        {interview.interviewer?.name || "Not specified"}
        </p>
      </div>
    </div>
  );
};

export default InterviewCard;
