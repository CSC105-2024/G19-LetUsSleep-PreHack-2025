import React, { useState, useEffect } from 'react';
import { IconEye, IconEyeClosed, IconEdit, IconCheck, IconX } from "@tabler/icons-react";
import { authAPI } from '../api/auth.jsx'; // Adjust import path as needed

export default function UserInfoForm() {
    const [user, setUser] = useState({
        identificationNumber: '',
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

    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Load user data on component mount
    useEffect(() => {
        loadUserData();
    }, []);

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

            setUser(prev => ({ ...prev, age: age.toString() }));
        }
    }, [user.dateOfBirth]);

    const loadUserData = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await authAPI.getCurrentUser();

            if (response.success && response.data?.user) {
                const userData = response.data.user;
                setUser({
                    identificationNumber: userData.identificationNumber || '',
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || '',
                    dateOfBirth: userData.dateOfBirth ? userData.dateOfBirth.split('T')[0] : '',
                    age: userData.age?.toString() || '',
                    phoneNumber: userData.phoneNumber || '',
                    email: userData.email || '',
                    password: '', // Don't populate password field
                    hasExperience: userData.hasExperience || false,
                    jobTitle: userData.jobTitle || '',
                    companyName: userData.companyName || '',
                    startYear: userData.startYear?.toString() || '',
                    startMonth: userData.startMonth?.toString() || '',
                    endYear: userData.endYear?.toString() || '',
                    endMonth: userData.endMonth?.toString() || '',
                    stillInRole: userData.stillInRole || false,
                    resumeUrl: userData.resumeUrl || ''
                });
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            setError(error.error || 'Failed to load user data');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setUser(prev => ({ ...prev, [name]: newValue }));

        // Clear any existing messages when user starts editing
        if (error) setError('');
        if (success) setSuccess('');
    };

    const handleEdit = () => {
        setIsEditing(true);
        setError('');
        setSuccess('');
    };

    const handleCancel = () => {
        setIsEditing(false);
        setError('');
        setSuccess('');
        // Reload original data
        loadUserData();
    };

    const handleSave = async () => {
        try {
            setUpdating(true);
            setError('');
            setSuccess('');

            // Prepare data for update (exclude empty password)
            const updateData = { ...user };
            if (!updateData.password.trim()) {
                delete updateData.password;
            }

            // Convert date to proper format if provided
            if (updateData.dateOfBirth) {
                updateData.dateOfBirth = new Date(updateData.dateOfBirth).toISOString();
            }

            // Convert numeric fields
            ['startYear', 'startMonth', 'endYear', 'endMonth'].forEach(field => {
                if (updateData[field]) {
                    updateData[field] = parseInt(updateData[field]);
                }
            });

            const response = await authAPI.updateUser(updateData);

            if (response.success) {
                setSuccess('Profile updated successfully!');
                setIsEditing(false);
                // Optionally reload data to get server-side computed values
                setTimeout(() => {
                    loadUserData();
                    setSuccess('');
                }, 2000);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            setError(error.error || 'Failed to update profile');
        } finally {
            setUpdating(false);
        }
    };

    const handleResumeUpload = async () => {
        try {
            if (!user.resumeUrl.trim()) {
                setError('Please enter a resume URL');
                return;
            }

            setUpdating(true);
            const response = await authAPI.updateUser({ resumeUrl: user.resumeUrl });

            if (response.success) {
                setSuccess('Resume URL updated successfully!');
                setTimeout(() => setSuccess(''), 3000);
            }
        } catch (error) {
            console.error('Error updating resume:', error);
            setError(error.error || 'Failed to update resume URL');
        } finally {
            setUpdating(false);
        }
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

    if (loading) {
        return (
            <div className="bg-white min-h-screen p-6 flex justify-center items-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading user data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen p-6 flex justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl">
                {/* Error/Success Messages */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        <span className="block sm:inline">{success}</span>
                    </div>
                )}

                {/* User Profile Header */}
                <div className="border rounded-xl p-4 mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="bg-gray-300 h-16 w-16 rounded-full flex items-center justify-center">
                            <span className="text-xl font-bold text-gray-600">
                                {user.firstName?.[0]}{user.lastName?.[0]}
                            </span>
                        </div>
                        <div>
                            <p className="font-medium">
                                User: {user.firstName} {user.lastName}
                            </p>
                            <p className="text-gray-600">
                                ID number: {user.identificationNumber || 'Not provided'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div>
                    <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">USER INFORMATION</h2>
                            <div className="flex space-x-2">
                                {!isEditing ? (
                                    <button
                                        type="button"
                                        onClick={handleEdit}
                                        className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-1 rounded text-sm flex items-center space-x-1"
                                    >
                                        <IconEdit size={16} />
                                        <span>Edit</span>
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            onClick={handleSave}
                                            disabled={updating}
                                            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-1 rounded text-sm flex items-center space-x-1"
                                        >
                                            <IconCheck size={16} />
                                            <span>{updating ? 'Saving...' : 'Save'}</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            disabled={updating}
                                            className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-4 py-1 rounded text-sm flex items-center space-x-1"
                                        >
                                            <IconX size={16} />
                                            <span>Cancel</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm mb-1">Identification Number</label>
                                <input
                                    type="text"
                                    name="identificationNumber"
                                    value={user.identificationNumber}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full p-2 border rounded ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={user.firstName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full p-2 border rounded ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={user.lastName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full p-2 border rounded ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={user.dateOfBirth}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full p-2 border rounded ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Age</label>
                                <input
                                    type="text"
                                    name="age"
                                    value={user.age}
                                    readOnly
                                    className="w-full p-2 border rounded bg-gray-100"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={user.phoneNumber}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full p-2 border rounded ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full p-2 border rounded ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                                />
                            </div>
                            {isEditing && (
                                <div className="col-span-2">
                                    <div className="relative w-full">
                                        <label className="block text-sm mb-1">
                                            Password <span className="text-gray-500">(leave empty to keep current)</span>
                                        </label>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={user.password}
                                            onChange={handleChange}
                                            placeholder="Enter new password"
                                            className="w-full p-2 border rounded bg-white pr-10"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-8 right-3 transform"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <IconEye size={18} /> : <IconEyeClosed size={18} />}
                                        </button>
                                    </div>
                                </div>
                            )}
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
                                        disabled={!isEditing}
                                        className="sr-only peer"
                                    />
                                    <div className={`w-11 h-6 rounded-full peer 
                                        ${user.hasExperience ? 'bg-green-500' : 'bg-gray-400'} 
                                        ${!isEditing ? 'opacity-50' : ''}
                                        peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                                        after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
                                        after:bg-white after:border after:rounded-full after:h-5 after:w-5 
                                        after:transition-all`}>
                                    </div>
                                    <span className="ms-3 text-sm font-medium">I have an experience</span>
                                </label>
                            </div>

                            {user.hasExperience && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm mb-1">Job title</label>
                                        <input
                                            type="text"
                                            name="jobTitle"
                                            value={user.jobTitle}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className={`w-full p-2 border rounded ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-1">Company name</label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={user.companyName}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className={`w-full p-2 border rounded ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm mb-1">Started</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <select
                                                    name="startYear"
                                                    value={user.startYear}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    className={`p-2 border rounded ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
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
                                                    disabled={!isEditing}
                                                    className={`p-2 border rounded ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
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
                                                    disabled={!isEditing || user.stillInRole}
                                                    className={`p-2 border rounded ${!isEditing || user.stillInRole ? 'bg-gray-100' : 'bg-white'}`}
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
                                                    disabled={!isEditing || user.stillInRole}
                                                    className={`p-2 border rounded ${!isEditing || user.stillInRole ? 'bg-gray-100' : 'bg-white'}`}
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
                                                    disabled={!isEditing}
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
                                type="url"
                                name="resumeUrl"
                                value={user.resumeUrl}
                                onChange={handleChange}
                                placeholder="https://example.com/your-resume.pdf"
                                className="w-full p-2 border rounded mb-2 bg-white"
                            />
                            <button
                                type="button"
                                onClick={handleResumeUpload}
                                disabled={updating || !user.resumeUrl.trim()}
                                className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white py-2 rounded font-medium"
                            >
                                {updating ? 'Updating...' : 'Update Resume URL'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}