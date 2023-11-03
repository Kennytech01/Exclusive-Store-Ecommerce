import React, { useState , useEffect} from 'react'
import axios from 'axios'
import { Products } from '../Component/Products'
import background from '../assets/images/background.png'
import AOS from "aos";
import "aos/dist/aos.css";
import {PiToggleRightDuotone} from 'react-icons/pi'
import {PiToggleLeftDuotone} from 'react-icons/pi'
import {toast} from 'react-toastify'
import { useSelector } from 'react-redux';
import shoppingBg from '../assets/images/shoppingBg.svg'
import {TfiGift} from 'react-icons/tfi'
import {BiLogoShopify} from 'react-icons/bi'

export const HomePage = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [toggle, setToggle] = useState(false)
    const {currentUser, loading, error} = useSelector((state) =>  state.user)
    const cart = useSelector( (state) => state.cart.cart)


    //get products from api
    const getProducts = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get("http://localhost:3000/api/products/")
            // console.log(response.data)
            setProducts(response.data )
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
      getProducts()
    }, [])

    //refresh AOS
    useEffect(() => {
      AOS.init({
        duration: 2000
      })    
    },[])
    
    // sort button
    const handleClick = () => {
        setToggle(!toggle)
        toggle?  products.reverse() : products.sort((a,b) => a.name.localeCompare(b.name))
    }

  return (
    <div className=''>
        <div className=' flex items-center justify-start h-[60vh] md:h-[80vh] lg:h-[90vh] w-full relative bg-white' >
            <div data-aos='fade-down' data-aos-easing='linear' className='h-80 mx-auto max-w-full flex absolute ld:right-4 -right-10 md:right-20 md:block transition-all'>
                { 
                    currentUser?
                        <img 
                        className='sm:object-cover object-contain h-full w-full object-center blur-sm md:blur-none' 
                        src={shoppingBg} 
                        alt="bg-image" 
                        />
                    :
                    <img 
                        className='sm:object-cover object-contain h-full w-full object-center blur-sm md:blur-none' 
                        src={background} 
                        alt="bg-image" 
                    />
            }
            </div>
            <div className=' flex flex-col items-center'>
                <div 
                    data-aos="fade-up" 
                    data-aos-duration='3000'
                    data-aos-once = "false"
                    className='items-center font-bold lg:text-5xl md:text-4xl text-3xl sm:p-5 p-2 flex flex-wrap text-[#0D333f]'>
                    <span className='text-green-600 font-extrabold p-2 mr-2 shadow '>Welcome</span>
                    to Exclusive Store!
                </div>
                <div  data-aos="zoom-out-left">
                    {
                        currentUser ?
                            <div className='p-5 flex items-center flex-wrap font-bold text-[#0D333f]'>
                                <p className='flex items-center text-xl '>Shop Big Save Bigger!...</p>
                                <TfiGift size={30}/>
                            </div>
                            :
                            <div>
                                <p className='flex items-center text-xl p-2'>You can add, delete and create new product here.</p>
                                <a href='#products' data-aos="flip-up" className='hover:underline underline-offset-2 cursor-pointer font-bold text-xl bg-[#0D333f] shadow-lg text-white rounded p-1'>shop now!</a>
                            </div>
                    }
                    
                </div>
            </div>
        </div>
        {/* ... */}
        <div className=''>
            <h1 data-aos="zoom-in" data-aos-duration="1500" className='p-4 font-bold text-center text-3xl text-[#0D333f] flex justify-center'>
                { currentUser? <span className='flex items-center'>Shop and earn! {<BiLogoShopify/>}</span> : 'Products in Stock'}
            </h1>
            <div onClick={handleClick} className='p-2 md:p-5 md:mx-10 flex items-center cursor-pointer'>
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
        {/* products display */}
        <div id='products' className='flex justify-center items-center w-full'>
            {
                isLoading ? (
                    <span className='flex justify-center items-center font-bold'>Loading!</span>
                )
                :
                (
                   <div className='grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                        {
                            products.length > 0 ? (
                                products.cart.map((product, index) => {
                                    return(
                                        <Products 
                                            key={index} 
                                            product={product} 
                                            getProducts={getProducts}
                                        />
                                    )
                                })
                            )
                            :
                            (
                                <div className='flex justify-center items-center'>There is no product</div>
                            )
                        }
                   </div> 
                )
            }
        </div>
    </div>
  )
}
 