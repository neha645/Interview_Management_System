import { FaUser } from "react-icons/fa";
const Navbar = ({ username, profileImage, onToggleSidebar }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-4 flex justify-between items-center">
      <button
        onClick={onToggleSidebar}
        className="text-xl p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
      >
        ☰
      </button>
      <div className="flex items-center space-x-4">
        <span className="font-semibold">{username}</span>
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile Image"
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover"
          />
        ) : (
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
            <FaUser className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

