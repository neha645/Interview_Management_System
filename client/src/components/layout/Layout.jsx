import React, { useState, useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useAuth } from "../../contexts/authContext";

const Layout = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default: Sidebar closed on mobile
  const { user, logout } = useAuth();

  // Toggle dark mode and save preference to localStorage
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Handle window resize to reset sidebar visibility for larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true); // Open sidebar for larger screens
      } else {
        setIsSidebarOpen(false); // Close sidebar for mobile
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize on mount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTheme = useCallback(() => setDarkMode((prev) => !prev), []);
  const toggleSidebar = useCallback(() => setIsSidebarOpen((prev) => !prev), []);

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      {/* Sidebar for larger screens */}
      <div
        className={`hidden md:block transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
          handleLogout={logout}
          userRole={user?.role}
          userId={user?._id}
        />
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && window.innerWidth <= 768 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-50 transition-transform duration-300 bg-white dark:bg-gray-900 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          isSidebarOpen={true}
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
          handleLogout={logout}
          userRole={user?.role}
          userId={user?._id}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-800 transition-all duration-300">
        {/* Navbar */}
        <Navbar 
          username={user?.name} 
          onToggleSidebar={toggleSidebar} 
          isSidebarOpen={isSidebarOpen}
        />

        {/* Main Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
