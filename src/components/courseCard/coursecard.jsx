import React from "react";
import { server } from "../../main";
import { UserData } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/courseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchCourses } = CourseData();

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="bg-gray-300 text-black rounded-lg shadow-xl overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
      <img src={`${server}/${course.image}`} alt={course.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl text-blue1 font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-900 mb-2">Instructor: {course.createdBy}</p>
        <p className="text-gray-900 mb-2">Duration: {course.duration} weeks</p>
        <p className="text-gray-900 mb-4">Price: ₹{course.price}</p>

        {isAuth ? (
          <>
            {user && user.role !== "admin" ? (
              <>
                {user.subscription.includes(course._id) ? (
                  <button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="w-full py-2 px-4 bg-blue1 hover:bg-blue-200 text-white text-lg rounded-md shadow-md transition-colors duration-300 ease-in-out"
                  >
                    Study
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="w-full py-2 px-4 bg-blue1 hover:bg-blue-200 text-white text-lg rounded-md shadow-md transition-colors duration-300 ease-in-out"
                  >
                    Get Started
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => navigate(`/course/study/${course._id}`)}
                className="w-full py-2 px-4 bg-blue1 hover:bg-blue-200 text-white text-lg rounded-md shadow-md transition-colors duration-300 ease-in-out"
              >
                Study
              </button>
            )}
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="w-full py-2 px-4 bg-blue1 hover:bg-blue-200 text-white text-lg rounded-md shadow-md transition-colors duration-300 ease-in-out"
          >
            Get Started
          </button>
        )}

        {user && user.role === "admin" && (
          <button
            onClick={() => deleteHandler(course._id)}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white text-lg rounded-md shadow-md mt-4 transition-colors duration-300 ease-in-out"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
