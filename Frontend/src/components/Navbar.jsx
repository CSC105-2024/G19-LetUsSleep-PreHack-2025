import React, { useState } from 'react'
import { NavLink } from "react-router-dom";

const Navbar = (signin) => {
  const[menu,setmenu] = useState();
  const[showLogout,setshowLogout] = useState();
  const[login,setlogin] = useState(true);
  const[company,setcompany] = useState(false);

  const toggleAccount = () =>{
    if(!menu){
      setmenu(true);
    }
    if(menu){
      setmenu(false)
    }
  }

  const ConfirmLogout = () => {
      const confirm = prompt("Confirm LogOut?");
      if(confirm === null || confirm != null){
        //window.location.href = '/';
        setlogin(false)
        setmenu(false)
        
      }
  }

  return (
    <div className='flex flex-row gap-4 bg-black h-15 text-white'>
      <div className='hidden md:flex flex-row gap-4 bg-black h-15 text-white'>
        <NavLink to = '/' >
        <img src='public/icons/LOGO.png'
        className='h-13 w-20 object-cover m-1 ml-3'
        /></NavLink>
        { !company && login ? (
        <NavLink
          to="/SearchJob"
          className={({ isActive }) =>
          isActive ? "text-dpink my-auto " :
          "hover:text-dpink duration-300 my-auto"
        }
        >
          Find job
        </NavLink>) : (<></>)
        }

        { !login ? (
        <NavLink
          to="/SearchJob"
          className={({ isActive }) =>
          isActive ? "text-dpink my-auto" :
          "hover:text-dpink duration-300 my-auto"
        }
        >
          Find job
        </NavLink>) : (<></>)
        }

        { company && login ? (
        <NavLink
          to="/CDashboard"
          className={({ isActive }) =>
          isActive ? "text-dpink my-auto" :
          "hover:text-dpink duration-300 my-auto"
        }
        >
          Create post
        </NavLink>) : (<></>)
        }

        { !login ? (
        <NavLink
          to="/login"
          className={({ isActive }) =>
          isActive ? "text-dpink my-auto" :
          "hover:text-dpink duration-300 my-auto"
        }
        >
          Create post
        </NavLink>) : (<></>)
        }

        { !company && login ? (
        <NavLink
          to='/'
          className={({ isActive }) =>
          isActive ? "text-dpink my-auto" :
          "hover:text-dpink duration-300 my-auto"
        }
        >
        <div className='text-center text-xs'>Recommand</div>
        <div className='text-center text-xs'>company</div>
        </NavLink>) : (<></>)
        }

        { !login ? (
        <NavLink
          to='/'
          className={({ isActive }) =>
          isActive ? "text-dpink py-3" :
          "hover:text-dpink duration-300 py-3"
        }
        >
        <div className='text-center text-xs'>Recommand</div>
        <div className='text-center text-xs'>company</div>
        </NavLink>) : (<></>)
        }
      </div>

      <div className='md:hidden  flex flex-row gap-4 bg-black h-15 text-white'>
        <NavLink to='/'>
        <img src='public/icons/LOGO.png'
        className='h-10 mt-2.5 object-cover ml-2'
        /></NavLink>
        { !company && login ? (
        <NavLink
          to="/SearchJob"
          className={({ isActive }) =>
          isActive ? "text-dpink my-auto " :
          "hover:text-dpink duration-300 my-auto"
        }
        >
          <img src='public/icons/SEARCHICON.png'
          className='h-10 w-10 object-cover'
          />
        </NavLink>) : (<></>)
        }

        { !login ? (
        <NavLink
          to="/SearchJob"
          className={({ isActive }) =>
          isActive ? "text-dpink my-auto" :
          "hover:text-dpink duration-300 my-auto"
        }
        >
          <img src='public/icons/SEARCHICON.png'
          className='h-10 w-10 object-cover'
          />
        </NavLink>) : (<></>)
        }

        { company && login ? (
        <NavLink
          to="/CDashboard"
          className={({ isActive }) =>
          isActive ? "text-dpink my-auto" :
          "hover:text-dpink duration-300 my-auto"
        }
        >
          <img src='public/icons/CREATEICON.png'
          className='h-10 w-10 object-cover'
          />
        </NavLink>) : (<></>)
        }

        { !login ? (
        <NavLink
          to="/login"
          className={({ isActive }) =>
          isActive ? "text-dpink my-auto" :
          "hover:text-dpink duration-300 my-auto"
        }
        >
          <img src='public/icons/CREATEICON.png'
          className='h-10 w-10 object-cover'
          />
        </NavLink>) : (<></>)
        }
        { !company && login ? (
        <NavLink
          to='/'
          className={({ isActive }) =>
          isActive ? "text-dpink my-auto " :
          "hover:text-dpink duration-300 my-auto"
        }
        >
          <img src='public/icons/RECOM.png'
          className='h-10 w-10 object-cover'
          />
        </NavLink>) : (<></>)
        }

        { !login ? (
        <NavLink
          to='/'
          className={({ isActive }) =>
          isActive ? "text-dpink my-auto" :
          "hover:text-dpink duration-300 my-auto"
        }
        >
          <img src='public/icons/RECOM.png'
          className='h-10 w-10 object-cover'
          />
        </NavLink>) : (<></>)
        }
        
      </div>

      <div className='ml-auto mr-2'>
        {/*account manage*/}
        
        {!login ? (<div className='flex flex-row gap-2'>
          <NavLink
          to='/login'
          className="text-xs md:text-lg my-1 border-1 rounded-lg h-13 px-2 py-4 md:py-3 "
          >
            LOGIN
          </NavLink>
          <NavLink
          to='/register'
          className="text-xs md:text-lg my-1 border-1 rounded-lg h-13 px-2 py-4 md:py-3"
          >
            REGISTER
          </NavLink>
        </div>) 
        : (<button className='flex flex-col'
        onClick={toggleAccount}>
        <div className= 'flex flex-row mt-1 border-1'
        >
        <img 
        src='public\logo(for test).jpg'
        className='h-10 w-12 object-cover rounded-full m-1'/>
        <button className=' my-auto truncate w-25 md:w-50 mx-2'
        >name1234535647325</button>
        </div>
        
        </button>
        )
        }
        {menu ? ( 
          <div className= 'flex flex-col bg-black w-auto border-1 '>
            {!company ? (<NavLink
          to='/UserDetail'
          className=" border-1 py-2 px-3"
          >
            Manage Profile
          </NavLink>):
          (<NavLink
          to='/CDashboard'
          className="border-1 py-2 px-3"
          >
            Manage Profile
          </NavLink>)}
          <div
          
          className="border-1 border-white py-2 px-3 text-dpink"
          >
          <button onClick={ConfirmLogout}>Logout</button>
          </div>
          </div>):
          (<></>)}
      </div>
      
    </div>
  )
}

export default Navbar
