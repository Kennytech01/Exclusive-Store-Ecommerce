import React from 'react'
import { Link } from 'react-router-dom'
import {MdKeyboardDoubleArrowLeft} from 'react-icons/md'
import logo from '../assets/images/logo.png'

export const SignUp = () => {
  return (
    <div className='flex  justify-center items-center h-[100vh]'>
        <div className='md:w-1/3 sm:w-2/3 w-[90%] mx-1/2 '>
            <Link to= '/' className='flex justify-center items-center m-3 group'>
                <button 
                    className='p-3 border bg-white flex items-center justify-center font-semibold rounded-full group-hover:scale-110 ease-out duration-500'>
                    <MdKeyboardDoubleArrowLeft size={30}/>
                </button>
            </Link>
            <div className='bg-white rounded-xl w-full text-center shadow-xl border'>
                <div className='m-5 relative flex justify-center'>
                    <img src={logo} alt="image" className='w-28 h-20 object-contain cursor-pointer' />
                </div>
                <h1 className='font-bold text-xl p-3 text-cente'>Register!</h1>
                <h4 className='sign text-lg p-2 text-center'>Get access to admins only content.</h4>
                <div className='mx-5'>
                    <form action="" method="post" >
                        <div className='p-2'>
                            <input type="text" name="" id="" className='w-full border p-3 rounded-full outline-none' autoFocus placeholder='Your name' />
                        </div>
                        <div className='p-2'>
                            <input type="email" name="" id="" className='w-full border p-3 px-3 rounded-full outline-none' placeholder='Your email address' />
                        </div>
                        <div className='p-3 flex justify-center  '>
                            <button type="submit" value='submit' className='submit w-full p-3 font-semibold rounded-full hover:scale-95 transition-all ease-out duration-500 bg-green-500 text-stone-100 '>Send login link</button>
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
