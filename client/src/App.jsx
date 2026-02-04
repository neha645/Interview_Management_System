import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Context
import { AuthProvider } from "./contexts/authContext";

// Components
import Layout from "./components/layout/Layout";
import Dashboard from "./components/Dashboard";
import Login from "./components/auth/Login";
import Interviews from "./components/interviews/Interviews";
import Students from "./components/students/Students";
import StudentProfile from "./components/students/StudentProfile";
import InterviewRecord from "./components/interviews/InterviewRecord";
import Teachers from "./components/teachers/Teachers";
import PrivateRoute from "./components/auth/PrivateRoute";
import NotFound from "./components/NotFound";
import WelcomePage from "./components/WelcomePage";
import Register from "./components/auth/Register";

// Constants
const ROLES = {
  ADMIN: "Admin",
  TEACHER: "Teacher",
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private routes */}
          <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Admin and Teacher routes */}
            <Route
              path="interviews"
              element={
                <PrivateRoute allowedRoles={[ROLES.ADMIN, ROLES.TEACHER]}>
                  <Interviews />
                </PrivateRoute>
              }
            />
            <Route
              path="students"
              element={
                <PrivateRoute allowedRoles={[ROLES.ADMIN, ROLES.TEACHER]}>
                  <Students />
                </PrivateRoute>
              }
            />
            <Route
              path="students/level/:level"
              element={
                <PrivateRoute allowedRoles={[ROLES.ADMIN, ROLES.TEACHER]}>
                  <Students />
                </PrivateRoute>
              }
            />

            {/* Routes accessible to all authenticated users */}
            <Route path="students/:id" element={<StudentProfile />} />
            <Route path="students/interviews/:id" element={<InterviewRecord />} />

            {/* Admin-only route */}
            <Route
              path="teachers"
              element={
                <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
                  <Teachers />
                </PrivateRoute>
              }
            />
          </Route>

          {/* 404 Route - This should be the last route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;