import React, { useState, useEffect} from 'react'
import {LiaUserCircleSolid} from 'react-icons/lia'
import { Link } from 'react-router-dom'
import {HiMiniBars3BottomRight} from 'react-icons/hi2'
import {LiaTimesSolid} from 'react-icons/lia'
import {LuHome} from 'react-icons/lu'



export const NavBar = () => {
  const [isActive, setIsActive] = useState(false)
  const [mobile , setMobile] = useState(false)

    useEffect( () => {
      window.addEventListener('scroll', () => {
          window.scrollY > 60 ? setIsActive(true) : setIsActive(false)
      });
    })

    useEffect(()=>{
      const body = document.querySelector('body');
      body.style.overflow = mobile? 'hidden' : 'auto';
    }, [mobile]);


  return (
    <div className={`${isActive ? 'sticky top-0 bg-stone-100 z-10' : null} flex justify-between items-center h-20 px-5 bg-yellow-300 shadow-inner text-stone-500 `}>
        <div className='font-bold text-xl'>Simple Store</div>
        <div className={`h-1/2 w-96 hidden lg:flex top-0 `}>
          <input type="search" name="search" id="" placeholder='type your search...' className=' bg-stone-100 w-full h-full px-2 rounded outline-none transition-all duration-1000' />
        </div>
        <div className='md:flex items-center hidden'>
            <Link to={`/createproduct`}>
                <button className='p-2 mx-2 bg-green-200 font-bold rounded text-stone-500'>Add New Product</button>
            </Link>
            <Link to='/signin' className='flex items-center ml-5'>
                Login 
                <LiaUserCircleSolid className='mt-1'/>
            </Link>
        </div>
        {/*mobile view */}
        <div className='flex flex-cols md:hidden '>
            <span onClick={()=> setMobile(!mobile)} className='duration-300 transition-all relative z-40 '>
                {mobile? <LiaTimesSolid size={30} className='bg-stone-200 rounded-full p-2'/> : <HiMiniBars3BottomRight size={30} />}
            </span>
            {/* mobile DropDown */}
            {
              mobile? (
                  <div className=''>
                      <div onClick={()=> setMobile(!mobile)} className='bg-black/60 fixed w-full h-full left-0 right-0 top-0 z-20'></div>
                      <div data-aos='fade-left' className=' duration-300 ease-in transition-all delay-150 z-[999] absolute sm:right-8 right-4  top-24 md:top-32  sm:w-1/2 w-4/5 py-2 px-5 mt-2 rounded-lg shadow-xl bg-stone-50'>
                          <div  className={`flex flex-col justify-evenly h-40 `}>
                              <Link to={`/createproduct`} onClick={()=> setMobile(!mobile)}>
                                  <button className='p-2 bg-green-200 font-bold rounded text-stone-500'>Add New Product</button>
                              </Link>
                              <Link to='/signin' onClick={()=> setMobile(!mobile)} className='flex items-center'>
                                  Login 
                                  <LiaUserCircleSolid className='mt-1'/>
                              </Link>
                              <Link to={`/`} onClick={()=> setMobile(!mobile)} className='flex items-center'>
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
