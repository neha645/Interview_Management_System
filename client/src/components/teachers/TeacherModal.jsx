import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addTeacher } from "../../api/teacher";
import {
  successNotification,
  errorNotification,
} from "../../utils/notifications";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaBriefcase,
} from "react-icons/fa";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Z\s]{2,50}$/,
      "Please enter a valid name (2-50 characters)."
    )
    .required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit Indian phone number"
    )
    .required("Phone number is required"),
  specialization: Yup.string().required("Specialization is required"),
  experience: Yup.number()
    .typeError("Experience must be a number")
    .positive("Experience must be a positive number")
    .integer("Experience must be a whole number")
    .required("Experience is required"),
});

const TeacherModal = ({ setShowModal, setTeachers }) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await addTeacher(values);
      if (response?.success) {
        successNotification("Teacher added successfully");
        setTeachers((prevTeachers) => [...prevTeachers, response.data]);
        resetForm();
        setShowModal(false);
      }
    } catch (err) {
      errorNotification(err.response?.data?.message || "Failed to add teacher");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-gray-50 dark:bg-gray-800 rounded-lg shadow-xl p-8 m-4 max-w-xl w-full">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Add New Teacher
        </h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            specialization: "",
            experience: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter teacher's name"
                    className="pl-10 py-2 block w-full rounded-md border-gray-200 dark:border-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  E-mail
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter teacher's email"
                    className="pl-10 py-2 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Phone
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="h-5 w-5 text-gray-400 transform rotate-90" />
                  </div>
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Enter 10-digit phone number"
                    className="pl-10 py-2 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="specialization"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Specialization
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaGraduationCap className="h-5 w-5 text-gray-400" />
                  </div>
                  <Field
                    type="text"
                    name="specialization"
                    placeholder="Enter specializations (comma-separated)"
                    className="pl-10 py-2 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
                <ErrorMessage
                  name="specialization"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Experience (years)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBriefcase className="h-5 w-5 text-gray-400" />
                  </div>
                  <Field
                    type="number"
                    name="experience"
                    placeholder="Enter years of experience"
                    className="pl-10 py-2 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
                <ErrorMessage
                  name="experience"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  {isSubmitting ? "Adding..." : "Add Teacher"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TeacherModal;