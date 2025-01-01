import React from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaBriefcase,
  FaUser,
} from "react-icons/fa";
import { updateTeacher, deleteTeacher } from "../../api/teacher";
import {
  successNotification,
  errorNotification,
} from "../../utils/notifications";

const TeacherCard = ({ teacher, setTeachers }) => {
  const handleActivationToggle = async () => {
    try {
      const newStatus = !teacher.isActive;
      const response = await updateTeacher(teacher._id, {
        isActive: newStatus,
      });
      if (response?.success) {
        successNotification(
          `Teacher ${newStatus ? "activated" : "deactivated"} successfully`
        );
        setTeachers((prevTeachers) =>
          prevTeachers.map((t) =>
            t._id === teacher._id ? { ...t, isActive: newStatus } : t
          )
        );
      }
    } catch (err) {
      errorNotification(
        `Failed to ${teacher.isActive ? "deactivate" : "activate"} teacher`
      );
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        const response = await deleteTeacher(teacher._id);
        if (response?.success) {
          successNotification("Teacher deleted successfully");
          setTeachers((prevTeachers) =>
            prevTeachers.filter((t) => t._id !== teacher._id)
          );
        }
      } catch (err) {
        errorNotification("Failed to delete teacher");
      }
    }
  };

  return (
   <motion.div
      // initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      // exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
    >
      <div className="dark:bg-gray-600 bg-indigo-600 p-4">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
            <FaUser className="text-4xl text-gray-600" />
          </div>
       
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 dark:text-white">
          {teacher.name}
        </h3>
        <div className="flex items-center mb-2 overflow-hidden">
          <FaEnvelope className="text-gray-500 dark:text-white mr-2 flex-shrink-0" />
          <span className="text-gray-600 dark:text-white truncate">
            {teacher.email}
          </span>
        </div>
        <div className="flex items-center mb-2">
          <FaPhone className="text-gray-500 dark:text-white mr-2 transform rotate-90" />
          <span className="text-gray-600 dark:text-white">{teacher.phone}</span>
        </div>
        <div className="flex items-center mb-2">
          <FaGraduationCap className="text-gray-500 dark:text-white mr-2" />
          <span className="text-gray-600 dark:text-white">
            {teacher.specialization}
          </span>
        </div>
        <div className="flex items-center mb-4">
          <FaBriefcase className="text-gray-500 dark:text-white mr-2" />
          <span className="text-gray-600 dark:text-white">
            {teacher.experience} years
          </span>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={handleActivationToggle}
            className={`${
              teacher.isActive
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-500 hover:bg-green-600"
            } text-white px-3 py-1 rounded-full text-sm transition-all duration-300 ease-in-out`}
          >
            {teacher.isActive ? "Deactivate" : "Activate"}
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600 transition-all duration-300 ease-in-out"
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TeacherCard;
