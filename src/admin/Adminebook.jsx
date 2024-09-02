import React, { useState, useEffect } from "react";
import Layout from "./utils/layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../main";
import EbookCard from "../components/ebookcard"; // Import EbookCard component



const AdminEbooks = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [ebookFile, setEbookFile] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [ebooks, setEbooks] = useState([]);
  const [fetchingEbooks, setFetchingEbooks] = useState(false);

  // Fetch all eBooks
  const fetchEbooks = async () => {
    setFetchingEbooks(true);
    try {
      const { data } = await axios.get(`${server}/api/ebook/all`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setEbooks(data.ebooks);
    } catch (error) {
      toast.error("Failed to fetch eBooks.");
    } finally {
      setFetchingEbooks(false);
    }
  };

  useEffect(() => {
    fetchEbooks();
  }, []);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const changeEbookFileHandler = (e) => {
    const file = e.target.files[0];
    setEbookFile(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("author", author);
    myForm.append("description", description);
    myForm.append("price", price);
    myForm.append("coverImage", image);
    myForm.append("ebookPdf", ebookFile);

    try {
      const { data } = await axios.post(`${server}/api/ebook/new`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success(data.message);
      setBtnLoading(false);
      fetchEbooks(); // Refresh the list of eBooks
      setTitle("");
      setAuthor("");
      setDescription("");
      setPrice("");
      setImage("");
      setImagePrev("");
      setEbookFile("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col bg-gray-100  lg:flex-row min-h-screen p-6 py-20">
        {/* eBooks List */}
        <div className="lg:w-2/3 lg:pr-6 mb-6 lg:mb-0">
          <h1 className="text-3xl font-semibold mb-4 text-blue1">All eBooks</h1>
          {fetchingEbooks ? (
            <p className="text-gray-800">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ebooks.length > 0 ? (
                ebooks.map((ebook) => (
                  <EbookCard key={ebook._id} ebook={ebook} /> // Use EbookCard component
                ))
              ) : (
                <p className="text-gray-800">No eBooks Yet</p>
              )}
            </div>
          )}
        </div>

        {/* Add eBook Form */}
        <div className="lg:w-1/3">
          <div className="bg-gray-400 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Add eBook</h2>
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-800">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="author" className="block text-gray-800">Author</label>
                <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-800">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-800">Price</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

             

              <div className="mb-4">
                <label htmlFor="coverImage" className="block text-gray-800">Cover Image</label>
                <input
                  type="file"
                  id="image"
                  required
                  onChange={changeImageHandler}
                  className="mt-1 block w-full text-sm text-gray-800
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-gray-100 file:text-gray-700
                     hover:file:bg-gray-200"
                />
                {imagePrev && (
                  <img src={imagePrev} alt="Preview" className="mt-2 max-w-full h-auto rounded-md" />
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="ebookPdf" className="block text-gray-800">eBook File</label>
                <input
                  type="file"
                  id="ebookFile"
                  required
                  onChange={changeEbookFileHandler}
                  className="mt-1 block w-full text-sm text-gray-800
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-gray-100 file:text-gray-700
                     hover:file:bg-gray-200"
                />
              </div>

              <button
                type="submit"
                disabled={btnLoading}
                className="w-full px-4 py-2 bg-blue1 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
              >
                {btnLoading ? "Please Wait..." : "Add eBook"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminEbooks;
