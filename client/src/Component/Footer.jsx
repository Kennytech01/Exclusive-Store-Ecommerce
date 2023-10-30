import React from 'react'
import {FaTwitter, FaFacebookF, FaInstagram, FaGithub, FaLinkedinIn, FaWhatsapp} from 'react-icons/fa'


export const Footer = () => {
  return (
    <div className='bg-[#0D333f] text-stone-100 flex justify-center items-center lg:mt-4 w-full'>
        <div className='flex flex-wrap items-center justify-between m-3 mb-20 md:mb-0 w-full'>
            {/* follow us  */}
            <div className='flex flex-col items-start justify-center m-2'>
                <h1 className=' text-lg font-bold p-2'>Join us on</h1>
                <div className='flex flex-wrap text-stone-100'>
                    <p className='m-2 hover:scale-110 ease-in duration-100 rounded-full p-2'>
                        <FaTwitter size={20}/>
                    </p>
                    <p className='m-2 hover:scale-110 ease-in duration-100 rounded-full p-2'>
                        <FaFacebookF size={20}/>
                    </p>
                    <p className='m-2 hover:scale-110 ease-in duration-100 rounded-full p-2'>
                        <FaInstagram size={20}/>
                    </p>
                    <p className=' m-2 hover:scale-110 ease-in duration-100 rounded-full p-2'>
                        <FaLinkedinIn  size={20}/>
                    </p>
                    <p className= ' m-2 hover:scale-110 ease-in duration-100 rounded-full p-2'>
                        <FaGithub size={20}/>
                    </p>
                    <p className='m-2 hover:scale-110 ease-in duration-100 rounded-full p-2'>
                        <FaWhatsapp size={20}/>
                    </p>
                </div>
            </div>
            {/* Call Us */}
            <div className=' flex flex-col items-start justify-center m-2'>
                <h2 className='text-lg p-2 font-bold'>Call us today</h2>
                <h1 className='text-[#e2d9e1] text-xl'>+234-8136878980</h1>
            </div>
            {/* News Letter */}
            <form className='flex items-center justify-center m-2'>
                 <input type="email" name="search" id="" placeholder='Enter your email address' className='p-2 w-full rounded outline-none text-[#781d75]'/>
                 <button type="submit" className='border p-2 mx-2 rounded hover:bg-white hover:text-black shadow-lg font-bold'>MALE</button>
                 <button type="submit" className='border p-2 mx-2 rounded hover:bg-white hover:text-black shadow-lg font-bold'>FEMALE</button>
            </form>
        </div>
    </div>
  )
}