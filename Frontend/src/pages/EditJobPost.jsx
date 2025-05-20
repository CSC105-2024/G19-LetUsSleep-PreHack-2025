import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

// ดึง data เข้ามาจาก backend มาใส่
function EditJobPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [jobData, setJobData] = useState({
        jobTitle: '',
        jobDescription: '',
        responsibilities: '',
        qualifications: '',
        benefits: '',
        workingHours: '',
        location: '',
        employmentType: '',
        minSalary: '',
        maxSalary: '',
    });

    // handle form change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData((prev) => ({...prev, [name]: value,}));
    };

    const handleSave = (e) => {
        // ป้องกันการ reload หน้าจอ
        e.preventDefault();
        console.log('Saving data:', jobData); // ส่งไป backend หรือเก็บใน local ก็ได้
    };

    const handlePublish = (e) => {
        e.preventDefault();
        console.log(jobData); // ส่งไป backend หรือเก็บใน local ก็ได้
    };

  return (
    // background 
    <div className='bg-lgray'>

        {/* Inside */}
        <div className='py-[106px] px-[50px] sm:px-[85px] '>

            {/* Box Title + bin icon */}
            <div className='flex justify-between'>
                <h1 className='pb-[30px]'>Post Job(Draft)</h1>
                
            </div>
            
            {/* Form Field */}
            <form className='flex flex-col sm:gap-[123px] sm:flex-row sm:relative'>

                {/* Desktop left part*/}
                <div className='w-full sm:w-1/2 sm:min-w-0'>

                    {/* job title */}
                    <div className='flex flex-col pb-[32px]'>
                        <label className='mb-[9px]'>Job Title*</label>
                        <input 
                            type="text" 
                            name="jobTitle"
                            placeholder="e.g., Accounting Officer" 
                            value={jobData.jobTitle}
                            onChange={handleChange}
                            class='custom-input overflow-hidden'
                            required
                        />
                    </div>

                    {/* Job Description */}
                    <div className='flex flex-col pb-[32px]'>
                        <label className='mb-[9px]'>Job Description</label>
                        <textarea  
                            type="text" 
                            name="jobDescription"
                            placeholder="Briefly describe the role and responsibilities of this position" 
                            value={jobData.jobDescription}
                            onChange={handleChange}
                            class='custom-input'
                            rows="5"
                        />
                    </div>
                    
                    {/* Responsibilities * */}
                    <div className='flex flex-col pb-[32px]'>
                        <label className='mb-[9px]'>Responsibilities *</label>
                        <textarea  
                            type="text" 
                            name="responsibilities"
                            placeholder="List key responsibilities, e.g., manage payroll, file tax reports" 
                            value={jobData.responsibilities}
                            onChange={handleChange}
                            class='custom-input'
                            rows="5"
                            required
                        />
                    </div>
                    
                    {/* Qualifications * */}
                    <div className='flex flex-col pb-[32px]'>
                        <label className='mb-[9px]'>Qualifications *</label>
                        <textarea  
                            type="text" 
                            name="qualifications"
                            placeholder="List required qualifications, e.g., Bachelor's degree, 2+ years experience" 
                            value={jobData.qualifications}
                            onChange={handleChange}
                            class='custom-input'
                            rows="5"
                            required
                        />
                    </div>

                    {/* Benefits */}
                    <div className='flex flex-col pb-[32px]'>
                        <label className='mb-[9px]'>Benefits</label>
                        <textarea  
                            type="text" 
                            name="benefits"
                            placeholder="e.g., Health insurance, annual leave, bonus" 
                            value={jobData.benefits}
                            onChange={handleChange}
                            class='custom-input'
                            rows="5"
                        />
                    </div>
                </div>
                
                {/* Desktop right part*/}
                <div className='w-full sm:w-1/2 sm:min-w-0'>
                    
                    {/* Working Hours * */}
                    <div className='flex flex-col pb-[32px]'>
                        <label className='mb-[9px]'>Working Hours *</label>
                        <input 
                            type="text" 
                            name="workingHours"
                            placeholder="e.g., Monday – Friday, 9:00AM – 6:00 PM" 
                            value={jobData.workingHours}
                            onChange={handleChange}
                            class='custom-input'
                            required
                        />
                    </div>

                    {/* Location * */}
                    <div className='flex flex-col pb-[32px]'>
                        <label className='mb-[9px]'>Location *</label>
                        <textarea 
                            type="text" 
                            name="location"
                            placeholder="e.g., Bangkok, Thailand" 
                            value={jobData.location}
                            onChange={handleChange}
                            class='custom-input'
                        />
                    </div>

                    {/* Employment Type */}
                    <div className="flex flex-col relative">
                        <label className="mb-[9px]">Employment Type</label>
                        <div className="absolute top-full w-full z-10 ">
                            <select
                                name="employmentType"
                                id="employmentType"
                                value={jobData.employmentType}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 w-full rounded-2xl bg-white">
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                                <option value="Freelancer">Freelancer</option>
                            </select>
                        </div>
                    </div>

                    {/* Salary Range */}
                    <div className='gap-[9px] pt-[64px]'>
                        <label className='mb-[9px]'>Salary Range</label>
                        <div className='mt-[9px] flex justify-between'>
                            <input 
                                type="number" 
                                name="minSalary"
                                placeholder="e.g., 25,000" 
                                value={jobData.minSalary}
                                onChange={handleChange}
                                class='custom-input'
                            />
                            <div className='flex items-center px-3'>-</div>
                            <input 
                                type="number" 
                                name="maxSalary"
                                placeholder="e.g., 35,000" 
                                value={jobData.maxSalary}
                                onChange={handleChange}
                                className='custom-input'
                            />
                        </div>

                        {/* Button */}
                        <div className='flex justify-end pt-[153px] gap-2 '>
                            <button onClick = {(e) => {e.preventDefault; navigate("/IsSavePopUp")}} className="custom-btn btn-dpink btn-dpink:hover" type='submit'>Save</button>
                            <button onClick = {(e) => {e.preventDefault; navigate("/IsPublishPopUp")}} className="custom-btn btn-black btn-black:hover" type='submit'>Publish</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    
  );
}

