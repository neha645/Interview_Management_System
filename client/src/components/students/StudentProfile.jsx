import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentById } from "../../api/student";
import LoadingSpinner from "../common/LoadingSpinner";

const StudentProfile = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const response = await getStudentById(id);
        if (response?.success) {
          setStudent(response.data);
        } else {
          setError("Failed to load student details.");
        }
      } catch (err) {
        console.error("Error fetching student:", err);
        setError("Something went wrong while fetching student details.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleViewInterview = () => {
    navigate(`/students/interviews/${id}`);
  };

  if (loading) {
    <LoadingSpinner />;
  }

  // if (error) {
  //   return (
  //     <div className="text-center text-red-500">
  //       <p>{error}</p>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6">
        {student?.name || "Student"}'s Profile
      </h2>

      <div className="max-w-3xl w-full bg-white dark:bg-gray-700 rounded-lg shadow-xl flex flex-col md:flex-row overflow-hidden transition-transform transform hover:scale-105">
        <div className="w-full md:w-1/3 bg-indigo-600 flex items-center justify-center p-6">
          <div className="w-36 h-36 bg-white text-6xl font-bold text-indigo-600 flex items-center justify-center rounded-full shadow-lg">
            {student?.name?.charAt(0).toUpperCase() || "?"}
          </div>
        </div>
        <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
          {student ? (
            <>
              <div className="space-y-4">
                <p className="text-lg text-gray-700 dark:text-white">
                  <strong>Name:</strong> <span>{student.name}</span>
                </p>

                <p className="text-lg text-gray-700 dark:text-white">
                  <strong>class:</strong> <span>{student.class}</span>
                </p>
                <p className="text-lg text-gray-700 dark:text-white">
                  <strong>Phone:</strong>{" "}
                  <span>{student.phone || "Not Provided"}</span>
                </p>
                <p className="text-lg  text-gray-700 dark:text-white ">
                  <strong>Email:</strong>{" "}
                  <span>{student.email || "Not Provided"}</span>
                </p>
                <p className="text-lg text-gray-700 dark:text-white">
                  <strong>Date of Birth:</strong>{" "}
                  <span className="text-gray-700 dark:text-white">
                    {new Date(student.dob).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-lg text-gray-700 dark:text-white">
                  <strong>Level:</strong> <span>{student.level}</span>
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleViewInterview}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                >
                  View Interview Records
                </button>
              </div>
            </>
          ) : (
            <h2 className="text-2xl font-semibold text-red-500">
              Student not found
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
