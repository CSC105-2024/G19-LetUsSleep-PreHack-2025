import { useState } from 'react';

export default function FilterBar() {

  const [jobTypes, setJobTypes] = useState({
    fullTime: true,
    partTime: true,
    internship: true,
    projectWork: true
  });
  
  const [experienceLevels, setExperienceLevels] = useState({
    beginner: true,
    intermediate: true,
    expert: true
  });
  
  const [salaryRange, setSalaryRange] = useState({
    min:0,
    max:1000000000
  });
  
  const [jobCategory, setJobCategory] = useState('');
  
  // Job categories for the select input
  const jobCategories = [
    'Engineering',
    'Marketing',
    'Design',
    'Finance',
    'Sales',
    'Human Resources',
    'Customer Support',
    'Product Management',
    'Data Science',
    'Research'
  ];
  
  // Handle checkbox changes
  const handleJobTypeChange = (e) => {
    setJobTypes({
      ...jobTypes,
      [e.target.name]: e.target.checked
    });
  };
  
  const handleExperienceChange = (e) => {
    setExperienceLevels({
      ...experienceLevels,
      [e.target.name]: e.target.checked
    });
  };
  
  // Handle salary range changes
  const handleSalaryChange = (e) => {
    setSalaryRange({
      ...salaryRange,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle category selection
  const handleCategoryChange = (e) => {
    setJobCategory(e.target.value);
  };
  
  // Handle filter application
  const applyFilters = () => {
    const filters = {
      jobTypes,
      experienceLevels,
      salaryRange,
      jobCategory
    };
    if(salaryRange.min <= salaryRange.max){
        console.log('Applied filters:', filters);
        alert("Apply Filter Success!")
    }
    else{
        alert("min salary should not be more than max salary")
    }
  };
  
  // Handle filter reset
  const resetFilters = () => {
    setJobTypes({
      fullTime: true,
      partTime: true,
      internship: true,
      projectWork: true
    });
    setExperienceLevels({
      beginner: true,
      intermediate: true,
      expert: true
    });
    setSalaryRange({
      min: 0,
      max: 1000000000
    });
    setJobCategory('');
  };
  
  return (
    <div className=" bg-gradient-to-b from-gray-200 to-white p-5 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 mt-2 " >Filter Jobs</h2>
      
      {/* Job Type Filter */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Job Type</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="fullTime"
              name="fullTime"
              checked={jobTypes.fullTime}
              onChange={handleJobTypeChange}
              className="mr-2"
            />
            <label htmlFor="fullTime">Full Time</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="partTime"
              name="partTime"
              checked={jobTypes.partTime}
              onChange={handleJobTypeChange}
              className="mr-2"
            />
            <label htmlFor="partTime">Part Time</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="internship"
              name="internship"
              checked={jobTypes.internship}
              onChange={handleJobTypeChange}
              className="mr-2"
            />
            <label htmlFor="internship">Internship</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="projectWork"
              name="projectWork"
              checked={jobTypes.projectWork}
              onChange={handleJobTypeChange}
              className="mr-2"
            />
            <label htmlFor="projectWork">Project Work</label>
          </div>
        </div>
      </div>
      
      {/* Experience Level Filter */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Job Experience Level</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="beginner"
              name="beginner"
              checked={experienceLevels.beginner}
              onChange={handleExperienceChange}
              className="mr-2"
            />
            <label htmlFor="beginner">Beginner</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="intermediate"
              name="intermediate"
              checked={experienceLevels.intermediate}
              onChange={handleExperienceChange}
              className="mr-2"
            />
            <label htmlFor="intermediate">Intermediate</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="expert"
              name="expert"
              checked={experienceLevels.expert}
              onChange={handleExperienceChange}
              className="mr-2"
            />
            <label htmlFor="expert">Expert</label>
          </div>
        </div>
      </div>
      
      {/* Salary Range Filter */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Job Salary Range</h3>
        <div className="flex flex-col space-x-2">
          <div className="flex-1">
            <label htmlFor="min" className="block text-sm mb-1">Min</label>
            <input
              type="number"
              id="min"
              name="min"
              value={salaryRange.min}
              onChange={handleSalaryChange}
              placeholder="Minimum"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="max" className="block text-sm mb-1">Max</label>
            <input
              type="number"
              id="max"
              name="max"
              value={salaryRange.max}
              onChange={handleSalaryChange}
              placeholder="Maximum"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>
      
      {/* Job Category Filter */}
      <div className="mb-4 ">
        <h3 className="font-semibold mb-2">Job Category</h3>
        <select
          id="jobCategory"
          value={jobCategory}
          onChange={handleCategoryChange}
          className="w-full p-2 border rounded bg-white"
        >
          <option value="">Select Category</option>
          {jobCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col space-y-2 mt-6">
        <button
          onClick={applyFilters}
          className="bg-dpink text-white py-2 px-4 rounded hover:bg-pink-700 flex-1"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 flex-1"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
