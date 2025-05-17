import React from 'react'

function CompanyJobPostForm() {
  return (
    // background 
    <div className='bg-lgray'>

        {/* Inside */}
        <div className='py-[106px] px-[50px] sm:px-[85px] '>

            {/* Box Title + bin icon */}
            <div className='flex justify-between'>
                <h1 className='pb-[30px]'>Post Job(Draft)</h1>
                <div>
                    {/* Check again */}
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon-delete" viewBox="0 0 39 40" fill="none" strokeWidth="0.25">
                    <path d="M11.375 34.625C10.4813 34.625 9.71642 34.307 9.0805 33.6711C8.44458 33.0352 8.12608 32.2698 8.125 31.375V10.25H6.5V7H14.625V5.375H24.375V7H32.5V10.25H30.875V31.375C30.875 32.2687 30.557 33.0341 29.9211 33.6711C29.2852 34.3081 28.5198 34.6261 27.625 34.625H11.375ZM27.625 10.25H11.375V31.375H27.625V10.25ZM14.625 28.125H17.875V13.5H14.625V28.125ZM21.125 28.125H24.375V13.5H21.125V28.125Z" fill="#040316"/>
                    </svg>
                </div>
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
                            name="job title"
                            placeholder="e.g., Accounting Officer" 
                            class='custom-input overflow-hidden'
                            required
                        />
                    </div>

                    {/* Job Description */}
                    <div className='flex flex-col pb-[32px]'>
                        <label className='mb-[9px]'>Job Description</label>
                        <textarea  
                            type="text" 
                            name="Job Description"
                            placeholder="Briefly describe the role and responsibilities of this position" 
                            class='custom-input'
                            rows="5"
                        />
                    </div>
                    
                    {/* Responsibilities * */}
                    <div className='flex flex-col pb-[32px]'>
                        <label className='mb-[9px]'>Responsibilities *</label>
                        <textarea  
                            type="text" 
                            name="Responsibilities *"
                            placeholder="List key responsibilities, e.g., manage payroll, file tax reports" 
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
                            name="Qualifications *"
                            placeholder="List required qualifications, e.g., Bachelor's degree, 2+ years experience" 
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
                            name="Benefits"
                            placeholder="e.g., Health insurance, annual leave, bonus" 
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
                            name="Working Hours *"
                            placeholder="e.g., Monday – Friday, 9:00AM – 6:00 PM" 
                            class='custom-input'
                            required
                        />
                    </div>

                    {/* Job Description */}
                    <div className='flex flex-col pb-[32px]'>
                        <label className='mb-[9px]'>Location *</label>
                        <textarea 
                            type="text" 
                            name="Job Description"
                            placeholder="e.g., Bangkok, Thailand" 
                            class='custom-input'
                        />
                    </div>

                    {/* Employment Type */}
                    <div className="flex flex-col relative">
                        <label className="mb-[9px]">Employment Type</label>
                        <div className="absolute top-full w-full z-10 ">
                            <select
                                name="Employment Type"
                                id="Employment Type"
                                className="p-2 border border-gray-300 w-full rounded-2xl bg-white"
                                >
                                <option value="">Full-Time</option>
                                <option value="">Part-Time</option>
                                <option value="">Contract</option>
                                <option value="">Internship</option>
                                <option value="">Freelancer</option>
                            </select>
                        </div>
                    </div>

                    {/* Salary Range */}
                    <div className='gap-[9px] pt-[64px]'>
                        <label className='mb-[9px]'>Salary Range</label>
                        <div className='mt-[9px] flex justify-between'>
                            <input 
                                type="number" 
                                name="Min Salary Range"
                                placeholder="e.g., 25,000" 
                                class='custom-input'
                            />
                            <div className='flex items-center px-3'>-</div>
                            <input 
                                type="number" 
                                name="Max Salary Range"
                                placeholder="e.g., 35,000" 
                                class='custom-input'
                            />
                        </div>

                        {/* Button */}
                        <div className='flex justify-end pt-[153px] gap-2 '>
                            <button className="custom-btn btn-dpink" type='submit'>Save</button>
                            <button className="custom-btn btn-black" type='submit'>Publish</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    
  );
}

export default CompanyJobPostForm