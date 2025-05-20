import React,{ useState, useEffect} from 'react'
import { z } from 'react';

function UserDetail() {
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

      setUser(prev => ({ ...prev, age: age.toString() }));
    }
  }, [user.dateOfBirth]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setUser(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', user);
    // Here you would typically send the data to an API
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="bg-white min-h-screen justify-center p-8 ml-auto mr-auto">
      <div className="rounded-lg p-4 mb-6 border-2 border-black">
        <div className="flex items-center space-x-4"></div>
        <p className="font-medium">User: XXXX XXXX</p>
        <p className="text-black">ID Number: 1102000001001</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-lgray p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-bold text-black">USER INFORMATION</h1>
            <button
                type="submit"
                className="btn-dpink btn-dpink:hover px-4 py-1 rounded-lg text-lg font-bold text-black"
            >
              Edit
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-md mb-1">First Name</label>
              <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>
      </form>



    </div>

  )
}

export default UserDetail