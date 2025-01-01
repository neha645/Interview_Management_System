import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllStudents } from "../../api/student";
import LoadingSpinner from "../common/LoadingSpinner";

const levels = [1, 2, 3];
const sublevels = ["A", "B", "C"];

const Interviews = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getAllStudents();
        console.log(response);
        if (response?.success) {
          setStudents(response.data);
        } else {
          setError("Failed to load students.");
        }
      } catch (err) {
        console.error("Error in fetching students:", err);
        setError("Something went wrong while fetching students.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const getLevelCounts = (level) => {
    const levelStudents = students.filter((student) => student.level === level);

    const passed = students.filter((student) =>
      student.interviews?.some(
        (interview) =>
          interview.level === level && interview.result === "Passed"
      )
    ).length;

    const failed = students.filter((student) =>
      student.interviews?.some(
        (interview) =>
          interview.level === level && interview.result === "Failed"
      )
    ).length;

    const current = levelStudents.length;

    return { current, passed, failed };
  };

  const handleStudentList = (level) => {
    navigate(`/students/level/${level}`);
  };

  return (
    <div className="container mx-auto flex flex-col gap-6 dark:text-white">
      <h1 className="font-bold text-center text-2xl dark:text-white text-gray-800 mb-4">
        Interview Management System
      </h1>

      {/* Loading State */}
      {loading && <LoadingSpinner />}

      {/* Error State */}
      {!loading && error && (
        <div className="text-center text-red-500 font-semibold">{error}</div>
      )}

      {/* No Students State */}
      {!loading && !error && students.length === 0 && (
        <div className="text-center text-gray-500 font-medium text-lg">
          No students available. Add students to get started!
        </div>
      )}

      {/* Total Students */}
      {!loading && students.length > 0 && (
        <div className="flex justify-between items-center bg-white text-gray-700 dark:bg-gray-700 dark:text-white p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold">
            Total Students: {students.length}
          </p>
          <button
            onClick={() => handleStudentList("all")}
            className="text-white bg-blue-500 text-sm px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            View Students
          </button>
        </div>
      )}
      {/* Levels and Sublevels */}
      {!loading &&
        students.length > 0 &&
        levels.map((level) => (
          <div key={level} className="w-full">
            <h2 className="text-xl font-bold mb-4">{`Level ${level}`}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sublevels.map((sublevel) => {
                const { current, passed, failed } = getLevelCounts(
                  `${level}${sublevel}`
                );

                return (
                  <div
                    key={`${level}-${sublevel}`}
                    className="flex flex-col justify-between items-center gap-4 bg-white text-gray-700 dark:bg-gray-700 dark:text-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105"
                  >
                    <div className="flex justify-between w-full">
                      <h1 className="text-lg font-bold">{`Level ${level}${sublevel}`}</h1>
                      <button
                        onClick={() => handleStudentList(`${level}${sublevel}`)}
                        className="bg-blue-500 text-white text-xs px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                      >
                        View
                      </button>
                    </div>

                    <div className="flex justify-between w-full mt-4 space-x-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-indigo-600">
                          {current}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-white">
                          Current Students
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          {passed}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-white">
                          Passed Students
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-600">
                          {failed}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-white">
                          Failed Students
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Interviews;
