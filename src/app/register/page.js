"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/api";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        inviteCode: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Check passwords match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const response = await registerUser({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                inviteCode:formData.inviteCode,
            });
            // Save token and user info
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify({
                email: response.data.email,
                fullName: response.data.fullName,
            }));
            // Redirect to dashboard
            router.push("/");
        } catch (err) {
            setError("Registration failed. Invalid invite code or email already in use.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

                {/* Header */}
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
                    Student Record System
                </h1>
                <p className="text-center text-gray-500 mb-6">
                    Create a new account
                </p>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {/* Form */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Invite Code
                        </label>
                        <input
                            type="password"
                            name="inviteCode"
                            value={formData.inviteCode}
                            onChange={handleChange}
                            placeholder="Enter your invite code"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </div>

                {/* Login Link */}
                <p className="text-center text-gray-500 mt-4">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Sign in here
                    </Link>
                </p>

            </div>
        </div>
    );
}