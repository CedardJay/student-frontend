"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllStudents } from "@/services/api";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalStudents: 0,
  });
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get logged in user info
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);

    // Fetch students count
    const fetchStats = async () => {
      try {
        const response = await getAllStudents();
        setStats({ totalStudents: response.data.length });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-5xl mx-auto py-10 px-6">

          {/* Welcome Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, {user.fullName} 
            </h1>
            <p className="text-gray-500 mt-1">
              overview of the student records system.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

            {/* Total Students */}
            <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full text-2xl">
                
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Students</p>
                <p className="text-3xl font-bold text-gray-800">
                  {loading ? "..." : stats.totalStudents}
                </p>
              </div>
            </div>

            {/* Quick Add */}
            <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
              <div className="bg-green-100 text-green-600 p-4 rounded-full text-2xl">
                
              </div>
              <div>
                <p className="text-gray-500 text-sm"></p>
                <Link
                  href="/students/add"
                  className="text-green-600 font-semibold hover:underline"
                >
                  Add New Student
                </Link>
              </div>
            </div>

            {/* View All */}
            <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
              <div className="bg-purple-100 text-purple-600 p-4 rounded-full text-2xl">
                
              </div>
              <div>
                <p className="text-gray-500 text-sm"></p>
                <Link
                  href="/students"
                  className="text-purple-600 font-semibold hover:underline"
                >
                  View All Students
                </Link>
              </div>
            </div>

          </div>

          {/* Quick Navigation */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              
            </h2>
            <div className="flex gap-4">
              <Link
                href="/students"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                View Students
              </Link>
              <Link
                href="/students/add"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              >
                Add Student
              </Link>
            </div>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}