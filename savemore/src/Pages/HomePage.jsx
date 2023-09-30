import React, { useState , useEffect} from 'react'
import axios from 'axios'
import { Products } from '../Products'
import bgImage from '../assets/images/bgImage.png'
import ScrollAnimation from 'react-animate-on-scroll'
import "animate.css/animate.min.css";


export const HomePage = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getProducts = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get("http://localhost:3000/products/")
            console.log(response.data)
            setProducts(response.data )
            // res.status(200).json(response.data)
            setIsLoading(false)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      getProducts()
    }, [])
    
  return (
    <div className=''>
        <div className='flex items-center h-[100vh] w-full bg-yellow-300'>
            <span className='flex justify-s items-start'>
                <img className='h-full w-full object-contain' src={bgImage} alt=""  />
            </span>
            <div className='flex flex-col items-center'>
                <ScrollAnimation animateIn='bounceIn' animateOut='bounceOut' className='font-bold text-4xl p-5 right-1/3 flex justify-end text-stone-800'>
                    Welcome to Admin Dashboard!
                </ScrollAnimation>
                <ScrollAnimation animateIn='bounceInRight' animateOut='bounceOutLeft' className='p-5'>
                    <p className='flex items-center text-xl'>You can add, delete and create new product here. <a href='#products' className='hover:underline underline-offset-2 cursor-pointer font-bold text-blue-500'>start now!</a> </p>
                </ScrollAnimation>
            </div>
        </div>
        <ScrollAnimation animateIn='wobble' 
            initiallyVisible={true}>
            <h1 className='p-4 font-bold text-center text-3xl text-orange-500'>
                List of Products...
            </h1>
        </ScrollAnimation>
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
                                    <Products key={index} product={product}/>
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
