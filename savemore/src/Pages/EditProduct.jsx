import axios from 'axios'
import React, { useState , useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {toast} from 'react-toastify'

export const EditProduct = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState({
        name: "",
        quantity: "",
        price: "",
        image: ""
    })

    //edit single product 
    const getProduct = async () => { 
        setIsLoading(true)
        try {
            const response =  await axios.get(`http://localhost:3000/products/${id}`)
            setResult({
                name: response.data.name,
                quantity: response.data.quantity,
                price: response.data.price,
                image: response.data.image
            })
            setIsLoading(false)
            
        } catch (error) {
            setIsLoading(false)
            toast.error(error.message)
        }
     }

     // update product
     const updateProduct = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
           await axios.put(`http://localhost:3000/products/${id}`, result) 
           toast.success('Product updated Successfully')
           navigate('/')

        } catch (error) {
            setIsLoading(false)
            toast.error(error.message)
        }
     }
     
     useEffect(() => {
       getProduct()
     }, [])
     
  return (
    <div className='relative flex justify-center items-center '>
        <div className='absolute -z-10 top-0 right-0 left-0 h-full bg-black/10'></div>
        <div data-aos="fade-up" data-aos-easing="linear"   className='bg-white w-1/2 h-full my-4 rounded shadow '>
            <h1 className='text-center font-bold p-5 text-2xl text-green-500'>Edit a Product</h1>
            {
                isLoading? ('Loading') : (
                    <>
                        <form onSubmit={updateProduct}>
                            <div className='p-5'>
                                <label htmlFor="" className='p-2 font-bold'>Name</label>
                                <input type="text" value={result.name} onChange={(e) => setResult({...result, name: e.target.value})} placeholder='Enter product name' className='p-2 outline-none bg-stone-100 w-full rounded' />
                            </div>
                            <div className='p-5'>
                                <label htmlFor="" className='p-2 font-bold'>Quality</label>
                                <input type="number" value={result.quantity} onChange={(e) => setResult({...result, quantity: e.target.value})} placeholder='Enter avaliable quantity' className='p-2 outline-none bg-stone-100 w-full rounded' />
                            </div>
                            <div className='p-5'>
                                <label htmlFor="" className='p-2 font-bold'>Price</label>
                                <input type="number" value={result.price} onChange={(e) => setResult({...result, price: e.target.value})} placeholder='Enter product price' className='p-2 outline-none bg-stone-100 w-full rounded' />
                            </div>
                            <div className='p-5'>
                                <label htmlFor="" className='p-2 font-bold'>Image url</label>
                                <input type="text" value={result.image} onChange={(e) => setResult({...result, image: e.target.value})} placeholder='Enter product name' className='p-2 outline-none bg-stone-100 w-full rounded' />
                            </div>
                            <div className='flex justify-center items-center'>
                                <img src={result.image} alt="image" className='w-40 h-40 object-cover'/>
                            </div>
                            <div className='text-center p-5'>
                                {
                                    !isLoading && (
                                        <button className='bg-green-500 text-stone-100 p-2 rounded font-bold '>Update Product</button>
                                    )
                                }
                            </div>
                        </form>
                    </>
                )
            }
        </div>
    </div>
  )
}
