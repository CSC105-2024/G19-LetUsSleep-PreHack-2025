import React, { useState } from 'react'

function Register() {
  const [activeTab, setActiveTab] = useState('jobSeeker');

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
    const {name, value, type, checked} = e.target;
    setJobSeekerData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle company form changes
  const handleCompanyChange = (e) => {
    const {name, value, type, checked} = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle job seeker form submit
  const handleJobSeekerSubmit = (e) => {
    e.preventDefault();
    console.log("Job Seeker Form submitted:", jobSeekerData);
    // Add your registration logic here
  };

  // Handle company form submit
  const handleCompanySubmit = (e) => {
    e.preventDefault();
    console.log("Company Form submitted:", companyData);
    // Add your registration logic here
  };

  return (
      <div className="max-w-4xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex mb-6">
          <div className="mr-8">
            <button
                className={`${activeTab === 'jobSeeker' ? 'text-pink-500 font-bold border-b-2 border-pink-500' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('jobSeeker')}
            >
              JOB SEEKER
            </button>
          </div>
          <div>
            <button
                className={`${activeTab === 'company' ? 'text-pink-500 font-bold border-b-2 border-pink-500' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('company')}
            >
              COMPANY
            </button>
          </div>
        </div>

        {/* Job Seeker Registration Form */}
        {activeTab === 'jobSeeker' && (
            <div>
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
                      className="p-3 border border-gray-200 bg-gray-50 rounded w-full"
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
                        className="p-3 border border-gray-200 bg-gray-50 rounded w-full"
                    />
                  </div>
                  <div className="w-1/2">
                    <input
                        type="text"
                        name="lastName"
                        value={jobSeekerData.lastName}
                        onChange={handleJobSeekerChange}
                        placeholder="Last Name"
                        className="p-3 border border-gray-200 bg-gray-50 rounded w-full"
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
                      className="p-3 border border-gray-200 bg-gray-50 rounded w-full"
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
                      className="p-3 border border-gray-200 bg-gray-50 rounded w-full"
                  />
                </div>

                {/* Password */}
                <div className="mb-6 relative">
                  <input
                      type="password"
                      name="password"
                      value={jobSeekerData.password}
                      onChange={handleJobSeekerChange}
                      placeholder="Password"
                      className="p-3 border border-gray-200 bg-gray-50 rounded w-full"
                  />
                  <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      onClick={() => {/* Add password visibility toggle logic */
                      }}
                  >
                    👁️
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
                  />
                  <label className="text-sm">
                    I have read and agreed with the Terms of Use and Privacy Policy
                  </label>
                </div>

                {/* Register Button */}
                <button
                    type="submit"
                    className="bg-black text-white font-bold py-3 px-4 rounded w-full mb-4"
                >
                  REGISTER
                </button>

                {/* Login Link */}
                <div className="text-center">
                  Already have an account? <a href="/login" className="text-pink-500 font-bold">Login</a>
                </div>
              </form>
            </div>
        )}

        {/* Company Registration Form */}
        {activeTab === 'company' && (
            <div>
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
                      className="p-3 border border-gray-200 bg-gray-50 rounded w-full"
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
                        className="p-3 border border-gray-200 bg-gray-50 rounded w-full"
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
                        className="p-3 border border-gray-200 bg-gray-50 rounded w-full"
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
                      className="p-3 border border-gray-200 bg-gray-50 rounded w-full"
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
                      className="p-3 border border-gray-200 bg-gray-50 rounded w-full"
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
                      className="p-3 border border-gray-200 bg-gray-50 rounded w-full"
                  />
                </div>

                {/* Password */}
                <div className="mb-6 relative">
                  <input
                      type="password"
                      name="password"
                      value={companyData.password}
                      onChange={handleCompanyChange}
                      placeholder="Password"
                      className="p-3 border border-gray-200 bg-gray-50 rounded w-full"
                  />
                  <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      onClick={() => {/* Add password visibility toggle logic */
                      }}
                  >
                    👁️
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
                  />
                  <label className="text-sm">
                    I have read and agreed with the Terms of Use and Privacy Policy
                  </label>
                </div>

                {/* Register Button */}
                <button
                    type="submit"
                    className="bg-black text-white font-bold py-3 px-4 rounded w-full mb-4"
                >
                  REGISTER
                </button>

                {/* Login Link */}
                <div className="text-center">
                  Already have an account? <a href="/login" className="text-pink-500 font-bold">Login</a>
                </div>
              </form>
            </div>
        )}
      </div>
  )
}
  export default Register