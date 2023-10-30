import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {MdKeyboardDoubleArrowLeft} from 'react-icons/md'
import {FaNairaSign} from 'react-icons/fa6'
import {BsDashLg, BsPlusLg} from 'react-icons/bs'
import AOS from "aos";
import "aos/dist/aos.css";
import {FaTwitter, FaFacebookF, FaInstagram,FaWhatsapp} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInFaliure, signInSuccess } from '../Redux/features/userSlice'

export const ProductDetail = () => {
    const [product, setProduct] = useState({})
    const {id} = useParams()
    const {loading, error} = useSelector((state) => state.user)
    const dispatch = useDispatch()
  
    useEffect(()=>{
        const getProduct = async () => {
            try {
                dispatch(signInStart())
                const response = await axios.get(`http://localhost:3000/api/products/${id}`)
                const result = response.data
                dispatch(signInSuccess(result))
                setProduct(result)
            } catch (error) {
                   dispatch(signInFaliure(error.message))        
            }
        }
        getProduct()
    }, [])

     //refresh AOS
     useEffect(() => {
        AOS.init({
          duration: 2000
        })    
      },[])
        
  return (
    <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
        <Link to= '/' className='flex items-center m-5 group'>
            <button 
                className='p-3  flex items-center justify-center font-semibold rounded-full group-hover:scale-110 ease-out duration-500'>
                <MdKeyboardDoubleArrowLeft size={30}/>
            </button>
        </Link>
        <div className='grid md:grid-cols-2 grid-cols-1 m-4 text-[#0D333f]'>
            <div className='h-96'>
                <img src={product?.image} alt="image" className='h-full w-full object-contain'/>
            </div>
            <div className='h-96 p-2 '>
                <p className='border-b font-bold uppercase text-xl p-5'>{product?.name}</p>
                <p className='border-b text-xl p-3 flex justify-between'>
                    <span className='flex items-center font-bold '>
                        <FaNairaSign size={30}/>
                        <span className='text-4xl'>{product?.price?.toLocaleString()}</span>
                    </span>
                    <span>
                        <span className='text-stone-500'>Avaliable quantity:</span>
                        {product?.quantity?.toLocaleString()}
                    </span>
                </p>
                <div className='p-5 py-1 rounded-lg flex my-4 items-center text-sm'>
                    <BsDashLg/>
                    <span className='px-2 font-bold'>quantity ordered</span>
                    <BsPlusLg/>
                </div>
                <div className='py-5 '>
                    <button className='border border-[#0D333f] shadow w-full p-4 rounded-lg font-bold hover:bg-[#0D333f] hover:text-white text-[#0D333f] transition-all text-xl'>Buy Now</button>
                </div>
                <div className='flex flex-wrap text-[#0D333f]'>
                    <p className='m-2 hover:scale-110 ease-in duration-100 rounded-full p-2'>
                        <FaTwitter size={20}/>
                    </p>
                    <p className='m-2 hover:scale-110 ease-in duration-100 rounded-full p-2'>
                        <FaFacebookF size={20}/>
                    </p>
                    <p className='m-2 hover:scale-110 ease-in duration-100 rounded-full p-2'>
                        <FaInstagram size={20}/>
                    </p>
                    <p className='m-2 hover:scale-110 ease-in duration-100 rounded-full p-2'>
                        <FaWhatsapp size={20}/>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
