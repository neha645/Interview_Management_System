import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaSearch, FaSpinner } from "react-icons/fa";
import { getAllTeachers } from "../../api/teacher";
import { errorNotification } from "../../utils/notifications";
import TeacherCard from "./TeacherCard";
import TeacherModal from "./TeacherModal";
import Pagination from "../common/Pagination";
import SearchBar from "../common/SearchBar";
import LoadingSpinner from "../common/LoadingSpinner";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [teachersPerPage] = useState(4);

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoadingFetch(true);
      try {
        const response = await getAllTeachers();
        if (response?.success) {
          setTeachers(response.data);
        } else {
          throw new Error(response?.message || "Failed to load teachers.");
        }
      } catch (err) {
        console.error("Error fetching teachers:", err);
        setError(
          err.message || "Something went wrong while fetching teachers."
        );
        errorNotification(err.message || "Failed to load teachers.");
      } finally {
        setLoadingFetch(false);
      }
    };
    fetchTeachers();
  }, []);

  const filteredTeachers = useMemo(() => {
    return teachers.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [teachers, searchTerm]);

  // Get current teachers
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(
    indexOfFirstTeacher,
    indexOfLastTeacher
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-0">
          Teachers
        </h1>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
          >
            <FaPlus className="mr-2" />
            Add New Teacher
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <p className="text-gray-700 dark:text-white font-semibold mb-4 sm:mb-0">
          Total Teachers: {filteredTeachers.length}
        </p>
      </div>

      {loadingFetch ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <>
          {currentTeachers.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-white">
              No teachers found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentTeachers.map((teacher) => (
                  <TeacherCard
                    key={teacher._id}
                    teacher={teacher}
                    setTeachers={setTeachers}
                  />
                ))}
            </div>
          )}
          {filteredTeachers.length > teachersPerPage && (
            <Pagination
              itemsPerPage={teachersPerPage}
              totalItems={filteredTeachers.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
        </>
      )}
      {showModal && (
        <TeacherModal setShowModal={setShowModal} setTeachers={setTeachers} />
      )}
    </div>
  );
};

export default Teachers;
