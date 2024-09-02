import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../context/userContext';

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { btnLoading, verifyOtp } = UserData();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-gray-300 text-blue1 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Verify Account</h2>
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-900">Enter OTP</label>
            <input
              type="number"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue1 focus:border-blue1 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={btnLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base sm:text-lg font-medium text-white bg-blue1 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue1"
            >
              {btnLoading ? "Loading..." : "Verify"}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-900">
            Go to <Link to='/login' className="text-blue1 hover:text-blue-500">Login</Link> page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verify;
