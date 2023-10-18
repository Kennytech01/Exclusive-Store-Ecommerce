import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {MdKeyboardDoubleArrowLeft} from 'react-icons/md'
import logo from '../assets/images/logo.png'
import AOS from "aos";

export const SignIn = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const signinUser = (e) => {
        e.preventDefault()
    }
    
  return (
    <div className='flex  justify-center items-center h-[90vh]'>
        <div className='md:w-[40%] sm:w-2/3 w-[90%] mx-auto'>
            <Link to= '/' className='flex justify-center items-center m-3 group'>
                <button 
                    className='p-3 border bg-white flex items-center justify-center font-semibold rounded-full group-hover:scale-110 ease-out duration-500'>
                    <MdKeyboardDoubleArrowLeft size={30}/>
                </button>
            </Link>
            <div data-aos="fade-up"  data-aos-duration='1500' className='bg-white rounded-xl w-full text-center shadow-xl border'>
                <div className='m-5 relative flex justify-center'>
                    <img src={logo} alt="image" className='w-28 h-20 object-contain cursor-pointer' />
                </div>
                <h1 className='font-bold text-xl p-5 text-cente'>Welcome Back!</h1>
                <h4 className='sign text-lg p-2 text-center '>Sign in into your account for full access</h4>
                <div className='mx-5'>
                    <form onSubmit={signinUser} >
                        <div className='p-2'>
                            <input 
                                value={data.email}
                                onChange={(e)=> setData({...data, email: e.target.value})}
                                type="email" 
                                autoFocus className=' w-full border p-3 px-3 rounded-full outline-none' 
                                placeholder='Enter your email address' 
                            />
                        </div>
                        <div className='p-2'>
                            <input 
                                value={data.password}
                                onChange={(e)=> setData({...data, password: e.target.value})}
                                type="password" 
                                autoFocus className=' w-full border p-3 px-3 rounded-full outline-none' 
                                placeholder='Enter your password' 
                            />
                        </div>
                        <div  className='p-3 flex justify-center'>
                            <button type="submit" value='submit' onClick={()=>verify()} className='submit w-full p-3 font-semibold rounded-full hover:scale-95 ease-out duration-500 bg-green-500 text-stone-100 '>Login now</button>
                        </div>
                    </form>
                </div>
                <p className='p-5'>
                    Already have an account? <Link to='/signup' className='hover:underline text-green-500 font-bold'>signUp</Link>
                </p>
            </div>
        </div>
    </div>
  )
}
