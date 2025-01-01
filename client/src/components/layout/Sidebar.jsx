import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdOutlinePeopleAlt,
  MdOutlineLogout,
  MdOutlineWbSunny,
  MdOutlineNightlight,
  MdPerson,
  MdAdminPanelSettings,
  MdSchool,
  MdAssignment,
  MdSupervisorAccount,
} from "react-icons/md";

const Sidebar = ({
  isSidebarOpen,
  darkMode,
  onToggleTheme,
  handleLogout,
  userRole,
  userId,
}) => {
  const location = useLocation();
  const isRouteActive = (path) => {
    if (path === "/students") {
      return (
        location.pathname.startsWith("/student") ||
        location.pathname === "/students"
      );
    }
    return location.pathname.startsWith(path);
  };

  const getMenuItems = () => {
    const roleBasedItems = {
      Student: [
        { name: "Dashboard", path: "/dashboard", icon: MdDashboard },
        { name: "My Profile", path: `/students/${userId}`, icon: MdPerson },
        {
          name: "My Interviews",
          path: `/students/interviews/${userId}`,
          icon: MdAssignment,
        },
      ],
      Teacher: [
        { name: "Dashboard", path: "/dashboard", icon: MdDashboard },
        { name: "Interviews", path: "/interviews", icon: MdAssignment },
        { name: "Students", path: "/students", icon: MdSchool },
      ],
      Admin: [
        { name: "Dashboard", path: "/dashboard", icon: MdDashboard },
        { name: "Interviews", path: "/interviews", icon: MdAssignment },
        { name: "Students", path: "/students", icon: MdSchool },
        { name: "Teachers", path: "/teachers", icon: MdSupervisorAccount },
      ],
    };

    return roleBasedItems[userRole] || [];
  };

  const menuItems = getMenuItems();

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-16"
      } bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white h-screen flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Sidebar Header */}
      <div
        className={`p-4 flex items-center ${
          isSidebarOpen ? "justify-between" : "justify-center"
        }`}
      >
        <div className="flex items-center">
          <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">IT</span>
          </div>
          {isSidebarOpen && (
            <h1 className="ml-3 text-xl font-bold text-blue-600">
              ITEG Interview
            </h1>
          )}
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex items-center ${
                    isSidebarOpen ? "space-x-4" : "justify-center"
                  } p-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`
                }
              >
                <item.icon
                  className={`text-xl ${isSidebarOpen ? "" : "text-2xl"}`}
                />
                {isSidebarOpen && (
                  <span className="font-medium">{item.name}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 space-y-2">
        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          className={`flex items-center ${
            isSidebarOpen ? "space-x-2" : "justify-center"
          } w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white p-2 rounded-lg transition-all duration-200`}
        >
          {darkMode ? (
            <>
              <MdOutlineWbSunny className="text-xl" />
              {isSidebarOpen && <span>Light Mode</span>}
            </>
          ) : (
            <>
              <MdOutlineNightlight className="text-xl" />
              {isSidebarOpen && <span>Dark Mode</span>}
            </>
          )}
        </button>
        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`flex items-center ${
            isSidebarOpen ? "space-x-2" : "justify-center"
          } w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all duration-200`}
        >
          <MdOutlineLogout className="text-xl" />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
