import React from 'react'
import FilterBar from '../components/FilterBar'
import { useState } from 'react';
import { NavLink } from "react-router-dom";

function SearchJob() {
  const[openBar,setopenBar] = useState(false);

  const toggleFilter = () =>{
    if(!openBar){
      setopenBar(true);
    }
    if(openBar){
      setopenBar(false)
    }
  }

  const Jobtest = [
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
    },
    {
      id:2,       
      title:"Marketing Data",
      Desciption:"-",
      Responbility:"Customer business development :- Responsible for achieving sales goals and executing sales plans with a defined area. Includes sales management, account management and merchandising force Customer/ Trade Marketing :- Evaluate customer - investment plan with trade marketing.Sales Operation :- Improve order to cash to determine the most efficiency and customer satisfaction by collaborate with sales operation / sales enable / Supply Chain & Financiance .",
      Qualification:"Bachelor's degree (Business Administration/ Marketing/ Economics/ Management or other related fields) Experience in sales or good communication skills, emphasizing presentation skills and having good interpersonal skills, loving service work Able to drive a car and have a driver's license",
      Benenfit:"-",
      workingHours:"-",
      JobType:"Full-time",
      minSalary:40000,
      maxSalary:60000,
    },
    {
      id:3,       
      title:"Marketing Data Intelligence",
      Desciption:"-",
      Responbility:"Customer business development :- Responsible for achieving sales goals and executing sales plans with a defined area. Includes sales management, account management and merchandising force Customer/ Trade Marketing :- Evaluate customer - investment plan with trade marketing.Sales Operation :- Improve order to cash to determine the most efficiency and customer satisfaction by collaborate with sales operation / sales enable / Supply Chain & Financiance .",
      Qualification:"Bachelor's degree (Business Administration/ Marketing/ Economics/ Management or other related fields) Experience in sales or good communication skills, emphasizing presentation skills and having good interpersonal skills, loving service work Able to drive a car and have a driver's license",
      Benenfit:"-",
      workingHours:"-",
      JobType:"Full-time",
      minSalary:40000,
      maxSalary:60000,
    },
    {
      id:4,       
      title:"Marketing Data Intelligence",
      Desciption:"-",
      Responbility:"Customer business development :- Responsible for achieving sales goals and executing sales plans with a defined area. Includes sales management, account management and merchandising force Customer/ Trade Marketing :- Evaluate customer - investment plan with trade marketing.Sales Operation :- Improve order to cash to determine the most efficiency and customer satisfaction by collaborate with sales operation / sales enable / Supply Chain & Financiance .",
      Qualification:"Bachelor's degree (Business Administration/ Marketing/ Economics/ Management or other related fields) Experience in sales or good communication skills, emphasizing presentation skills and having good interpersonal skills, loving service work Able to drive a car and have a driver's license",
      Benenfit:"-",
      workingHours:"-",
      JobType:"Full-time",
      minSalary:40000,
      maxSalary:60000,
    },
    {
      id:5,       
      title:"Marketing Data Intelligence",
      Desciption:"-",
      Responbility:"Customer business development :- Responsible for achieving sales goals and executing sales plans with a defined area. Includes sales management, account management and merchandising force Customer/ Trade Marketing :- Evaluate customer - investment plan with trade marketing.Sales Operation :- Improve order to cash to determine the most efficiency and customer satisfaction by collaborate with sales operation / sales enable / Supply Chain & Financiance .",
      Qualification:"Bachelor's degree (Business Administration/ Marketing/ Economics/ Management or other related fields) Experience in sales or good communication skills, emphasizing presentation skills and having good interpersonal skills, loving service work Able to drive a car and have a driver's license",
      Benenfit:"-",
      workingHours:"-",
      JobType:"Full-time",
      minSalary:40000,
      maxSalary:60000,
    },
    {
      id:6,       
      title:"Marketing Data Intelligence",
      Desciption:"-",
      Responbility:"Customer business development :- Responsible for achieving sales goals and executing sales plans with a defined area. Includes sales management, account management and merchandising force Customer/ Trade Marketing :- Evaluate customer - investment plan with trade marketing.Sales Operation :- Improve order to cash to determine the most efficiency and customer satisfaction by collaborate with sales operation / sales enable / Supply Chain & Financiance .",
      Qualification:"Bachelor's degree (Business Administration/ Marketing/ Economics/ Management or other related fields) Experience in sales or good communication skills, emphasizing presentation skills and having good interpersonal skills, loving service work Able to drive a car and have a driver's license",
      Benenfit:"-",
      workingHours:"-",
      JobType:"Full-time",
      minSalary:40000,
      maxSalary:60000,
    },
    {
      id:7,       
      title:"Marketing Data Intelligence",
      Desciption:"-",
      Responbility:"Customer business development :- Responsible for achieving sales goals and executing sales plans with a defined area. Includes sales management, account management and merchandising force Customer/ Trade Marketing :- Evaluate customer - investment plan with trade marketing.Sales Operation :- Improve order to cash to determine the most efficiency and customer satisfaction by collaborate with sales operation / sales enable / Supply Chain & Financiance .",
      Qualification:"Bachelor's degree (Business Administration/ Marketing/ Economics/ Management or other related fields) Experience in sales or good communication skills, emphasizing presentation skills and having good interpersonal skills, loving service work Able to drive a car and have a driver's license",
      Benenfit:"-",
      workingHours:"-",
      JobType:"Full-time",
      minSalary:40000,
      maxSalary:60000,
    },
    {
      id:8,       
      title:"Marketing Data Intelligence",
      Desciption:"-",
      Responbility:"Customer business development :- Responsible for achieving sales goals and executing sales plans with a defined area. Includes sales management, account management and merchandising force Customer/ Trade Marketing :- Evaluate customer - investment plan with trade marketing.Sales Operation :- Improve order to cash to determine the most efficiency and customer satisfaction by collaborate with sales operation / sales enable / Supply Chain & Financiance .",
      Qualification:"Bachelor's degree (Business Administration/ Marketing/ Economics/ Management or other related fields) Experience in sales or good communication skills, emphasizing presentation skills and having good interpersonal skills, loving service work Able to drive a car and have a driver's license",
      Benenfit:"-",
      workingHours:"-",
      JobType:"Full-time",
      minSalary:40000,
      maxSalary:60000,
    },
  ]

  return (
    <div>
      <div className=' bg-gradient-to-b from-black to-pink-800 py-5'>
        <div className='text-white w-screen max-w-200 mx-5 lg:mx-auto font-extrabold  my-3'>Find JOB by search and Filter</div>
        <form to="/SearchJob" className=' flex flex-col sm:flex-row   w-screen max-w-200 mx-5 lg:mx-auto'>
        <div className='flex flex-row'>
          <input 
          type="text"
          placeholder='Search Name'
          className='bg-white w-screen max-w-70 py-3 px-5 outline-0 border-1'></input>
          <div className='h-12.5 w-12.5 mr-5 bg-dpink border-1 sm:hidden'></div>
          </div>
          <div className='flex flex-row'>
          <input 
          type="text"
          placeholder='Add Location'
          className='bg-white w-screen max-w-70 py-3 px-5 outline-0 border-1'></input>
          <button className='h-12.5 w-12.5 mr-5 bg-dpink border-1
          duration-500 hover:bg-pink-500'>O-</button>
          </div>
        </form>
      </div>

      <></>
      <div className='flex flex-row justify-center'>
        
        {openBar ? (
          <div className='fixed left-0 top-0'> 
          <div className='flex flex-row h-screen'>
            <FilterBar/>
            <div 
            onClick={toggleFilter}
            className='w-screen bg-black opacity-60'>
              
            </div>
          </div>
          </div>):(<></>)}
        <div>
          <button className=' mx-5 px-5 py-2 mt-5 rounded-lg text-white font-bold hover:bg-pink-500 duration-300 bg-dpink'
          onClick={toggleFilter}>Open filter Bar</button>
          <div className='ml-7 mt-3 text-xl font-bold'>Search result...</div>
        <div className='grid grid-cols-1 lg:grid-cols-2 ml-2 overflow-y-scroll w-screen max-w-120 lg:max-w-200 bg-gradient-t from-gray-300 to-white h-screen' >
          
           {Jobtest.map((com) => (
          <ul key={com.id}>
            <div className='shadow bg-white mx-3 mt-3 p-2 max-h-100 rounded-lg '>
              <img 
              src="public\logo(for test).jpg"
              className='h-15 w-25  m-3 rounded-lg'
              />
              <div className='ml-3 font-extrabold md:text-2xl'>{com.title}</div>
              <div className='ml-3 text-xs md:text-lg'>{com.JobType}</div>
              <div className='ml-3 text-xs md:text-lg'>Rama2 Bangkok</div>
              <div className='ml-3 text-xs md:text-lg font-bold'>{com.minSalary} - {com.maxSalary} Bath per month</div>
              <div className='ml-3 text-xs md:text-lg'>{com.Desciption}</div>
              <NavLink to= {`/SearchJob/JobDetails/${com.id}`} >
                <button className='mx-3 mb-2 py-2 px-10 bg-dpink text-white rounded-lg font-extrabold hover:bg-pink-700 duration-300'>View detail</button>
              </NavLink>
            </div>
          </ul>
        ))}
        </div>
      </div>
      </div>
    </div>
  )
}

export default SearchJob
