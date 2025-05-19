import React, { useState } from 'react'

function EditCoProfile() {
    const [coData, setCoData] = useState({
        companyName: "",
        companyOverview: "",
        industry: "",
        companySize: "",
        yearEstablished: "",
        generalBenefits: "",
        socialMedia: "",
        workingHours: "",
        location: "",
        phoneContact: "",
        website: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCoData((prev) => ({...prev, [name]: value,}));
    };

    const handleSave = (e) => {
        // ป้องกันการ reload หน้าจอ
        e.preventDefault();
        console.log('Saving data:', coData); // ส่งไป backend หรือเก็บใน local ก็ได้
    };

    const handlePublish = (e) => {
        e.preventDefault();
        console.log(coData); // ส่งไป backend หรือเก็บใน local ก็ได้
    };
    
  return (
    // background 
    <div className='bg-lgray'>

        {/* Inside */}
        <div className='py-[106px] px-[50px] sm:px-[85px] '>

            {/* Upload Picture */}
            <div>
              <img src="" alt="" />
            </div>

            {/* Box Title + bin icon */}
            <div className='flex flex-row sm:flex-col justify-center items-start gap-2 pb-[30px]'>
                <div>
                  {/* Upload Logo -continue*/}
                  <img src="" alt="" />
                </div>
                <h1 className='font-bold'>Company Profile</h1>
                <div>
                    {/* Check again Edit icon*/}
                </div>
            </div>
            
            {/* Form Field */}
            <form className='flex flex-col sm:gap-[123px] sm:flex-row sm:relative'>

                {/* Desktop left part*/}
                <div className='w-full sm:w-1/2 sm:min-w-0'>

                    {/* Company Name */}
                    <div className='flex flex-col pb-[32px]'>
                        <label className='mb-[9px]'>Company Name</label>
                            <input 
                            type="text" 
                            name="companyName"
                            value={coData.companyName}
                            onChange={handleChange}
                            placeholder="e.g., MACloudTech" 
                            className='custom-input overflow-hidden'
                            required
                            />
                    </div>

                    {/* Company Overview */}
                    <div className='flex flex-col pb-[32px]'>
                        <label className='mb-[9px]'>Company Overview</label>
                        <textarea  
                            name="companyOverview"
                            value={coData.companyOverview}
                            onChange={handleChange}
                            placeholder="Briefly describe your company’s background and goals" 
                            className='custom-input'
                            rows="5"
                        />
                    </div>
                    
                    {/* Industry + size */}
                    <div className='flex flex-row w-full gap-[9px]'>

                        {/* Industry */}
                        <div className="w-1/2 relative flex flex-col">
                          <label className="mb-[9px]">Industry</label>
                            <div className="absolute top-full w-full z-10 ">
                              <select
                                  name="industry"
                                  value={coData.industry}
                                  onChange={handleChange}
                                  id="Industry"
                                  className="p-2 border border-gray-300 w-full rounded-2xl bg-white"
                              >
                                    <option value="Select Industry">Select Industry</option>
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
                        </div>

                        {/* size */}
                        <div className="w-1/2 relative">
                          <label className="mb-[9px]">Company Size</label>
                          <div className="absolute top-full w-full z-10 ">
                              <select
                                  name="companySize"
                                  id="companySize"
                                  value={coData.companySize}
                                  onChange={handleChange}
                                  className="p-2 border border-gray-300 w-full rounded-2xl bg-white"
                              >
                                <option value="">Select Company Size</option>
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
                    </div>

                        

                        {/* Year Established */}
                        <div className='flex flex-col pb-[32px] pt-[64px]'>
                            <label className='mb-[9px]'>Year Established</label>
                            <input 
                                type="number" 
                                name="yearEstablished"
                                value={coData.yearEstablished}
                                onChange={handleChange}
                                placeholder="e.g. 2015" 
                                class='custom-input overflow-hidden'
                                required
                            />
                        </div>

                        {/* General Benefits */}
                        <div className='flex flex-col pb-[32px]'>
                            <label className='mb-[9px]'>General Benefits</label>
                            <textarea  
                                type="text" 
                                name="General Benefits"
                                placeholder="e.g. Health insurance, Remote work, Training budget, Flexible hours" 
                                value={coData.generalBenefits}
                                onChange={handleChange}
                                class='custom-input'
                                rows="5"
                                required
                            />
                        </div>
                </div>    

                {/* Desktop right part*/}
                <div className='w-full sm:w-1/2 sm:min-w-0'>
                    
                    {/* Social Media */}
                    <div className='flex flex-col pb-[32px]'>
                        <label className='mb-[9px]'>Social Media</label>
                        <textarea
                            type="text" 
                            name="socialMedia"
                            placeholder="e.g. @pttorofficial / www.facebook.com/pttor" 
                            value={coData.socialMedia}
                            onChange={handleChange}
                            class='custom-input'
                            rows="5"
                            
                        />
                    </div>

                    {/* Working Hours * */}
                    <div className='flex flex-col pb-[32px]'>
                        <label className='mb-[9px]'>Working Hours *</label>
                        <input 
                            type="text" 
                            name="workingHours"
                            placeholder="e.g. Monday – Friday, 9:00 AM – 5:30 PM" 
                            value={coData.workingHours}
                            onChange={handleChange}
                            class='custom-input'
                            required
                        />
                    </div>

                    {/* location */}
                    <div className='flex flex-col pb-[32px]'>
                        <label className='mb-[9px]'>location</label>
                        <textarea 
                            type="text" 
                            name="location"
                            placeholder="e.g. 99 Innovation Ave, Tech City, Country"
                            value={coData.location}
                            onChange={handleChange}
                            class='custom-input'
                            rows={3}
                            required
                        />
                    </div>

                    {/* Phone Contact */}
                    <div className='flex flex-col pb-[32px]'>
                        <label className='mb-[9px]'>Phone Contact</label>
                        <textarea 
                            type="text" 
                            name="phoneContact"
                            value={coData.phoneContact}
                            onChange={handleChange}
                            placeholder="e.g. +1 234 567 8901" 
                            class='custom-input'
                            rows={2}
                        />
                    </div>

                    {/* Website */}
                    <div className='flex flex-col pb-[32px]'>
                        <label className='mb-[9px]'>Website</label>
                        <textarea 
                            type="text" 
                            name="website"
                            placeholder="e.g. www.MACloudTech.io" 
                            value={coData.website}
                            onChange={handleChange}
                            class='custom-input'
                            rows={2}
                        />
                    </div>

                    {/* Button */}
                    <div className='flex justify-end pt-[153px] gap-2 '>
                        <button onClick={handleSave} className="custom-btn btn-dpink btn-dpink:hover" type='submit'>
                            Save
                        </button>
                        <button 
                            onClick={handlePublish} 
                            className="custom-btn btn-black btn-black:hover" type='submit'>
                                Publish
                        </button>
                    </div>
                </div>

            </form>
        </div>
      </div>
  )
}

export default EditCoProfile