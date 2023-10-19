import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {MdKeyboardDoubleArrowLeft} from 'react-icons/md'
import logo from '../assets/images/logo.png'
import AOS from "aos";

export const SignIn = () => {
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            setError(false)

            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json()
            console.log(data)
            setLoading(false)

            if(data.success === false){
                setError(true)
                return
            }
            navigate('/')
        } catch (error) {
            setLoading(false)
            setError(true)
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
            <div  data-aos-duration='1500' className='bg-white rounded-xl w-full text-center shadow-xl border'>
                <div className='m-5 relative flex justify-center'>
                    <img src={logo} alt="image" className='w-28 h-20 object-contain cursor-pointer' />
                </div>
                <h1 className='font-bold text-xl p-5 text-cente'>Welcome Back!</h1>
                <h4 className='sign text-lg p-2 text-center '>Sign in into your account for full access</h4>
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
                                className='disabled:opacity-80 hover:opacity-95 w-full p-3 font-semibold rounded-full ease-out duration-500 transition-all bg-green-500 text-stone-100 '
                            >
                                {loading? 'LOADING...' : 'SIGN IN'}
                            </button>
                        </div>
                    </form>
                </div>
                <p className='p-5'>
                    Already have an account? <Link to='/signup' className='hover:underline text-green-500 font-bold'>signUp</Link>
                </p>
                <p className='text-red-700'>
                    {
                        error && 'something went wrong!'
                    }
                </p>
            </div>
        </div>
    </div>
  )
}
