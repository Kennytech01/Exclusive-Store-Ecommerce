import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {MdKeyboardDoubleArrowLeft} from 'react-icons/md'
import logo from '../assets/images/logo.png'
import AOS from "aos";
import "aos/dist/aos.css";
import {toast} from 'react-toastify'

export const SignUp = () => {
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    //refresh AOS
    useEffect(() => {
        AOS.init({
            duration: 2000
        })    
        },[])

    //handleSubmit
    const handleSubmit = async (e)=>{
     e.preventDefault()
     try {
        setLoading(true)
        setError(false)
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json()
        console.log(data)
        toast.success(`${formData.username} account created successfully!`)
        setLoading(false)

        if(data.success === false){  //check for error
            setError(true)
            return
        }
        // toast.success(`${response.data.username} have logged in successfully`)
        navigate('/signin')

     } catch (error) {
        setLoading(false)
        setError(true)
     }
    }

  return (
    <div className='flex  justify-center items-center h-full'>
        <div className='bg-stone-50 fixed top-0 right-0 left-0  h-full -z-10 blur'></div>
        <div className='md:w-[40%] sm:w-2/3 w-[90%] mx-auto '>
            <Link to= '/' className='flex justify-center items-center m-3 group'>
                <button 
                    className='p-3 border bg-white flex items-center justify-center font-semibold rounded-full group-hover:scale-110 ease-out duration-500'>
                    <MdKeyboardDoubleArrowLeft size={30}/>
                </button>
            </Link>
            <div  data-aos="fade-up" data-aos-duration='1500' className='bg-white rounded-xl w-full text-center shadow-xl border h-full mb-4'>
                <div className='m-3 relative flex justify-center'>
                    <img src={logo} alt="image" className='w-28 h-16 object-contain cursor-pointer' />
                </div>
                <h1 className='font-bold text-xl p-3 text-cente'>Sign up! as Admin</h1>
                <h4 className='sign text-lg p-2 text-center'>Get access to admins  content.</h4>
                <div className='mx-5'>
                    <form onSubmit={handleSubmit} >
                        <div className='p-2'>
                            <input 
                                type="text" 
                                id='username' 
                                onChange={handleChange} 
                                className='w-full border p-3 rounded-full outline-none' 
                                placeholder='Enter your username' 
                            />
                        </div>
                        <div className='p-2'>
                            <input 
                                type="email" 
                                id='email' 
                                onChange={handleChange} 
                                className='w-full border p-3 px-3 rounded-full outline-none' 
                                placeholder=' Enter your email address' 
                            />
                        </div>
                        <div className='p-2'>
                            <input 
                                type="password" 
                                id='password' 
                                onChange={handleChange}  
                                className='w-full border p-3 px-3 rounded-full outline-none' 
                                placeholder='Create a password' 
                            />
                        </div>
                        <div className='p-3 flex justify-center  '>
                            <button
                                disabled={loading} 
                                type="submit" 
                                value='submit' 
                                className='w-full p-3 font-semibold rounded-full hover:opacity-95 disabled:opacity-80 hover:font-bold transition-all ease-out duration-500 bg-green-500 text-stone-100'
                                >
                                    {loading? 'LOADING...' : 'SIGN UP'}
                            </button>
                        </div>
                    </form>
                </div>
                <div className='flex items-center gap-2'>
                    <p className='pl-2'>Already have an account?</p>
                    <Link to={`/signin`}>
                        <p className='hover:underline font-bold hover:font-extrabold text-green-500'>sign in</p>
                    </Link>
                </div>
                    {/* error message */}
                <div className='p-2 text-start'>
                    <p className='text-red-700 '>{error && 'something went wrong!...'}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
