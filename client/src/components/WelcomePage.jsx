import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserCheck, GraduationCap, CalendarCheck } from 'lucide-react';

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-indigo-800 mb-4">
          Welcome to Interview Management System
        </h1>
        <p className="text-xl text-gray-700">
          Streamline your interview process with our powerful tools
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {[
          { icon: UserCheck, title: 'Teacher Dashboard', description: 'Manage interviews, view student profiles, and provide feedback' },
          { icon: GraduationCap, title: 'Student Portal', description: 'Access your profile, view interview history, and track progress' },
          { icon: CalendarCheck, title: 'Interview Management', description: 'Schedule, track, and evaluate interviews efficiently' },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
          >
            <feature.icon className="w-16 h-16 text-indigo-600 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{feature.title}</h2>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-12"
      >
        <Link
          to="/login"
          className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 inline-block"
        >
          Get Started
        </Link>
      </motion.div>
    </div>
  );
};

export default WelcomePage;