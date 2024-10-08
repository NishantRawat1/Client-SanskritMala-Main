import React from "react";
import { Link, useParams } from "react-router-dom";

const PaymentSuccess = ({ user }) => {
  const params = useParams();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-white p-4">
      {user && (
        <div className="bg-green-700 p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg max-w-md w-full text-center transition-transform transform hover:scale-105 hover:bg-green-600 duration-300">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Payment Successful</h2>
          <p className="text-base sm:text-lg mb-4">
            Your Book Order has been created and will be delivered in 7 days.
          </p>
          <p className="text-sm sm:text-md mb-6">
            Reference no: <span className="font-semibold">{params.id}</span>
          </p>
          <Link
            to={`/${user._id}/dashboard`}
            className="inline-block py-2 px-4 sm:py-3 sm:px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-md transition-transform transform hover:scale-105 duration-300"
          >
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
