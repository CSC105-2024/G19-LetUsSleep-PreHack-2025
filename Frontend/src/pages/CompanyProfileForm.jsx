import React from 'react'

function CompanyProfileForm() {
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
                            name="Company Name"
                            placeholder="e.g., MACloudTech" 
                            class='custom-input overflow-hidden'
                            required
                        />
                    </div>

                    {/* Company Overview */}
                    <div className='flex flex-col pb-[32px]'>
                        <label className='mb-[9px]'>Company Overview</label>
                        <textarea  
                            type="text" 
                            name="Company Overview"
                            placeholder="Briefly describe your company’s background and goals" 
                            class='custom-input'
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
                                  name="Industry"
                                  id="Industry"
                                  className="p-2 border border-gray-300 w-full rounded-2xl bg-white"
                              >
                                  <option value="">Select Industry</option>
                                  <option>Information Technology</option>
                                  <option>Finance / Banking</option>
                                  <option>Healthcare / Medical</option>
                                  <option>Education</option>
                                  <option>Manufacturing</option>
                                  <option>Retail / E-commerce</option>
                                  <option>Hospitality / Travel</option>
                                  <option>Construction / Real Estate</option>
                                  <option>Marketing / Advertising</option>
                                  <option>Telecommunications</option>
                                  <option>Energy / Utilities</option>
                                  <option>Logistics / Supply Chain</option>
                                  <option>Legal / Consulting</option>
                                  <option>Media / Entertainment</option>
                                  <option>Government / NGO</option>
                              </select>
                            </div>
                        </div>

                        {/* size */}
                        <div className="w-1/2 relative">
                          <label className="mb-[9px]">Company Size</label>
                          <div className="absolute top-full w-full z-10 ">
                              <select
                                  name="Company Size"
                                  id="Company Size"
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
                                name="Year Established"
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
                            name="Social Media"
                            placeholder="e.g. @pttorofficial / www.facebook.com/pttor" 
                            class='custom-input'
                            rows="5"
                            
                        />
                    </div>

                    {/* Working Hours * */}
                    <div className='flex flex-col pb-[32px]'>
                        <label className='mb-[9px]'>Working Hours *</label>
                        <input 
                            type="text" 
                            name="Working Hours *"
                            placeholder="e.g. Monday – Friday, 9:00 AM – 5:30 PM" 
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
                            name="Phone Contact"
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
                            name="Website"
                            placeholder="e.g. www.MACloudTech.io" 
                            class='custom-input'
                            rows={2}
                        />
                    </div>

                    {/* Button */}
                    <div className='flex justify-end pt-[153px] gap-2 '>
                      <button className="custom-btn btn-dpink" type='submit'>Save</button>
                      <button className="custom-btn btn-black" type='submit'>Publish</button>
                    </div>
                </div>

            </form>
        </div>
      </div>
  )
}

export default CompanyProfileForm

{/* <option value="">Information Technology</option>
                                  <option value="">Finance / Banking / Insurance</option>
                                  <option value="">Healthcare / Medical</option>
                                  <option value="">Education / Training</option>
                                  <option value="">Manufacturing / Industrial</option>
                                  <option value="">Retail / Wholesale / E-commerce</option>
                                  <option value="">Hospitality / Travel / Leisure</option>
                                  <option value="">Construction / Real Estate</option>
                                  <option value="">Marketing / Advertising / PR</option>
                                  <option value="">Telecommunications</option>
                                  <option value="">Energy / Utilities</option>
                                  <option value="">Transportation / Logistics / Supply Chain</option>
                                  <option value="">Legal / Consulting / Professional Services</option>
                                  <option value="">Media / Publishing / Entertainment</option>
                                  <option value="">Government / Public Sector / NGO</option> */}