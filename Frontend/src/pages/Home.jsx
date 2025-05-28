import React, { useEffect, useState } from 'react'
import { NavLink, useParams , useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const Home = () => {
  const[login,setlogin] = useState();
  const[company,setcompany] = useState();

  const navigate = useNavigate();
  
  
  const fetchData = (bruh) =>{
    setlogin(bruh)
    setcompany(false)
  };

  useEffect(() => {
        fetchData(true);
      }, []);
  
  const recom = [
    {
      id: 1,
      name: "Tesla",
      image:"public\logo(for test).jpg",
      Industy:"Industy a rai",
    },
    {
      id: 2,
      name: "Betagro",
      image:"public\logo(for test).jpg",
      Industy:"Industy a rai",
    },
    {
      id: 3,
      name: "Big C",
      image:"public\logo(for test).jpg",
      Industy:"Industy a rai",
    },
    {
      id: 4,
      name: "PTT OR",
      image:"public\logo(for test).jpg",
      Industy:"Industy a rai",
    },
  ]

  const FindJobbox = () => {
    return(
    <div>
      <div className='md:text-xl text-xs mt-5 mb-3 mx-2 md:mx-auto py-2 px-5
      border-1 rounded-lg max-w-200'>Create your profile so we can recommend the best.</div>
      <div className='flex flex-row md:text-xl bg-gradient-to-r from-pink-300 to-pink-100
        text-xs mt-5 mb-3 mx-2 md:mx-auto border-1 rounded-lg max-w-200 justify-between'>
        <div className='flex flex-col m-2 my-auto mx-auto '>
          <div className='font-extrabold text-sm md:text-2xl' >Find your dream job!</div>
          <div className='w-55 md:w-90' >Start your job search with one click.</div>
          <button 
          className='bg-dpink py-2 mt-1 font-extrabold text-white rounded-lg hover:bg-pink-700 duration-300'>
            <NavLink
            to={`/SearchJob`}
            className=""
            >
              Find Job!
            </NavLink>
          </button>
        </div>
        <div> 
        <div className=''>
          <img
          src='public\logo(for test).jpg'
          className='max-w-30 sm:max-w-screen h-auto min-h-25 max-h-50 object-cover opacity-75'
          />
          </div>
        </div>
      </div>
    </div>
    )
  }

  const Companybox = () => {
    return(
   <div><div>
    
      <div className='flex flex-row md:text-xl bg-gradient-to-r from-black to-purple-800
      text-xs mt-5 mb-3 mx-2 md:mx-auto border-1 rounded-lg max-w-200 justify-between text-white'>
      <div className='flex flex-col m-2 my-auto mx-auto '>
        <div className='font-extrabold text-sm md:text-lg w-55' >Find the right co-worker!</div>
        <div className='w-55 md:w-90' >Start creating a job posting to find the right person by clicking here.</div>
        <button 
        className='bg-purple-700 py-2 mt-1 font-extrabold text-white rounded-lg hover:bg-purple-800 duration-300'>
          <button
          
          className=""
          >
            Create post!
          </button>
        </button>
      </div>
      <div> 
      <div className=''>
        <img
        src='public\logo(for test).jpg'
        className='max-w-30 sm:max-w-screen h-auto min-h-25 max-h-50 object-cover opacity-75'
        />
        </div>
      </div>
    </div>
    </div> </div>
    )
  }

  const Recom = () => {
    return(
   <div>
        <div className='font-bold ml-5 md:ml-7'>Recommand Company</div>
        <div className='flex flex-row  mt-2 max-w-screen overflow-x-scroll'>
        {recom.map((com) => (
          <ul key={com.id}>
            <div className='mx-3 mb-3 md:mx-7 border-1 w-50 h-35 md:w-100 md:h-70 rounded-lg bg-white'>
              <img 
              src="public\logo(for test).jpg"
              className='h-15 w-25 md:h-30 md:w-50 m-3 rounded-lg'
              />
              <div className='ml-3 font-extrabold md:text-3xl'>{com.name}</div>
              <div className='ml-3 text-xs md:text-lg'>{com.Industy}</div>
            </div>
          </ul>
        ))}
        </div>
      </div>
    )
  }



 

  return (
    <div className='bg-gradient-to-t from-pink-300 to-white'>
    
    { !login  ? (
    <div>
      <NavLink to="/SearchJob">
      <FindJobbox></FindJobbox></NavLink>
      <NavLink to="/login">
      <Companybox></Companybox></NavLink>
      <Recom></Recom>
    </div>
    ):(<>
    {company ?(<div>
      <div className='md:text-xl text-xs mt-7 mb-3 mx-2 md:mx-auto py-2 px-5
      border-1 rounded-lg max-w-200'>Manage your profile so you can find right co-worker.</div>
        <NavLink to="/CDashboard">
      <Companybox></Companybox></NavLink>
      <Recom></Recom>
      </div>
      ):
      (<div><NavLink to="/SearchJob">
      <FindJobbox></FindJobbox></NavLink>
      <Recom></Recom></div>
    )}
      </>)}

      
    

      

    <footer className='bg-black p-2'>
      <img src='public/icons/LOGO.png'
      className='m-5 w-20 '/>
      <div className='font-bold text-white ml-5 text-xl' >About Website</div>
      <div className=' text-white mx-5 text-sm w-auto my-3' >User-friendly platform designed to connect job seekers with employers quickly and efficiently. Whether you're looking for your next career move or searching for the right person to join your team, HireME makes the process simple and effective.</div>
      <div className='font-bold text-white ml-5 text-xl' >Contact us</div>
      <div className='flex flex-row my-5'>
       <img src='public\logo(for test).jpg'
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

    
  )
}

export default Home
