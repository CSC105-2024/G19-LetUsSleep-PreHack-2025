import React, { useState } from "react";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { authAPI } from "../api/auth"; // Adjust path to your auth.jsx file

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [activeTab, setActiveTab] = useState('user'); // 'user' or 'company'

    // Form data
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear messages when user starts typing
        if (error) setError("");
        if (success) setSuccess("");
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            // Validate required fields
            if (!formData.email || !formData.password) {
                throw { error: "Please fill in all required fields" };
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                throw { error: "Please provide a valid email address" };
            }

            let result;

            // Call appropriate login API based on active tab
            if (activeTab === 'user') {
                result = await authAPI.loginUser({
                    email: formData.email,
                    password: formData.password
                });
                console.log("User login successful:", result);
            } else {
                result = await authAPI.loginCompany({
                    email: formData.email,
                    password: formData.password
                });
                console.log("Company login successful:", result);
            }

            if (result.success) {
                setSuccess(`${activeTab === 'user' ? 'User' : 'Company'} login successful! Redirecting...`);

                // Reset form
                setFormData({
                    email: "",
                    password: ""
                });

                // Redirect based on user type
                setTimeout(() => {
                    if (activeTab === 'user') {
                        window.location.href = "/user-dashboard"; // Adjust to your user dashboard route
                    } else {
                        window.location.href = "/company-dashboard"; // Adjust to your company dashboard route
                    }
                }, 1500);
            } else {
                throw { error: result.error || "Login failed" };
            }

        } catch (err) {
            console.error("Login error:", err);
            setError(err.error || err.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen"
             style={{background: 'linear-gradient(270deg, #FFB6D9 0%, #FFE6F0 25%, #FDFDFF 59.62%)'}}
        >
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10">
                {/* Tab Selection */}
                <div className="flex mb-6 text-lg">
                    <button
                        className={`mr-4 px-4 py-2 rounded-t-lg transition-colors ${
                            activeTab === 'user'
                                ? 'bg-white text-pink-600 font-bold border-b-2 border-pink-600'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                        onClick={() => setActiveTab('user')}
                        disabled={isLoading}
                    >
                        Job Seeker
                    </button>
                    <button
                        className={`px-4 py-2 rounded-t-lg transition-colors ${
                            activeTab === 'company'
                                ? 'bg-white text-pink-600 font-bold border-b-2 border-pink-600'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                        onClick={() => setActiveTab('company')}
                        disabled={isLoading}
                    >
                        Company
                    </button>
                </div>

                <h2 className="text-3xl font-bold mb-6 text-black">
                    {activeTab === 'user' ? 'JOB SEEKER LOGIN' : 'COMPANY LOGIN'}
                </h2>

                {/* Success/Error Messages */}
                {error && (
                    <div className="w-full max-w-sm mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="w-full max-w-sm mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                        {success}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full px-4 py-3 mb-4 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        disabled={isLoading}
                        required
                    />

                    <div className="relative w-full mb-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full px-4 py-3 bg-gray-100 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            disabled={isLoading}
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                        >
                            {showPassword ? <IconEye size={20} /> : <IconEyeClosed size={20} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? "LOGGING IN..." : "LOGIN"}
                    </button>
                </form>

                <p className="mt-4 text-sm text-gray-600">
                    Don't have an account?{" "}
                    <a href="/register" className="text-pink-600 font-bold hover:underline decoration-2">
                        Register
                    </a>
                </p>
            </div>

            {/* Background decoration */}
            <div className="hidden md:block md:w-1/2 text-dpink rounded-2xl bg-cover bg-center"></div>
        </div>
    );
}