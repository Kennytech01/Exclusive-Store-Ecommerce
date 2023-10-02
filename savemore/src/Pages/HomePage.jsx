import React, { useState , useEffect, useContext} from 'react'
import axios from 'axios'
import { Products } from '../Products'
import bgImage from '../assets/images/bgImage.png'
import AOS from "aos";
import "aos/dist/aos.css";
// import { ProductContext } from '../context/ProductContext';


export const HomePage = () => {
    // const {pop} = useContext(ProductContext)
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    const getProducts = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get("http://localhost:3000/products/")
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
        // once: false,
        // mirror: true
        duration: 2000
      })    
    },[])
    
    
  return (
    <div className=''>
        <div className='flex items-center h-[100vh] w-full bg-yellow-300'>
            <span data-aos='fade-down' data-aos-easing='linear' className='flex justify-s items-start'>
                <img className='h-full w-full object-contain' src={bgImage} alt=""  />
            </span>
            <div className='flex flex-col items-center'>
                <div 
                    data-aos="fade-up" 
                    data-aos-duration='3000'
                    data-aos-once = "false"
                    className='font-bold text-4xl p-5 right-1/3 flex justify-end text-stone-800'>
                    Welcome to Admin Dashboard!
                </div>
                <div className='p-5' data-aos="zoom-out-left">
                    <p className='flex items-center text-xl'>You can add, delete and create new product here. <a href='#products' data-aos="flip-up" className='hover:underline underline-offset-2 cursor-pointer font-bold text-blue-500'>start now!</a> </p>
                </div>
            </div>
        </div>
        <div>
            <h1 data-aos="fade-up" data-aos-duration="3000" className='p-4 font-bold text-center text-3xl text-orange-500'>
                Products in Stock
            </h1>
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
 