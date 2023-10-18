import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {MdKeyboardDoubleArrowLeft} from 'react-icons/md'
import logo from '../assets/images/logo.png'
import AOS from "aos";

export const SignUp = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

        //refresh AOS
        useEffect(() => {
            AOS.init({
              duration: 2000
            })    
          },[])

    const signupUser = (e)=>{
     e.preventDefault()
    }


  return (
    <div className='flex  justify-center items-center max-h-screen h-full'>
        <div className='bg-stone-100 fixed top-0 right-0 left-0  h-full -z-10 blur'></div>
        <div className='md:w-1/2 sm:w-2/3 w-[90%] mx-1/2 '>
            <Link to= '/' className='flex justify-center items-center m-3 group'>
                <button 
                    className='p-3 border bg-white flex items-center justify-center font-semibold rounded-full group-hover:scale-110 ease-out duration-500'>
                    <MdKeyboardDoubleArrowLeft size={30}/>
                </button>
            </Link>
            <div  data-aos="fade-up" data-aos-duration='1500' className='bg-white rounded-xl w-full text-center shadow-xl border h-full'>
                <div className='m-5 relative flex justify-center'>
                    <img src={logo} alt="image" className='w-28 h-20 object-contain cursor-pointer' />
                </div>
                <h1 className='font-bold text-xl p-3 text-cente'>Sign up! as Admin</h1>
                <h4 className='sign text-lg p-2 text-center'>Get access to admins  content.</h4>
                <div className='mx-5'>
                    <form onSubmit={signupUser} >
                        <div className='p-2'>
                            <input type="text" value={data.name} onChange={(e)=> setData({...data, name: e.target.value})} className='w-full border p-3 rounded-full outline-none' autoFocus placeholder='Enter your name' />
                        </div>
                        <div className='p-2'>
                            <input type="email" value={data.email} onChange={(e)=> setData({...data, email: e.target.value})} className='w-full border p-3 px-3 rounded-full outline-none' placeholder=' Enter email address' />
                        </div>
                        <div className='p-2'>
                            <input type="password" value={data.password} onChange={(e)=> setData({...data, password: e.target.value})}  className='w-full border p-3 px-3 rounded-full outline-none' placeholder='create a password' />
                        </div>
                        <div className='p-3 flex justify-center  '>
                            <button type="submit" value='submit' className='submit w-full p-3 font-semibold rounded-full hover:scale-95 transition-all ease-out duration-500 bg-green-500 text-stone-100 '>Sign up</button>
                        </div>
                    </form>
                </div>
                <p className='p-5'>
                    Already have an account? <Link to='/signin' className='hover:underline text-[#47c073] font-bold'>signIn</Link>
                </p>
            </div>
        </div>
    </div>
  )
}
