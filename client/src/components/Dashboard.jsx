import React from "react";
import { Link } from "react-router-dom";
import {
  User,
  Users,
  BookOpen,
  Calendar,
  UserCircle,
  ClipboardList,
} from "lucide-react";
import { useAuth } from "../contexts/authContext";

const Dashboard = () => {
  const { user } = useAuth();

  const getNavLinks = (role) => {
    switch (role) {
      case "Admin":
        return [
          {
            name: "Interviews",
            icon: Calendar,
            path: "/interviews",
            color: "from-indigo-500 to-blue-600",
          },
          {
            name: "Teachers",
            icon: Users,
            path: "/teachers",
            color: "from-purple-500 to-pink-600",
          },
          {
            name: "Students",
            icon: BookOpen,
            path: "/students",
            color: "from-green-500 to-teal-600",
          },
        ];
      case "Teacher":
        return [
          {
            name: "Interviews",
            icon: Calendar,
            path: "/interviews",
            color: "from-indigo-500 to-blue-600",
          },
          {
            name: "Students",
            icon: BookOpen,
            path: "/students",
            color: "from-green-500 to-teal-600",
          },
        ];
      case "Student":
        return [
          {
            name: "Profile",
            icon: UserCircle,
            path: `/students/${user._id}`,
            color: "from-indigo-500 to-blue-600",
          },
          {
            name: "Interview Record",
            icon: ClipboardList,
            path: `/students/interviews/${user._id}`,
            color: "from-green-500 to-teal-600",
          },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks(user.role);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-12 transform hover:scale-105 transition-all duration-300">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8">
          <div className="bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full p-3 shadow-lg">
            <User className="w-20 h-20 text-white" />
          </div>
          <div className="text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{user.name}</h2>
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100 capitalize mt-2 sm:mt-1">
                {user.role}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center">
        <div className={`grid ${navLinks.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} gap-6 max-w-4xl w-full`}>
          {navLinks.map((link) => (
            <div className="flex justify-center" key={link.name}>
              <Link
                to={link.path}
                className={`bg-gradient-to-r ${link.color} rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 w-full max-w-sm`}
              >
                <div className="px-6 py-8 flex flex-col items-center justify-center space-y-4">
                  <link.icon className="w-16 h-16 text-white" />
                  <span className="text-white font-semibold text-2xl text-center">
                    {link.name}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;