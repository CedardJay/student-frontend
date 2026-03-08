"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      
      {/* Left - App Name */}
      <div className="text-xl font-bold">
        <Link href="/">Student Record System</Link>
      </div>

      {/* Middle - Navigation Links */}
      <div className="flex gap-6">
        <Link
          href="/"
          className="hover:text-blue-200 transition"
        >
          Dashboard
        </Link>
        <Link
          href="/students"
          className="hover:text-blue-200 transition"
        >
          Students
        </Link>
        <Link
          href="/students/add"
          className="hover:text-blue-200 transition"
        >
          Add Student
        </Link>
      </div>

      {/* Right - User Info & Logout */}
      <div className="flex items-center gap-4">
        <span className="text-blue-200 text-sm">
          Welcome, {user.fullName}
        </span>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-4 py-1 rounded font-medium hover:bg-blue-100 transition"
        >
          Logout
        </button>
      </div>

    </nav>
  );
}