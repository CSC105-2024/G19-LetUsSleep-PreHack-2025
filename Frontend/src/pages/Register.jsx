import React, { useState } from 'react'
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { authAPI } from "../api/auth"; // Adjust path as needed

function Register() {
    const [activeTab, setActiveTab] = useState('jobSeeker');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Job seeker form state
    const [jobSeekerData, setJobSeekerData] = useState({
        identificationNumber: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        termsAgreed: false
    });

    // Company form state
    const [companyData, setCompanyData] = useState({
        companyName: "",
        industry: "",
        companySize: "",
        location: "",
        phoneNumber: "",
        email: "",
        password: "",
        termsAgreed: false
    });

    // Handle job seeker form changes
    const handleJobSeekerChange = (e) => {
        const { name, value, type, checked } = e.target;
        setJobSeekerData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        // Clear messages when user starts typing
        if (error) setError("");
        if (success) setSuccess("");
    };

    // Handle company form changes
    const handleCompanyChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCompanyData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        // Clear messages when user starts typing
        if (error) setError("");
        if (success) setSuccess("");
    };

    // Handle job seeker form submit
    const handleJobSeekerSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            // Validate required fields
            if (!jobSeekerData.firstName || !jobSeekerData.lastName ||
                !jobSeekerData.email || !jobSeekerData.password) {
                throw { error: "Please fill in all required fields" };
            }

            // Validate terms agreement
            if (!jobSeekerData.termsAgreed) {
                throw { error: "Please agree to the Terms of Use and Privacy Policy" };
            }

            // Call API
            const result = await authAPI.registerUser(jobSeekerData);
            console.log("User registration successful:", result);

            setSuccess("Registration successful! You can now login.");

            // Reset form
            setJobSeekerData({
                identificationNumber: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: "",
                password: "",
                termsAgreed: false
            });

            // Optionally redirect to login after a delay
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);

        } catch (err) {
            console.error("Registration error:", err);
            setError(err.error || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle company form submit
    const handleCompanySubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            // Validate required fields
            if (!companyData.companyName || !companyData.location ||
                !companyData.email || !companyData.password) {
                throw { error: "Please fill in all required fields" };
            }

            // Validate terms agreement
            if (!companyData.termsAgreed) {
                throw { error: "Please agree to the Terms of Use and Privacy Policy" };
            }

            // Call API
            const result = await authAPI.registerCompany(companyData);
            console.log("Company registration successful:", result);

            setSuccess("Company registration successful! You can now login.");

            // Reset form
            setCompanyData({
                companyName: "",
                industry: "",
                companySize: "",
                location: "",
                phoneNumber: "",
                email: "",
                password: "",
                termsAgreed: false
            });

            // Optionally redirect to login after a delay
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);

        } catch (err) {
            console.error("Company registration error:", err);
            setError(err.error || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-start items-center w-full lg:justify-start "
             style={{background: 'linear-gradient(270deg, #FFB6D9 0%, #FFE6F0 40%, #FDFDFF 60%)'}}
        >
            <div className="lg:w-1/2 p-32">
                <div className="">
                    {/* Tabs */}
                    <div className="flex mb-6 text-2xl">
                        <div className="mr-8">
                            <button
                                className={`${activeTab === 'jobSeeker' ? 'text-pink-500 font-bold border-b-4 border-pink-500 p-2' : 'p-2 text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('jobSeeker')}
                                disabled={isLoading}
                            >
                                JOB SEEKER
                            </button>
                        </div>
                        <div>
                            <button
                                className={`${activeTab === 'company' ? 'text-pink-500 font-bold border-b-4 border-pink-500 p-2' : 'p-2 text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('company')}
                                disabled={isLoading}
                            >
                                COMPANY
                            </button>
                        </div>
                    </div>

                    {/* Success/Error Messages */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                            {success}
                        </div>
                    )}
                </div>

                {/* Job Seeker Registration Form */}
                {activeTab === 'jobSeeker' && (
                    <div className="w-full">
                        <h1 className="text-3xl font-bold mb-8 text-center">Create a New Account</h1>
                        <form onSubmit={handleJobSeekerSubmit}>
                            {/* Identification Number */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="identificationNumber"
                                    value={jobSeekerData.identificationNumber}
                                    onChange={handleJobSeekerChange}
                                    placeholder="Identification Number"
                                    className="p-3 border border-gray-200 bg-gray-50 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* First Name and Last Name */}
                            <div className="flex gap-4 mb-4">
                                <div className="w-1/2">
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={jobSeekerData.firstName}
                                        onChange={handleJobSeekerChange}
                                        placeholder="First Name"
                                        className="p-3 border border-gray-200 bg-gray-50 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={jobSeekerData.lastName}
                                        onChange={handleJobSeekerChange}
                                        placeholder="Last Name"
                                        className="p-3 border border-gray-200 bg-gray-50 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div className="mb-4">
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={jobSeekerData.phoneNumber}
                                    onChange={handleJobSeekerChange}
                                    placeholder="Phone Number"
                                    className="p-3 border border-gray-200 bg-gray-50 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <input
                                    type="email"
                                    name="email"
                                    value={jobSeekerData.email}
                                    onChange={handleJobSeekerChange}
                                    placeholder="Email"
                                    className="p-3 border border-gray-200 bg-gray-50 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-6 relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={jobSeekerData.password}
                                    onChange={handleJobSeekerChange}
                                    placeholder="Password"
                                    className="p-3 border border-gray-200 bg-gray-50 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    disabled={isLoading}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                >
                                    {showPassword ? <IconEye size={20} /> : <IconEyeClosed size={20} />}
                                </button>
                            </div>

                            {/* Terms Checkbox */}
                            <div className="mb-6 flex items-start">
                                <input
                                    type="checkbox"
                                    name="termsAgreed"
                                    checked={jobSeekerData.termsAgreed}
                                    onChange={handleJobSeekerChange}
                                    className="mt-1 mr-2"
                                    disabled={isLoading}
                                    required
                                />
                                <label className="text-sm">
                                    I have read and agreed with the Terms of Use and Privacy Policy
                                </label>
                            </div>

                            {/* Register Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded w-full mb-4 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? "REGISTERING..." : "REGISTER"}
                            </button>

                            {/* Login Link */}
                            <div className="text-center">
                                Already have an account? <a href="/login" className="text-pink-500 font-bold hover:underline">Login</a>
                            </div>
                        </form>
                    </div>
                )}

                {/* Company Registration Form */}
                {activeTab === 'company' && (
                    <div className="">
                        <h1 className="text-3xl font-bold mb-8 text-center">Create a New Company Account</h1>

                        <form onSubmit={handleCompanySubmit}>
                            {/* Company Name */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="companyName"
                                    value={companyData.companyName}
                                    onChange={handleCompanyChange}
                                    placeholder="Company Name"
                                    className="p-3 border border-gray-200 bg-gray-50 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            {/* Industry + size */}
                            <div className="flex gap-4 mb-4">
                                {/* Industry */}
                                <div className="w-1/2">
                                    <select
                                        name="industry"
                                        value={companyData.industry}
                                        onChange={handleCompanyChange}
                                        className="p-3 border border-gray-200 bg-gray-50 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        disabled={isLoading}
                                    >
                                        <option value="">Industry</option>
                                        <option value="Information Technology">Information Technology</option>
                                        <option value="Finance / Banking">Finance / Banking</option>
                                        <option value="Healthcare / Medical">Healthcare / Medical</option>
                                        <option value="Education">Education</option>
                                        <option value="Manufacturing">Manufacturing</option>
                                        <option value="Retail / E-commerce">Retail / E-commerce</option>
                                        <option value="Hospitality / Travel">Hospitality / Travel</option>
                                        <option value="Construction / Real Estate">Construction / Real Estate</option>
                                        <option value="Marketing / Advertising">Marketing / Advertising</option>
                                        <option value="Telecommunications">Telecommunications</option>
                                        <option value="Energy / Utilities">Energy / Utilities</option>
                                        <option value="Logistics / Supply Chain">Logistics / Supply Chain</option>
                                        <option value="Legal / Consulting">Legal / Consulting</option>
                                        <option value="Media / Entertainment">Media / Entertainment</option>
                                        <option value="Government / NGO">Government / NGO</option>
                                    </select>
                                </div>

                                {/* Company Size */}
                                <div className="w-1/2">
                                    <select
                                        name="companySize"
                                        value={companyData.companySize}
                                        onChange={handleCompanyChange}
                                        className="p-3 border border-gray-200 bg-gray-50 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        disabled={isLoading}
                                    >
                                        <option value="">Company Size</option>
                                        <option value="1-10">1-10</option>
                                        <option value="11-50">11-50</option>
                                        <option value="51-200">51-200</option>
                                        <option value="201-500">201-500</option>
                                        <option value="501-1000">501-1000</option>
                                        <option value="1001-5000">1001-5000</option>
                                        <option value="5001-10000">5001-10000</option>
                                        <option value="10000+">10000+</option>
                                    </select>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="location"
                                    value={companyData.location}
                                    onChange={handleCompanyChange}
                                    placeholder="Location"
                                    className="p-3 border border-gray-200 bg-gray-50 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            {/* Phone Number */}
                            <div className="mb-4">
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={companyData.phoneNumber}
                                    onChange={handleCompanyChange}
                                    placeholder="Phone Number"
                                    className="p-3 border border-gray-200 bg-gray-50 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <input
                                    type="email"
                                    name="email"
                                    value={companyData.email}
                                    onChange={handleCompanyChange}
                                    placeholder="Email"
                                    className="p-3 border border-gray-200 bg-gray-50 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-6 relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={companyData.password}
                                    onChange={handleCompanyChange}
                                    placeholder="Password"
                                    className="p-3 border border-gray-200 bg-gray-50 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    disabled={isLoading}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                >
                                    {showPassword ? <IconEye size={20} /> : <IconEyeClosed size={20} />}
                                </button>
                            </div>

                            {/* Terms Checkbox */}
                            <div className="mb-6 flex items-start">
                                <input
                                    type="checkbox"
                                    name="termsAgreed"
                                    checked={companyData.termsAgreed}
                                    onChange={handleCompanyChange}
                                    className="mt-1 mr-2"
                                    disabled={isLoading}
                                    required
                                />
                                <label className="text-sm">
                                    I have read and agreed with the Terms of Use and Privacy Policy
                                </label>
                            </div>

                            {/* Register Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-black text-white font-bold py-3 px-4 rounded w-full mb-4 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? "REGISTERING..." : "REGISTER"}
                            </button>

                            {/* Login Link */}
                            <div className="text-center">
                                Already have an account? <a href="/login" className="text-pink-500 font-bold hover:underline">Login</a>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Register