export default EditJobPost

// useEffect(() => {
//   if (!id) return;

//   fetch(`/api/items/${id}`)
//     .then(res => res.json())
//     .then(data => setItem(data));
// }, [id]);

// const handleSubmit = async () => {
//   await fetch(`/api/items/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(updatedData),
//     headers: { 'Content-Type': 'application/json' }
//   });
// };

{/* <h1>Editing item #{id}</h1> */}

// | การใช้งาน                        | ตัวอย่าง                     |
// | -------------------------------- | ---------------------------- |
// | ดึงข้อมูลของ item                | `fetch(`/api/items/\${id}`)` |
// | ส่งข้อมูลแก้ไข                   | `fetch(... PUT /edit/${id})` |
// | แสดงเลข id บน UI                 | `Item #{id}`                 |
// | ใช้กับ context/validation ต่าง ๆ | `if (id === something)`      |

{/* <button onClick={() => handleDelete}>
                    {/* Check again */}
                    // <svg xmlns="http://www.w3.org/2000/svg" class="icon-delete" viewBox="0 0 39 40" fill="none" strokeWidth="0.25">
                    // <path d="M11.375 34.625C10.4813 34.625 9.71642 34.307 9.0805 33.6711C8.44458 33.0352 8.12608 32.2698 8.125 31.375V10.25H6.5V7H14.625V5.375H24.375V7H32.5V10.25H30.875V31.375C30.875 32.2687 30.557 33.0341 29.9211 33.6711C29.2852 34.3081 28.5198 34.6261 27.625 34.625H11.375ZM27.625 10.25H11.375V31.375H27.625V10.25ZM14.625 28.125H17.875V13.5H14.625V28.125ZM21.125 28.125H24.375V13.5H21.125V28.125Z" fill="#040316"/>
                    // </svg>
                //</button> */}