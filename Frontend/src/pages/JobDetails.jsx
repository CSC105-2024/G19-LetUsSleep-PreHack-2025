import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

function JobDetails() {

  const { id } = useParams();

  const Jobtest = 
    {
      id:1,       
      title:"Marketing Data Intelligence",
      Desciption:"-",
      Responbility:"Customer business development :- Responsible for achieving sales goals and executing sales plans with a defined area. Includes sales management, account management and merchandising force Customer/ Trade Marketing :- Evaluate customer - investment plan with trade marketing.Sales Operation :- Improve order to cash to determine the most efficiency and customer satisfaction by collaborate with sales operation / sales enable / Supply Chain & Financiance .",
      Qualification:"Bachelor's degree (Business Administration/ Marketing/ Economics/ Management or other related fields) Experience in sales or good communication skills, emphasizing presentation skills and having good interpersonal skills, loving service work Able to drive a car and have a driver's license",
      Benenfit:"-",
      workingHours:"-",
      JobType:"Full-time",
      minSalary:40000,
      maxSalary:60000,
    }

  return (
    <div className=''>
      <div className=' bg-gradient-to-r from-black to-pink-800 h-35 md:h-50'>
        <div className='text-white font-extrabold ml-10 pt-10 md:pt-15 text-xl md:text-4xl underline w-screen lg:w-200 lg:mx-auto'>{Jobtest.title}</div>
        <div className='text-white mt-1 ml-10 text-lg md:text-2xl w-screen lg:w-200 lg:mx-auto'>Betagro</div>
      </div>

      <div className='flex flex-col bg-gradient-to-t from-gray-200 to-white'>
          <div className='w-screen lg:w-200 px-10 pt-10 mx-auto text-xs'>
            <div className=''>Rama 2 - Bangkok</div>
            <div className=''>{Jobtest.workingHours}</div>
            <div className=''>{Jobtest.JobType}</div>
            <div className=''>{Jobtest.minSalary} - {Jobtest.maxSalary} Bath per month</div>
          </div> 
          <div className='w-screen lg:w-200 px-10 pt-2 mx-auto'>
            <div className='text-xl font-bold text-dpink'>Job Desciption</div>
            <div className='my-2 mx-3 text-sm '>{Jobtest.Desciption}</div>
          </div> 
          <div className='w-screen lg:w-200 px-10 pt-2 mx-auto'>
            <div className='text-xl font-bold text-dpink'>Job Responbilities</div>
            <div className='my-2 mx-3 text-sm'>{Jobtest.Responbility}</div>
          </div>
          <div className='w-screen lg:w-200 px-10 pt-2 mx-auto'>
            <div className='text-xl font-bold text-dpink'>Job Qualifications</div>
            <div className='my-2 mx-3 text-sm'>{Jobtest.Qualification}</div>

            <div className=' mt-10'> 
            <div className=' pt-2 bg-black p-2 rounded-lg flex flex-row w-90 h-30 shadow' >
              <img src='/public/icons/LOGO.png'
              className='w-40 h-20 rounded-lg my-auto '/>
              <div className='text-white w-30 my-auto ml-2 mr-5'>
                <div className='font-bold'>Betagro</div>
                <div className='text-xs'>Farming, Animals & Conservation</div>
                <button className='w-30 text-xs py-2 mt-1 rounded-lg bg-dpink font-extrabold hover:bg-pink-700 duration-300'>View Company</button>
              </div>
            </div>
           </div> 
           <button 
           className='bg-dpink text-white px-15 py-3 my-5 rounded-lg
            hover:bg-pink-500 duration-300 shadow'>Apply Job</button>
          </div>
          <footer className='bg-black p-2'>
      <img src='public/icons/LOGO.png'
      className='m-5 w-20 '/>
      <div className='font-bold text-white ml-5 text-xl' >About Website</div>
      <div className=' text-white mx-5 text-sm w-auto my-3' >User-friendly platform designed to connect job seekers with employers quickly and efficiently. Whether you're looking for your next career move or searching for the right person to join your team, HireME makes the process simple and effective.</div>
      <div className='font-bold text-white ml-5 text-xl' >Contact us</div>
      <div className='flex flex-row my-5'>
       <img src='public/logo(for test).jpg'
       className='mx-5 h-10 w-10 object-cover'/> 
       <img src='public\logo(for test).jpg'
       className='mx-5 h-10 w-10 object-cover'/>
       <img src='public\logo(for test).jpg'
       className='mx-5 h-10 w-10 object-cover'/>
       <img src='public\logo(for test).jpg'
       className='mx-5 h-10 w-10 object-cover'/>
       
      </div>
      <div className='flex flex-col mx-5 my-3 '>
        <div className='font-bold text-white'>Tel : 02-XXX-XXXX</div>
        <div className='font-bold text-white'>HIRE.me@hotmail.com</div>
       </div>
       <div className=' bg-black'></div>
    </footer>

          
      </div>

      
    </div>
  )
}

export default JobDetails
