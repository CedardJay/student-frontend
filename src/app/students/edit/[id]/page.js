"use client";

import { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getStudentById, updateStudent } from "@/services/api";
import Link from "next/link";
import { use } from "react";
export default function EditStudentPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    grade: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Load existing student data
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await getStudentById(id);
        const student = response.data;
        setFormData({
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          age: student.age,
          grade: student.grade,
        });
      } catch (err) {
        setError("Failed to load student data.");
      } finally {
        setFetching(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!formData.firstName || !formData.lastName ||
        !formData.email || !formData.age || !formData.grade) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      await updateStudent(id, {
        ...formData,
        age: parseInt(formData.age),
      });
      // Redirect to students list after success
      router.push("/students");
    } catch (err) {
      setError("Failed to update student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-2xl mx-auto py-10 px-6">

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/students"
              className="text-blue-600 hover:underline text-sm"
            >
              ← Back to Students
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Edit Student
          </h1>
          <p className="text-gray-500 mb-6">
            Update the student details below.
          </p>

          {/* Loading State */}
          {fetching ? (
            <div className="text-center py-20 text-gray-500">
              Loading student data...
            </div>
          ) : (
            <>
              {/* Error Message */}
              {error && (
                <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {/* Form */}
              <div className="bg-white rounded-lg shadow p-6 space-y-4">

                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter student email"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Age & Grade */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Enter age"
                      min="1"
                      max="100"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Grade
                    </label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select grade</option>
                      <option value="1st">1st Grade</option>
                      <option value="2nd">2nd Grade</option>
                      <option value="3rd">3rd Grade</option>
                      <option value="4th">4th Grade</option>
                      <option value="5th">5th Grade</option>
                      <option value="6th">6th Grade</option>
                      <option value="7th">7th Grade</option>
                      <option value="8th">8th Grade</option>
                      <option value="9th">9th Grade</option>
                      <option value="10th">10th Grade</option>
                      <option value="11th">11th Grade</option>
                      <option value="12th">12th Grade</option>
                    </select>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-2">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <Link
                    href="/students"
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded font-medium hover:bg-gray-300 transition"
                  >
                    Cancel
                  </Link>
                </div>

              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}