import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {MdKeyboardDoubleArrowLeft} from 'react-icons/md'
import logo from '../assets/images/logo.png'
import AOS from "aos";
import { signInStart, signInSuccess, signInFaliure } from '../Redux/features/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import { OAuth } from '../Component/OAuth';

export const AdminSignin = () => {
    const [formData, setFormData] = useState({})
    const {loading, error} = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(signInStart())
            const response = await fetch('/api/auth/adminsignin', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json()
            
            if(data.success === false){
                dispatch(signInFaliure(data))
                return
            }
            dispatch(signInSuccess(data))
            navigate('/')
        } catch (error) {
           dispatch(signInFaliure(error))
        }
    }
    
  return (
    <div>
        <div className='md:w-[40%] sm:w-2/3 w-[90%] mx-auto'>
            <Link to= '/' className='flex justify-center items-center m-3 group'>
                <button 
                    className='p-3 border bg-white flex items-center justify-center font-semibold rounded-full group-hover:scale-110 ease-out duration-500'>
                    <MdKeyboardDoubleArrowLeft size={30}/>
                </button>
            </Link>
            <div  data-aos-duration='1500' className='bg-white rounded-xl w-full text-center shadow-xl border mb-5'>
                <div className='m-5 relative flex justify-center'>
                    <img src={logo} alt="image" className='w-28 h-20 object-contain cursor-pointer' />
                </div>
                <h1 className='font-bold text-xl p-5 text-[#0D333f]'>Welcome Back! to Admin Page</h1>
                <h4 className='sign text-lg p-2 text-center text-[#0D333f]'>Sign in into your account for full access</h4>
                <p className='text-red-700'>
                    {
                        error ? error.message || 'something went wrong!' : ""
                    }
                </p>
                <div className='mx-5'>
                    <form onSubmit={handleSubmit} >
                        <div className='p-2'>
                            <input 
                                onChange={handleChange}
                                type="email" 
                                id = "email"
                                className=' w-full border p-3 px-3 rounded-full outline-none' 
                                placeholder='Enter your email address' 
                            />
                        </div>
                        <div className='p-2'>
                            <input 
                                onChange={handleChange}
                                type="password" 
                                id = "password"                                                                                                                                                                                                                 
                                className=' w-full border p-3 px-3 rounded-full outline-none' 
                                placeholder='Enter your password' 
                            />
                        </div>
                        <div  className='p-3 flex justify-center'>
                            <button
                                disabled={loading}
                                className='disabled:opacity-80 hover:opacity-90 w-full p-3 font-semibold rounded-full ease-out duration-500 transition-all bg-green-600 text-stone-100 '
                            >
                                {loading? 'LOADING...' : 'SIGN IN'}
                            </button>
                        </div>
                        <OAuth/>
                    </form>
                </div>
                <p className='p-5 text-[#0D333f]'>
                    Don't have admin account? <Link to='/adminsignup' className='hover:underline text-[#0D333f] font-bold'>signUp</Link>
                </p>
            </div>
        </div>
    </div>
  )
}
