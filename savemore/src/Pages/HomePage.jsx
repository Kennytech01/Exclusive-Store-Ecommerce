import React, { useState , useEffect, useContext} from 'react'
import axios from 'axios'
import { Products } from '../Products'
import bgImage from '../assets/images/bgImage.png'
import AOS from "aos";
import "aos/dist/aos.css";
import {PiToggleRightDuotone} from 'react-icons/pi'
import {PiToggleLeftDuotone} from 'react-icons/pi'


export const HomePage = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [toggle, setToggle] = useState(false)


 

    const getProducts = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get("http://localhost:3000/api/products/")
            // console.log(response.data)
            setProducts(response.data )
            setIsLoading(false)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      getProducts()
    }, [])

    useEffect(() => {
      AOS.init({
        duration: 2000
      })    
    },[])
    
    // setToggle btn
    const handleClick = () => {
        setToggle(!toggle)
        toggle?  products.reverse() : products.sort((a,b) => a.name.localeCompare(b.name))
    }

  return (
    <div className=''>
        <div className='flex items-center max-h-[100vh] w-full bg-yellow-300 relative'>
            <span data-aos='fade-down' data-aos-easing='linear' className=''>
                <img className='h-full w-full object-contain' src={bgImage} alt=""  />
            </span>
            <div className='flex flex-col items-center absolute right-4 md:block transition-all duration-300'>
                <div 
                    data-aos="fade-up" 
                    data-aos-duration='3000'
                    data-aos-once = "false"
                    className='font-bold text-4xl p-5 right-1/3 flex justify-end text-stone-800'>
                    Welcome to Admin Dashboard!
                </div>
                <div className='p-5 flex items-center flex-wrap' data-aos="zoom-out-left">
                    <p className='flex items-center text-xl'>You can add, delete and create new product here.</p>
                    <a href='#products' data-aos="flip-up" className='hover:underline underline-offset-2 cursor-pointer font-bold text-xl bg-green-300 text-white rounded p-1'>start now!</a>
                </div>
            </div>
        </div>
        <div className=''>
            <h1 data-aos="fade-up" data-aos-duration="3000" className='p-4 font-bold text-center text-3xl text-orange-500 '>
                Products in Stock
            </h1>
            <div onClick={handleClick} className='p-2 md:p-5 md:mx-10 flex items-center  cursor-pointer'>
                {
                    toggle? 
                    (< PiToggleRightDuotone 
                    size={30} 
                    className='text-orange-500'
                    /> ) 
                    :
                    <PiToggleLeftDuotone size={30}/>
                }
                <span className='ml-4 text-stone-600'>Sort A-Z</span>
            </div>
        </div>
        <div id='products' className='flex justify-center items-center m-2'>
            {
                isLoading ? (
                    <span>Loading!</span>
                )
                :
                (
                   <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2'>
                        {
                            products.length > 0 ? (
                                products.map((product, index) => {
                                    return(
                                        <Products key={index} product={product} getProducts={getProducts}/>
                                    )
                                })
                            )
                            :
                            (
                                <div>There is no product</div>
                            )
                        }
                   </div> 
                )
            }
        </div>
    </div>
  )
}
 