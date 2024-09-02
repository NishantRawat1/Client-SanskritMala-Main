import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../context/userContext';
import { CourseData } from '../../context/courseContext';

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { fetchMyCourse } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate, fetchMyCourse);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-gray-300 text-black p-6 sm:p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl text-blue1 font-bold mb-6 text-center">Login</h2>
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue1 focus:border-blue1 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue1 focus:border-blue1 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={btnLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base sm:text-lg font-medium text-white bg-blue1 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {btnLoading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-black">
            Don't have an account? <Link to='/register' className="text-blue1 hover:text-blue-500">Register Now</Link>
          </p>
          <p className="text-sm text-black mt-2">
            <Link to='/forgot' className="text-blue1 hover:text-blue-500">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login;
