import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserData } from "../context/userContext";
import toast from "react-hot-toast";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { server } from "../main";
import './Ebookpdf.css'; // Ensure you have custom CSS here
import FullScreenButton from "../components/fullscreenButton"; // Import the FullScreenButton

const EbookRead = () => {
  const { id } = useParams();
  const { user, isAuth } = UserData();
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const viewerRef = useRef(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const fetchEbook = async () => {
      try {
        if (!isAuth) {
          toast.error("You need to be logged in to view this eBook.");
          navigate("/login");
          return;
        }

        const hasPurchased = user?.purchasedEbooks?.includes(id);

        if (!hasPurchased) {
          toast.error("You have not purchased this eBook.");
          navigate("/");
          return;
        }

        const { data } = await axios.get(`${server}/api/ebooks/${id}/pdf`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        setPdfUrl(`${server}/${data.pdfPath}`);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch the eBook.");
        navigate("/");
      }
    };

    fetchEbook();
  }, [id, isAuth, navigate, user]);

  const handleFullScreenClick = () => {
    if (viewerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        viewerRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 text-blue1 py-28 px-4 sm:py-8 sm:px-6 md:py-12 md:px-8 lg:py-28 lg:px-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 text-center">
        Read Your eBook
      </h1>
      {loading ? (
        <div className="flex items-center justify-center w-full max-w-4xl bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
          <p className="text-base sm:text-lg md:text-xl text-white">Loading PDF...</p>
        </div>
      ) : pdfUrl ? (
        <div
          className="relative w-full max-w-4xl bg-gray-300 p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-lg"
          ref={viewerRef}
        >
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <Viewer 
              fileUrl={pdfUrl} 
              plugins={[defaultLayoutPluginInstance]} 
              // Use CSS to hide the default controls
            />
          </Worker>
          <div className="absolute top-4 right-4 z-10">
            <FullScreenButton onClick={handleFullScreenClick} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full max-w-4xl bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
          <p className="text-base sm:text-lg md:text-xl text-white">Failed to load PDF.</p>
        </div>
      )}
      <button
        className="mt-4 sm:mt-6 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default EbookRead;
