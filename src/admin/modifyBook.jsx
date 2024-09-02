import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { server } from "../main";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    // Fetch the book details
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`${server}/api/book/${id}`);
        setBook(data.book);
        setTitle(data.book.title);
        setDescription(data.book.description);
        setAuthor(data.book.author);
        setPrice(data.book.price);
        setImagePrev(`${server}/${data.book.image}`);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchBook();
  }, [id]);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("author", author);
    myForm.append("price", price);
    if (image) myForm.append("file", image);

    try {
      const { data } = await axios.put(`${server}/api/book/${id}`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success(data.message);
      setBtnLoading(false);
      navigate("/admin/books"); // Redirect after successful update
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-28 items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-gray-300 text-gray-900 rounded-lg shadow-lg p-6 max-w-md w-full transition-transform transform hover:scale-105 duration-300 ease-in-out">
        {book ? (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center">Update Book</h2>
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-800 text-sm">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform duration-300 ease-in-out"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-800 text-sm">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform duration-300 ease-in-out"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="author" className="block text-gray-800 text-sm">Author</label>
                <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform duration-300 ease-in-out"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-800 text-sm">Price</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform duration-300 ease-in-out"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-800 text-sm">Image</label>
                <input
                  type="file"
                  id="image"
                  onChange={changeImageHandler}
                  className="mt-1 block w-full text-sm text-gray-800
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-gray-100 file:text-gray-700
                     hover:file:bg-gray-200 transition-transform duration-300 ease-in-out"
                />
                {imagePrev && (
                  <img src={imagePrev} alt="Preview" className="mt-2 max-w-full h-auto rounded-md shadow-md" />
                )}
              </div>

              <button
                type="submit"
                disabled={btnLoading}
                className="w-full px-4 py-2 bg-blue1 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
              >
                {btnLoading ? "Please Wait..." : "Update"}
              </button>
            </form>
          </>
        ) : (
          <p className="text-center text-gray-400">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UpdateBook;
