import React from "react";
import { server } from "../main";
import { UserData } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { NotesData } from "../context/notesContext";

const NotesCard = ({ note }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchNotes } = NotesData();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        const { data } = await axios.delete(`${server}/api/notes/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchNotes();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const hasPurchased = user?.purchasedNotes?.includes(note._id);

  return (
    <div className="bg-gray-300 text-blue1 rounded-lg shadow-xl overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out max-w-xs sm:max-w-sm lg:max-w-md h-full flex flex-col">
      <img
        src={`${server}/${note.coverImage}`}
        alt={note.title}
        className="w-full h-48 object-cover transition-transform duration-500 ease-in-out hover:scale-110"
      />
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-semibold mb-2">{note.title}</h3>
        <p className="text-gray-900 mb-2">Price: ₹{note.price}</p>

        <div className="flex-1 flex items-end">
          {isAuth ? (
            <>
              {user && user.role === "admin" ? (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => navigate(`/notes/modify/${note._id}`)}
                    className="w-full py-2 px-4 bg-blue1 hover:bg-blue-500 text-white rounded-md shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
                  >
                    Modify
                  </button>
                  <button
                    onClick={() => deleteHandler(note._id)}
                    className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate(hasPurchased ? `/notes/read/${note._id}` : `/notes/${note._id}`)}
                  className="w-full py-2 px-4 bg-blue1 hover:bg-blue-500 text-white rounded-md shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
                >
                  {hasPurchased ? "Read" : "View"}
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="w-full py-2 px-4 bg-blue1 hover:bg-blue-500 text-white rounded-md shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              Login to View
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesCard;
