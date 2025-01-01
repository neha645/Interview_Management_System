import React from "react";
import { Field, ErrorMessage } from 'formik';
import {
  FaTimes,
  FaGraduationCap,
  FaCode,
  FaStar,
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";

const InterviewModal = ({
  isOpen,
  onClose,
  interviewer,
  student,
  formikProps
}) => {
  if (!isOpen) return null;

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } = formikProps;

  const handleScoreChange = (e) => {
    const score = parseInt(e.target.value);
    setFieldValue('score', score);
    setFieldValue('result', score >= 6 ? "Passed" : "Failed");
  };

  const getScoreColor = (score) => {
    if (score >= 6) return "text-green-500";
    if (score >= 5) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative p-8 border w-full max-w-md shadow-lg rounded-lg bg-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={24} />
        </button>
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <FaGraduationCap className="mr-2 text-blue-500" />
          Add New Interview
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="level"
              className="text-sm font-medium text-gray-700 mb-1 flex items-center"
            >
              <FaGraduationCap className="mr-2 text-blue-500" />
              Level
            </label>
            <Field
              type="text"
              id="level"
              name="level"
              disabled
              value={student.level}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <ErrorMessage name="level" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label
              htmlFor="skills"
              className="text-sm font-medium text-gray-700 mb-1 flex items-center"
            >
              <FaCode className="mr-2 text-blue-500" />
              Skills
            </label>
            <Field
              as="select"
              id="skills"
              name="skills"
              className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select a Skill</option>
              {interviewer.specialization && interviewer.specialization.split(',').map((skill, index) => (
                <option key={index} value={skill.trim()}>
                  {skill.trim()}
                </option>
              ))}
            </Field>
            <ErrorMessage name="skills" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label
              htmlFor="score"
              className="text-sm font-medium text-gray-700 mb-1 flex items-center"
            >
              <FaStar className="mr-2 text-yellow-500" />
              Score
            </label>
            <input
              type="range"
              id="score"
              name="score"
              min="0"
              max="10"
              value={values.score}
              onChange={handleScoreChange}
              className="mt-1 block w-full"
              required
            />
            <div
              className={`text-center font-bold text-2xl ${getScoreColor(
                values.score
              )}`}
            >
              {values.score}
            </div>
            <ErrorMessage name="score" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label
              htmlFor="result"
              className="text-sm font-medium text-gray-700 mb-1 flex items-center"
            >
              <FaCheckCircle className="mr-2 text-green-500" />
              Result
            </label>
            <Field
              type="text"
              id="result"
              name="result"
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-100"
              required
            />
            <ErrorMessage name="result" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label
              htmlFor="date"
              className="text-sm font-medium text-gray-700 mb-1 flex items-center"
            >
              <FaCalendarAlt className="mr-2 text-blue-500" />
              Date
            </label>
            <Field
              type="date"
              id="date"
              name="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
            <ErrorMessage name="date" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
            >
              Add Interview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewModal;