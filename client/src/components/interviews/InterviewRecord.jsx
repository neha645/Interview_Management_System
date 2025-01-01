import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "../../api/student";
import { addInterview } from "../../api/interview";
import { useAuth } from "../../contexts/authContext";
import InterviewModal from "./InterviewModal";
import InterviewCard from "./InterviewCard";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LoadingSpinner from "../common/LoadingSpinner";

const InterviewRecord = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const initialValues = {
    level: "",
    skills: "",
    score: 0,
    result: "",
    interviewer: user?.name,
    date: new Date().toISOString().split("T")[0],
  };

  const validationSchema = Yup.object().shape({
    // level: Yup.string().required("Level is required"),m
    skills: Yup.string().required("Skills are required"),
    score: Yup.number()
      .required("Score is required")
      .min(0, "Score must be at least 0")
      .max(10, "Score must be at most 10"),
    result: Yup.string().required("Result is required"),
    interviewer: Yup.string().required("Interviewer is required"),
    date: Yup.date()
      .required("Date is required")
      .max(new Date(), "Date cannot be in the future"),
  });

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const response = await getStudentById(id);
      if (response?.success) {
        const studentData = {
          ...response.data,
          interviews: response.data.interviews || [],
        };
        setStudent(studentData);
      }
    } catch (err) {
      console.error("Error fetching student:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const handleAddInterview = async (values, { resetForm }) => {
    try {
      values.level = student.level;
      const response = await addInterview(id, values);
      if (!response?.success) {
        throw new Error(response?.message);
      }
      await fetchStudent(); // Refetch student data
      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error("Error adding interview:", err);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!student)
    return <p className="text-center text-xl mt-10">Student not found.</p>;
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Interviews for {student.name}
      </h1>
      {(user?.role === "Admin" || user?.role === "Teacher") && (
        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200 mb-6"
        >
          Add Interview
        </button>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {student.interviews.length > 0 ? (
          student.interviews.map((interview, index) => (
            <InterviewCard key={index} interview={interview} />
          ))
        ) : (
          <div className="col-span-2 text-center py-8">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No interviews found for this student.
            </p>
          </div>
        )}
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleAddInterview}
      >
        {(formikProps) => (
          <InterviewModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            interviewer={user}
            student={student}
            formikProps={formikProps}
          />
        )}
      </Formik>
    </div>
  );
};

export default InterviewRecord;
