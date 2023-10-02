import React, {useEffect, useState} from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import {toast} from 'react-toastify'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export const CreateProduct = () => {
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [image, setimage] = useState('')
    const [islaoding, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        AOS.init({
          duration: 2000
        })    
      },[])

      //add Product form
      const addProduct = async(e) => {
        e.preventDefault()
        if(name === '' || quantity === '' || price === '' || image === ''){
            toast.warn('Pls fill all the input field!')
            return;
        }

        try {
            setIsLoading(true)
            const response = await axios.post('http://localhost:3000/products/',{name:name, quantity:quantity, price:price, image:image})
            toast.success(`${response.data.name} have been added successfully`)
            setIsLoading(false)
            navigate('/')

        } catch (error) {
            console.log(error.message)
            setIsLoading(false)
        }
      }

  return (
    <div className='relative flex justify-center items-center '>
        <div className='absolute -z-10 top-0 right-0 left-0 h-full bg-black/10'></div>
        <div data-aos="fade-up" data-aos-easing="linear"  className='bg-white h-full my-4 w-1/2 rounded shadow' >
            <h1 className='text-center font-bold p-5 text-2xl text-green-500'>Add a Product</h1>
            <form onSubmit={addProduct}>
                <div className='p-5'>
                    <label htmlFor="" className='p-2 font-bold'>Name</label>
                    <input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Enter product name' className='p-2 outline-none bg-stone-100 w-full rounded' />
                </div>
                <div className='p-5'>
                    <label htmlFor="" className='p-2 font-bold'>Quality</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder='Enter avaliable quantity' className='p-2 outline-none bg-stone-100 w-full rounded' />
                </div>
                <div className='p-5'>
                    <label htmlFor="" className='p-2 font-bold'>Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter product price' className='p-2 outline-none bg-stone-100 w-full rounded' />
                </div>
                <div className='p-5'>
                    <label htmlFor="" className='p-2 font-bold'>Image url</label>
                    <input type="text" value={image} onChange={(e) => setimage(e.target.value)} placeholder='Enter product name' className='p-2 outline-none bg-stone-100 w-full rounded' />
                </div>
                <div className='flex justify-center items-center'>
                    <img src={image} alt="" className='w-40 h-40 object-cover' />
                </div>
                <div   className='text-center p-5'>
                    {
                        !islaoding && (
                            <button className='bg-green-500 text-stone-100 p-2 rounded font-bold '>
                                Add Product to Stock
                            </button>
                        )
                    }  
                </div>
            </form>
        </div>
    </div>
  )
}
