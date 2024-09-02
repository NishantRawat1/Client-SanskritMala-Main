import React, { useEffect, useState } from "react";
import "./coursedescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/courseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/userContext";
import Loading from "../../components/loading/loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { fetchUser } = UserData();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id]);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const {
        data: { order },
      } = await axios.post(
        `${server}/api/course/checkout/${params.id}`,
        {},
        {
          headers: {
            token,
          },
        }
      );

      const options = {
        key: "rzp_test_O08KSxJATKVPW6", // Your Razorpay Key ID
        amount: order.id,
        currency: "INR",
        name: "SanskritMala",
        description: "Learn with us",
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

          try {
            const { data } = await axios.post(
              `${server}/api/verification/${params.id}`,
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              },
              {
                headers: {
                  token,
                },
              }
            );

            await fetchUser();
            await fetchCourses();
            await fetchMyCourse();
            toast.success(data.message);
            setLoading(false);
            navigate(`/payment-success/${razorpay_payment_id}`);
          } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
          }
        },
        theme: {
          color: "#FFAE42",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error("Failed to initiate payment");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="container bg-gray-100 mx-auto px-4 py-40">
              <div className="bg-gray-300 text-blue1 rounded-lg shadow-xl overflow-hidden w-full max-w-4xl mx-auto">
                {/* Adjusted margin for top and bottom */}
                <div className="flex flex-col lg:flex-row">
                  <img
                    src={`${server}/${course.image}`}
                    alt={course.title}
                    className="w-full lg:w-1/2 h-64 lg:h-80 object-cover rounded-lg shadow-md"
                  />
                  <div className="lg:ml-6 flex-1 p-6">
                    <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
                    <p className="text-lg text-gray-900 mb-2">Instructor: <span className="font-semibold">{course.createdBy}</span></p>
                    <p className="text-lg text-gray-900 mb-4">Duration: <span className="font-semibold">{course.duration} weeks</span></p>
                    <p className="text-lg text-gray-800 mb-6">{course.description}</p>
                    <p className="text-xl text-gray-900 font-semibold mb-6">Get started with this course for just ₹{course.price}</p>
                    {user && user.subscription.includes(course._id) ? (
                      <button
                        onClick={() => navigate(`/course/study/${course._id}`)}
                        className="w-full py-2 px-4 bg-blue1 hover:bg-blue-500 text-white rounded-md shadow-lg transition-transform transform hover:scale-105 duration-300"
                      >
                        Study
                      </button>
                    ) : (
                      <button
                        onClick={checkoutHandler}
                        className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-lg transition-transform transform hover:scale-105 duration-300"
                      >
                        Buy Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;
