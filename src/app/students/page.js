"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getAllStudents, deleteStudent } from "@/services/api";
import Link from "next/link";

export default function StudentsPage() {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Fetch all students on page load
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getAllStudents();
      setStudents(response.data);
    } catch (err) {
      setError("Failed to load students. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // Confirm before deleting
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await deleteStudent(id);
      // Remove student from list without refetching
      setStudents(students.filter((s) => s.id !== id));
    } catch (err) {
      setError("Failed to delete student. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto py-10 px-6">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Students</h1>
              <p className="text-gray-500 mt-1">
                {students.length} student{students.length !== 1 ? "s" : ""} registered
              </p>
            </div>
            <Link
              href="/students/add"
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            >
              + Add Student
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-20 text-gray-500 text-lg">
              Loading students...
            </div>
          ) : students.length === 0 ? (

            /* Empty State */
            <div className="text-center py-20 bg-white rounded-lg shadow">
              <p className="text-gray-500 text-lg mb-4">
                No students found.
              </p>
              <Link
                href="/students/add"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Add Your First Student
              </Link>
            </div>
          ) : (

            /* Students Table */
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-gray-600 font-semibold">#</th>
                    <th className="px-6 py-3 text-gray-600 font-semibold">Full Name</th>
                    <th className="px-6 py-3 text-gray-600 font-semibold">Email</th>
                    <th className="px-6 py-3 text-gray-600 font-semibold">Age</th>
                    <th className="px-6 py-3 text-gray-600 font-semibold">Grade</th>
                    <th className="px-6 py-3 text-gray-600 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={student.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {student.firstName} {student.lastName}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{student.email}</td>
                      <td className="px-6 py-4 text-gray-600">{student.age}</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {student.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-3">
                        {/* Edit Button */}
                        <button
                          onClick={() => router.push(`/students/edit/${student.id}`)}
                          className="bg-yellow-400 text-white px-4 py-1 rounded hover:bg-yellow-500 transition"
                        >
                          Edit
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(student.id)}
                          disabled={deletingId === student.id}
                          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition disabled:opacity-50"
                        >
                          {deletingId === student.id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </ProtectedRoute>
  );
}