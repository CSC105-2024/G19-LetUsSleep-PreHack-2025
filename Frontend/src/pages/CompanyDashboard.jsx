import React from 'react'
import JobPostCard from '../components/JobPostCard'
import JobApplicantLists from '../components/JobApplicantLists'
import { Link } from 'react-scroll';

function CompanyDashboard() {
  return (
    <div className='pt-[80px] px-[30px]
    sm:pt-[102px]  sm:px-[80px] bg-lgray'>
      <div className='flex gap-[20px] sm:gap-[60px] pb-2'>
        <Link to="section1" smooth={true} duration={500} offset={-80} className="hover:underline underline-offset-4 cursor-pointer text-black">
          company profile
        </Link>
        <Link to="section2" smooth={true} duration={500} offset={-80} className="hover:underline underline-offset-4 cursor-pointer text-black">
          Job Posts
        </Link>
        {/* <a href="">view Applicants</a> */}
      </div>

      <div className='flex flex-col gap-[50px] sm:gap-[100px]' >
          {/* profile */}
          <div 
            id="section1"
            className='flex flex-col sm:flex-row items-start p-4 justify-start sm:items-center gap-5 self-stretch rounded-2xl'
            style={{background: 'linear-gradient(270deg, #E60278 0%, #85124E 25%, #242124 59.62%)',}}>

            {/* pic */}
              <div className='w-[80px] h-[80px] p-2 bg-lgray rounded-2xl'>
                 <img src="" alt="" />
              </div>

            {/* Name + See more */}
            <div className=' w-[160px] h-[143px] flex flex-col justify-center text-white'>
              <div className='flex flex-row justify-start gap-2'>
                <h1 className='font-semibold'>Company Name</h1>
                {/* edit button */}
                <h2>edit</h2>
              </div>
              <div className=''>
                <p>See more &gt;</p>
              </div>  
            </div>

        </div>


        {/* Job Posts */}
        <div id="section2">
          <JobPostCard/>
        </div>

        {/* Job Applicant Lists */}
        <JobApplicantLists/>
      </div>
      
    </div>
  )
}

export default CompanyDashboard