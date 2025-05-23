import React, {useState, useEffect} from 'react';
import {IconEye, IconEyeClosed} from "@tabler/icons-react";


export default function UserInfoForm() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        age: '',
        phoneNumber: '',
        email: '',
        password: '',
        hasExperience: false,
        jobTitle: '',
        companyName: '',
        startYear: '',
        startMonth: '',
        endYear: '',
        endMonth: '',
        stillInRole: false,
        resumeUrl: ''
    });

    // Calculate age when date of birth changes
    useEffect(() => {
        if (user.dateOfBirth) {
            const birthDate = new Date(user.dateOfBirth);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            setUser(prev => ({...prev, age: age.toString()}));
        }
    }, [user.dateOfBirth]);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setUser(prev => ({...prev, [name]: newValue}));
    };

    const handleSubmit = () => {
        console.log('Form submitted:', user);
        // Here you would typically send the data to an API
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({length: 50}, (_, i) => currentYear - i);
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="bg-white min-h-screen p-6 flex justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl">


                {/* User Profile */}
                <div className="border rounded-xl p-4 mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="bg-mgray h-16 w-16 rounded-full">
                        </div>
                        <div>
                            <p className="font-medium">User: XXXX XXXX</p>
                            <p className="text-gray-600">ID number: 1102000001001</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div>
                    <div className="bg-lgray p-4 rounded-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">USER INFORMATION</h2>
                            <button
                                type="button"
                                className="bg-dpink btn-dpink:hover text-white px-4 py-1 rounded text-sm"
                            >
                                Edit
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-1 ">First Nme</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={user.firstName}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={user.lastName}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={user.dateOfBirth}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Age</label>
                                <input
                                    type="text"
                                    name="age"
                                    value={user.age}
                                    readOnly
                                    className="w-full p-2 border rounded bg-gray-50"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={user.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded bg-white"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded bg-white"
                                />
                            </div>
                            <div className="col-span-2">
                                <div className="relative w-ful">
                                    <label className="block text-sm mb-1">Password</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded bg-white"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-5/7 right-3 transform -translate-y-1/2"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <IconEye/> : <IconEyeClosed/>}
                                    </button>
                                </div>
                            </div>

                        </div>

                        {/* Experience Section */}
                        <div className="mt-6">
                            <h3 className="font-bold mb-2">Recent Experience</h3>
                            <div className="flex items-center mb-4">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="hasExperience"
                                        checked={user.hasExperience}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className={`w-11 h-6 rounded-full peer 
                    ${user.hasExperience ? 'bg-green' : 'bg-gray-400'} 
                    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                    after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
                    after:bg-white after:border after:rounded-full after:h-5 after:w-5 
                    after:transition-all`}></div>
                                    <span className="ms-3 text-sm font-medium">I have an experience</span>
                                </label>
                            </div>

                            {/* Conditional rendering based on hasExperience */}
                            {user.hasExperience && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm mb-1">Job title</label>
                                        <input
                                            type="text"
                                            name="jobTitle"
                                            value={user.jobTitle}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-1">Company name</label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={user.companyName}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded bg-white"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm mb-1">Started</label>
                                            <div className="grid grid-cols-2 gap-2 bg-white">
                                                <select
                                                    name="startYear"
                                                    value={user.startYear}
                                                    onChange={handleChange}
                                                    className="p-2 border rounded"
                                                >
                                                    <option value="">Year</option>
                                                    {years.map(year => (
                                                        <option key={year} value={year}>{year}</option>
                                                    ))}
                                                </select>
                                                <select
                                                    name="startMonth"
                                                    value={user.startMonth}
                                                    onChange={handleChange}
                                                    className="p-2 border rounded bg-white"
                                                >
                                                    <option value="">Month</option>
                                                    {months.map((month, index) => (
                                                        <option key={index} value={index + 1}>{month}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm mb-1">Ended</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <select
                                                    name="endYear"
                                                    value={user.endYear}
                                                    onChange={handleChange}
                                                    disabled={user.stillInRole}
                                                    className={`p-2 border rounded bg-white ${user.stillInRole ? 'bg-gray-100' : ''}`}
                                                >
                                                    <option value="">Year</option>
                                                    {years.map(year => (
                                                        <option key={year} value={year}>{year}</option>
                                                    ))}
                                                </select>
                                                <select
                                                    name="endMonth"
                                                    value={user.endMonth}
                                                    onChange={handleChange}
                                                    disabled={user.stillInRole}
                                                    className={`p-2 border rounded bg-white ${user.stillInRole ? 'bg-gray-100' : ''}`}
                                                >
                                                    <option value="">Month</option>
                                                    {months.map((month, index) => (
                                                        <option key={index} value={index + 1}>{month}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <input
                                                    type="checkbox"
                                                    id="stillInRole"
                                                    name="stillInRole"
                                                    checked={user.stillInRole}
                                                    onChange={handleChange}
                                                    className="mr-2 h-4 w-4"
                                                />
                                                <label htmlFor="stillInRole" className="text-sm">Still in Role</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Resume Section */}
                        <div className="mt-6">
                            <h3 className="font-bold mb-2">Resume</h3>
                            <p className="text-sm mb-2">Be sure to upload your resume URL</p>
                            <input
                                type="text"
                                name="resumeUrl"
                                value={user.resumeUrl}
                                onChange={handleChange}
                                placeholder="Resume URL"
                                className="w-full p-2 border rounded mb-2 bg-white"
                            />
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2 rounded font-medium"
                                onClick={handleSubmit}
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}