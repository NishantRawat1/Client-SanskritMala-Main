import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/courseContext";
import { server } from "../../main";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    return navigate("/");
  }

  useEffect(() => {
    fetchCourse(params.id);
  }, [fetchCourse, params.id]);

  return (
    <>
      {course && (
        <div className="flex flex-col mt-10 items-center justify-center min-h-screen px-4 py-15 md:py-20 bg-gray-100 text-blue1">
          <img
            src={`${server}/${course.image}`}
            alt={course.title}
            className="w-full max-w-sm h-auto mb-6 rounded-lg shadow-xl transition-transform transform hover:scale-105"
          />
          <h2 className="text-2xl md:text-3xl font-extrabold text-blue1 mb-4 transition-transform transform hover:scale-105">
            {course.title}
          </h2>
          <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 transition-transform transform hover:scale-105">
            {course.description}
          </h4>
          <h5 className="text-base md:text-lg font-medium text-gray-800 mb-4">
            by - {course.createdBy}
          </h5>
          <h5 className="text-base md:text-lg font-medium text-gray-800 mb-6">
            Duration - {course.duration} weeks
          </h5>
          <Link
            to={`/lectures/${course._id}`}
            className="px-4 py-2 md:px-6 md:py-3 bg-green-500 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-green-600"
          >
            <h2 className="text-base md:text-lg font-bold">Lectures</h2>
          </Link>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
