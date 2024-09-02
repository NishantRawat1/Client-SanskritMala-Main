import React from 'react';
import { RiDashboard2Fill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { UserData } from '../../context/userContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {user && (
        <div className="bg-gray-300 text-black p-6 rounded-lg shadow-lg border border-gray-400 transform hover:scale-105 hover:shadow-2xl transition-transform duration-500 ease-in-out relative max-w-md w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue1 via-indigo-500 to-pink-500 opacity-20 rounded-lg blur-xl"></div>
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue1 mb-6 text-center">My Profile</h2>
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-gray-900 font-medium"><strong>Name: {user.name}</strong></p>
              <p className="text-base sm:text-lg font-medium"><strong>Email: {user.email}</strong></p>
              <button
                onClick={() => navigate(`/${user._id}/dashboard`)}
                className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-base sm:text-lg font-medium text-white bg-blue1 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 ease-in-out"
              >
                <RiDashboard2Fill className="mr-2" />Dashboard
              </button>
              {user.role === "admin" && (
                <button
                  onClick={() => navigate(`/admin/dashboard`)}
                  className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-base sm:text-lg font-medium text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 ease-in-out"
                >
                  <RiDashboard2Fill className="mr-2" />Admin Dashboard
                </button>
              )}
              <button
                onClick={logoutHandler}
                className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-base sm:text-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 ease-in-out"
              >
                <IoMdLogOut className="mr-2" />Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
