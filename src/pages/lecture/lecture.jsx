import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/loading/loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching lectures:", error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log("Error fetching lecture:", error);
      setLecLoading(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const [completed, setCompleted] = useState(0);
  const [completedLec, setCompletedLec] = useState(0);
  const [lectLength, setLectLength] = useState(0);
  const [progress, setProgress] = useState([]);

  async function fetchProgress() {
    try {
      const { data } = await axios.get(
        `${server}/api/user/progress?course=${params.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      console.log('Fetched progress data:', data); // Log progress data
      setCompleted(data.courseProgressPercentage || 0); // Ensure default values
      setCompletedLec(data.completedLectures || 0); // Ensure default values
      setLectLength(data.allLectures || 0); // Ensure default values
      setProgress(data.progress || []); // Ensure default values
    } catch (error) {
      console.log("Error fetching progress:", error);
    }
  }

  const addProgress = async (id) => {
    try {
      const { data } = await axios.post(
        `${server}/api/user/progress?course=${params.id}&lectureId=${id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data.message); // Check if progress is updated correctly
      fetchProgress(); // Fetch progress again to get updated data
    } catch (error) {
      console.log("Error adding progress:", error);
    }
  };

  useEffect(() => {
    fetchLectures();
    fetchProgress();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col lg:flex-row min-h-screen mt-7 py-20 bg-gray-100 text-blue1 p-4 lg:py-20 xl:py-20 px-4">
          <div className="flex-1 lg:w-2/3 lg:pr-6">
            <div className="bg-gray-300 p-4 rounded-lg shadow-lg mb-6">
              <div className="text-lg font-bold mb-4">
                Lecture Completed: {completedLec} out of {lectLength}
              </div>
              <progress
                className="w-full bg-white text-white rounded"
                value={completed}
                max={100}
              ></progress>
              <div className="text-right text-sm mt-2">{completed} %</div>
            </div>
            <div className="bg-gray-300 p-4 rounded-lg shadow-lg">
              {lecLoading ? (
                <Loading />
              ) : (
                <>
                  {lecture.video ? (
                    <>
                      <video
                        src={`${server}/${lecture.video}`}
                        className="w-full rounded-lg shadow-lg"
                        controls
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                        autoPlay
                        onEnded={() => addProgress(lecture._id)}
                      ></video>
                      <h1 className="text-2xl lg:text-3xl font-bold mt-4">{lecture.title}</h1>
                      <h3 className="text-lg lg:text-xl text-gray-900 font-semibold mt-2">
                        {lecture.description}
                      </h3>
                    </>
                  ) : (
                    <h1 className="text-2xl lg:text-3xl font-bold">Please Select a Lecture</h1>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="flex-1 lg:w-1/3 lg:pl-6">
            {user && user.role === "admin" && (
              <button
                className="bg-blue1 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-orange transition-all duration-300 mb-6"
                onClick={() => setShow(!show)}
              >
                {show ? "Close" : "Add Lecture +"}
              </button>
            )}

            {show && (
              <div className="bg-gray-300 p-4 rounded-lg shadow-lg mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">Add Lecture</h2>
                <form onSubmit={submitHandler}>
                  <label htmlFor="title" className="block text-gray-800 text-sm lg:text-base font-medium mb-2">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full p-2 mb-4 rounded border border-gray-400 bg-white text-gray-900"
                  />

                  <label htmlFor="description" className="block text-gray-800 text-sm lg:text-base font-medium mb-2">
                    Description
                  </label>
                  <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full p-2 mb-4 rounded border border-gray-400 bg-white text-gray-900"
                  />

                  <input
                    type="file"
                    placeholder="Choose video"
                    onChange={changeVideoHandler}
                    required
                    className="w-full p-2 mb-4 rounded border border-gray-400 bg-white text-gray-900"
                  />

                  {videoPrev && (
                    <video
                      src={videoPrev}
                      className="w-full mb-4 rounded-lg"
                      controls
                    ></video>
                  )}

                  <button
                    type="submit"
                    disabled={btnLoading}
                    className="bg-blue1 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-500 transition-all duration-300"
                  >
                    {btnLoading ? "Please Wait..." : "Add"}
                  </button>
                </form>
              </div>
            )}

            <div className="bg-gray-300 p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">Lectures</h2>
              {lectures && lectures.length > 0 ? (
                <div className="space-y-4">
                  {lectures.map((e, i) => (
                    <div key={e._id} className="flex flex-col mb-4">
                      <div
                        onClick={() => fetchLecture(e._id)}
                        className={`p-4 cursor-pointer rounded-lg ${
                          lecture._id === e._id
                            ? "bg-blue1 text-white"
                            : "bg-white text-gray-900"
                        } transition-all duration-300`}
                      >
                        {i + 1}. {e.title}{" "}
                        {progress[0] &&
                          progress[0].completedLectures.includes(e._id) && (
                            <span className="ml-2 text-green-400">
                              <TiTick />
                            </span>
                          )}
                      </div>
                      {user && user.role === "admin" && (
                        <button
                          className="bg-red-500 text-white py-1 px-3 rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300 mt-2"
                          onClick={() => deleteHandler(e._id)}
                        >
                          Delete {e.title}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No Lectures Yet!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Lecture;
