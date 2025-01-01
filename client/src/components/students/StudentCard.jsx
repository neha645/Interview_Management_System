import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaUserGraduate } from "react-icons/fa";

const StudentCard = ({ student }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/students/${student._id}`);
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow ease-in-out duration-300">
      <div className="dark:bg-gray-600 bg-indigo-600 p-4">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
            <FaUser className="text-4xl text-gray-600" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {student.name}
        </h2>
        <div className="space-y-2">
          <p className="text-gray-600 dark:text-white flex items-center">
            <FaUserGraduate className="mr-2" /> {student.class} - Level{" "}
            {student.level}
          </p>
          <p className="text-gray-600 dark:text-white flex items-center overflow-hidden">
            <FaEnvelope className="mr-2 flex-shrink-0" />
            <span className="truncate">{student.email}</span>
          </p>
          <p className="text-gray-600 dark:text-white flex items-center">
            <FaPhone className="mr-2 transform rotate-90 " /> {student.phone}
          </p>
        </div>

        <button
          onClick={handleView}
          className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
