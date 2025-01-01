import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getAllStudents } from "../../api/student";
import { useAuth } from "../../contexts/authContext";
import StudentCard from "./StudentCard";
import AddStudentModal from "./AddStudentModal";
import SearchBar from "../common/SearchBar";
import Pagination from "../common/Pagination";
import { errorNotification } from "../../utils/notifications";
import LoadingSpinner from "../common/LoadingSpinner";

const StudentList = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { level = "all" } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(4);

  // Fetch students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await getAllStudents();
        if (response?.success) {
          setStudents(response.data);
        } else {
          throw new Error(response?.message || "Failed to load students.");
        }
      } catch (err) {
        console.error("Error fetching students:", err);
        setError(
          err.message || "Something went wrong while fetching students."
        );
        errorNotification(err.message || "Failed to load students.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Filter and sort students based on search term and level
  const filteredStudents = useMemo(() => {
    return students
      .filter(
        (student) =>
          (level === "all" || student.level === level) &&
          (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.level.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => b.id - a.id);
  }, [students, level, searchTerm]);

  // Get current students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold  text-gray-800 dark:text-white mb-4 md:mb-0">
          {level === "all" ? "All Students" : `Level ${level} Students`}
        </h1>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {user?.role === "Admin" && level === "all" && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Add New Student
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-center text-red-600 text-xl">{error}</p>
      ) : (
        <>
          <p className=" text-gray-700 dark:text-white font-semibold mb-4">
            Total Students: {filteredStudents.length}
          </p>
          {filteredStudents.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-white text-xl">
              No students found.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentStudents.map((student) => (
                  <StudentCard key={student._id} student={student} />
                ))}
              </div>
              {filteredStudents.length > studentsPerPage && (
                <Pagination
                  itemsPerPage={studentsPerPage}
                  totalItems={filteredStudents.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              )}
            </>
          )}
        </>
      )}
      {showModal && (
        <AddStudentModal
          setShowModal={setShowModal}
          setStudents={setStudents}
        />
      )}
    </div>
  );
};

export default StudentList;
