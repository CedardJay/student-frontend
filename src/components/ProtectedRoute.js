"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      } else {
        // eslint-disable-next-line
        setIsAuthorized(token);
      }
    };
    checkAuth();
  }, [router]);

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}