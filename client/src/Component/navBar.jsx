import React, { useState, useEffect} from 'react'
import {LiaUserCircleSolid} from 'react-icons/lia'
import { Link, useNavigate } from 'react-router-dom'
import {HiMiniBars3BottomRight} from 'react-icons/hi2'
import {LiaTimesSolid} from 'react-icons/lia'
import {LuHome, LuLayoutDashboard} from 'react-icons/lu'
import logo from '../assets/images/logo.png'
import { useSelector } from 'react-redux'
import {BsCart4} from 'react-icons/bs'


export const NavBar = () => {
  const [isActive, setIsActive] = useState(false)
  const [mobile , setMobile] = useState(false)
  const {currentUser} = useSelector((state) => state.user)
  const navigate = useNavigate()

  
    useEffect( () => {
      window.addEventListener('scroll', () => {
          window.scrollY > 60 ? setIsActive(true) : setIsActive(false)
      });
    })

    useEffect(()=>{
      const body = document.querySelector('body');
      body.style.overflow = mobile? 'hidden' : 'auto';
    }, [mobile]);

  const handleClick = () => {
    currentUser? 
      navigate('/signup')
      : 
      navigate('/signin')
  }

  return (
    <div className={`${isActive ? 'sticky top-0 bg-green-500 z-10' : 'bg-[#22C55E bg-white '}  flex justify-between items-center h-20 px-5  shadow-inner text-stone-800 `}>
        <Link to='/' className=''>
          <img onClick={()=> location.reload()} src={logo} alt="image" className='w-28 h-20 object-contain cursor-pointer' />
        </Link >
        <div className={`h-1/2 w-96 hidden lg:flex top-0 `}>
          <input type="search" name="search" id="" placeholder='Type your search...' className=' bg-stone-100 w-full h-full px-2 rounded outline-none transition-all duration-1000' />
        </div>
        <div className='md:flex items-center hidden'>
            <div>
              {
                currentUser ?
              <div className='relative cursor-pointer'>
                <BsCart4 size={30}/>
                <p className='absolute -top-3 -right-2 '>
                  <span className=' bg-red-500 text-white rounded-full p-[0.18rem]'><span>20</span></span>
                </p>
              </div>
              :
              <Link to={`/createproduct`}>
                <button className='p-2 mx-2 bg-[#0D333f] font-bold rounded text-white shadow '>Add New Product</button>
              </Link>
              }
            </div>
            <div onClick={handleClick} className={`flex items-center ml-5 font-bold text-stone-800 cursor-pointer ${isActive && 'text-white font-bold'}`}>
              { currentUser ? ( 
                <div className='flex items-center'>
                  <p className='pr-1'>Logout</p>
                  <img src={currentUser.profilePicture} 
                  alt="profileImage" className="w-7 h-7 rounded-full object-cover" /> 
                </div>
                ) 
                :
                <p>Account</p>
              }
            </div>
        </div>
        {/*mobile view */}
        <div className='flex flex-cols md:hidden '>
            <div className='mx-5'>
              {
                currentUser &&
                  <div className='relative cursor-pointer'>
                    <BsCart4 size={30}/>
                    <p className='absolute -top-3 -right-2 '>
                      <span className=' bg-red-500 text-white rounded-full p-[0.18rem]'><span>20</span></span>
                    </p>
                  </div>
              }
            </div>
            <span onClick={()=> setMobile(!mobile)} className='duration-300 transition-all relative z-40 cursor-pointer '>
                {mobile? <LiaTimesSolid size={30} className='bg-stone-200 rounded-full p-2'/> : <HiMiniBars3BottomRight size={30} className={ `${isActive ? 'text-white': 'text-[#0D333f]'} `}/>}
            </span>
            {/* mobile DropDown */}
            {
              mobile? (
                  <div className=''>
                      <div onClick={()=> setMobile(!mobile)} className='bg-black/60 fixed w-full h-full left-0 right-0 top-0 z-20 backdrop-blur-md'></div>
                      <div data-aos='fade-left' data-aos-duration='1500' className=' duration-200 ease-in transition-all z-[999] absolute sm:right-8 right-4  top-24 md:top-32  sm:w-1/2 w-4/5 py-2 px-5 mt-2 rounded-lg shadow-xl bg-stone-50 shadow'>
                          <div  className={`flex flex-col justify-evenly h-40 `}>
                              <Link to={`/createproduct`} onClick={()=> setMobile(!mobile)}>
                                  <button
                                    className='p-2 bg-green-600 hover:opacity-80 transition-all font-bold rounded text-stone-50 shadow-lg'>
                                      Add New Product
                                  </button>
                              </Link>
                              <Link  to='/signin' onClick={()=> setMobile(!mobile)} className='flex items-center hover:text-green-600 text-[#0D333f] transition-all duration-300'>
                                  Login 
                                  <LiaUserCircleSolid className='mt-1'/>
                              </Link >
                              <Link  to='/adminpsignin' onClick={()=> setMobile(!mobile)} className='flex items-center hover:text-green-600 text-[#0D333f] transition-all duration-300'>
                                  Admin Page 
                                  <LuLayoutDashboard className='mt-1'/>
                              </Link >
                              <Link to={`/`} onClick={()=> setMobile(!mobile)} className='flex items-center hover:text-green-600 text-[#0D333f] transition-all duration-300 '>
                                Take me Home <LuHome/>
                              </Link>  
                          </div>
                      </div>
                  </div>
                  )
              :
              null
            }
        </div>
    </div>
  )
}
