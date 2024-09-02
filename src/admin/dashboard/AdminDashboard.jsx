import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../utils/layout";
import axios from "axios";
import { server } from "../../main";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Import Chart.js

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [stats, setStats] = useState({
    totalCourses: 0,
    totalBooks: 0,
    totalUser: 0,
    totalEbooks: 0,
    totalNotes: 0
  });

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log("Stats data:", data);

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  const data = {
    labels: ["Courses", "Books", "Users", "Ebooks", "Notes"],
    datasets: [
      {
        label: "Total Stats",
        data: [stats.totalCourses, stats.totalBooks, stats.totalUser, stats.totalEbooks, stats.totalNotes],
        backgroundColor: "rgba(53, 162, 235, 0.5)", // Light blue color
        borderColor: "rgba(53, 162, 235, 1)", // Darker blue color
        borderWidth: 1,
      },
    ],
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-gray-300 text-black rounded-lg shadow-lg p-6 max-w-4xl w-full">
          <h1 className="text-2xl font-bold mb-4 text-center text-blue1">Admin Dashboard</h1>
          <div className="mb-6">
            <Bar data={data} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: function (tooltipItem) {
                      return tooltipItem.dataset.label + ": " + tooltipItem.raw;
                    }
                  }
                }
              }
            }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-100 rounded-lg shadow-md text-center">
              <p className="text-lg font-semibold text-blue-700">Total Courses</p>
              <p className="text-2xl font-bold text-blue-900">{stats.totalCourses}</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-lg shadow-md text-center">
              <p className="text-lg font-semibold text-blue-700">Total Books</p>
              <p className="text-2xl font-bold text-blue-900">{stats.totalBooks}</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-lg shadow-md text-center">
              <p className="text-lg font-semibold text-blue-700">Total Users</p>
              <p className="text-2xl font-bold text-blue-900">{stats.totalUser}</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-lg shadow-md text-center">
              <p className="text-lg font-semibold text-blue-700">Total Ebooks</p>
              <p className="text-2xl font-bold text-blue-900">{stats.totalEbooks}</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-lg shadow-md text-center">
              <p className="text-lg font-semibold text-blue-700">Total Notes</p>
              <p className="text-2xl font-bold text-blue-900">{stats.totalNotes}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
