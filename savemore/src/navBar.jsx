import React, { useState, useEffect} from 'react'
import {LiaUserCircleSolid} from 'react-icons/lia'
import { Link } from 'react-router-dom'

export const NavBar = () => {
  const [isActive, setIsActive] = useState(false)

    useEffect( () => {
      window.addEventListener('scroll', () => {
          window.scrollY > 60 ? setIsActive(true) : setIsActive(false)
      });
    })
  return (
    <div className={`${isActive ? 'sticky top-0 bg-stone-100 z-10' : null} flex justify-between items-center h-20 px-5 bg-yellow-300 shadow-inner text-stone-500 `}>
        <div className='font-bold'>Admin name</div>
        <div className={`h-1/2 w-96 hidden lg:flex top-0 `}>
          <input type="search" name="search" id="" placeholder='type your search...' className=' bg-stone-100 w-full h-full px-2 rounded outline-none transition-all duration-1000' />
        </div>
        <div className='flex items-center '>
            <Link to={`/createproduct`}>
                <button className='p-2 mx-2 bg-green-200 font-bold rounded text-stone-500'>Add New Product</button>
            </Link>
            <Link to='/signin' className='flex items-center ml-5'>
                Login 
                <LiaUserCircleSolid className='mt-1'/>
            </Link>
        </div>
    </div>
  )
}
