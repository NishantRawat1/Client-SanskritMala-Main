import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookData } from "../context/bookContext";
import { server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../context/userContext";
import Loading from "../components/loading/loading";

const BookDescription = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);

  const { fetchBook, book, fetchBooks } = BookData();
  const { fetchUser, user } = UserData();

  useEffect(() => {
    fetchBook(params.id);
  }, [params.id]);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleAddressSubmit = async () => {
    if (!address) {
      toast.error("Please enter your address.");
      return;
    }
    setLoading(true);

    try {
      // Initiate checkout with address
      const {
        data: { order },
      } = await axios.post(
        `${server}/api/book/checkout/${params.id}`,
        { address },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      const options = {
        key: "rzp_test_O08KSxJATKVPW6", // Your Razorpay Key ID
        amount: order.amount, // Ensure amount is in paise (₹100 = 10000)
        currency: "INR",
        name: "SanskritMala",
        description: "Purchase Book",
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

          try {
            // Verify payment
            const { data } = await axios.post(
              `${server}/api/bookverification/${params.id}`,
              {
                order_id: razorpay_order_id,
                payment_id: razorpay_payment_id,
                razorpay_signature,
              },
              {
                headers: {
                  token: localStorage.getItem("token"),
                },
              }
            );

            await fetchUser(); // Refresh user data
            await fetchBooks(); // Refresh books data
            toast.success(data.message);
            setLoading(false);
            navigate(`/book-payment-success/${razorpay_payment_id}`);
          } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
          }
        },
        theme: {
          color: "#8a4baf",
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
          {book && (
            <div className="container mx-auto px-4 py-28 sm:py-20 lg:py-40 ">
              <div className="bg-gray-300 text-blue1 rounded-lg shadow-lg overflow-hidden w-full max-w-4xl mx-auto transition-transform transform hover:scale-105 duration-300 ease-in-out">
                <div className="flex flex-col lg:flex-row">
                  <img
                    src={`${server}/${book.image}`}
                    alt={book.title}
                    className="w-full lg:w-1/2 h-64 lg:h-80 object-cover rounded-lg shadow-md"
                  />
                  <div className="lg:ml-6 flex-1 p-4 sm:p-6 lg:p-8">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-blue1">{book.title}</h2>
                    <p className="text-base sm:text-lg mb-2 text-gray-900">Author: <span className="font-semibold">{book.author}</span></p>
                    <p className="text-base sm:text-lg mb-4 text-gray-900">{book.description}</p>
                    <p className="text-lg sm:text-xl font-semibold mb-6 text-blue1">Price: ₹{book.price}</p>

                    {showAddressForm ? (
                      <>
                        <textarea
                          value={address}
                          onChange={handleAddressChange}
                          rows="4"
                          className="w-full p-3 mb-4 border border-gray-500 rounded-md bg-white text-black"
                          placeholder="Enter your delivery address"
                        />
                        <button
                          onClick={handleAddressSubmit}
                          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-lg transition-transform transform hover:scale-105 duration-300"
                        >
                          Proceed to Payment
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setShowAddressForm(true)}
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

export default BookDescription;
