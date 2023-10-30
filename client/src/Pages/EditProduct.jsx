import axios from 'axios'
import React, { useState , useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {LuHome} from 'react-icons/lu'
import Swal from 'sweetalert2'

export const EditProduct = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState({
        name: "",
        quantity: "",
        price: "",
        image: "",
        category: "",
        percentage: "",
        oldprice: ""
    })

    //edit single product 
    const getProduct = async () => { 
        setIsLoading(true)
        try {
            const response =  await axios.get(`http://localhost:3000/api/products/${id}`)
            setResult({
                name: response.data.name,
                quantity: response.data.quantity,
                price: response.data.price,
                image: response.data.image,
                category: response.data.category,
                percentage: response.data.percentage,
                oldprice: response.data.oldprice
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
           await axios.put(`http://localhost:3000/api/products/${id}`, result) 
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

    const goHome = async () => {
        const result  = await Swal.fire({
            title: "<p class='text-black text-xl'>Do you want to go back to home page?</p>",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#f97316',
            cancelButtonColor: '#22c55e',
            focusCancel: true,
            cancelButtonText: "<p class='font-bold'>Not yet!</p>",
            confirmButtonText: "<p class='font-bold'>Yes!</p>"
          })
          if(result.isConfirmed){
            navigate('/')
          }
     }
     
  return (
    <div className='relative flex flex-col justify-center items-center min-h-screen'>
        <div className='absolute -z-10 top-0 right-0 left-0 h-full bg-black/5'></div>
        <div onClick={()=> goHome()} className='flex justify-center items-center m-3 group'>
            <button 
                className='p-3 border bg-white flex items-center justify-center font-semibold rounded-full group-hover:scale-110 ease-out duration-500'>
                <LuHome size={30}/>
            </button>
        </div>
        <div data-aos="fade-up" data-aos-easing="linear"   className='bg-white lg:w-1/2 sm:w-2/3 h-full m-4 rounded shadow '>
            <h1 className='text-center font-bold p-5 text-2xl text-green-500'>Edit a Product</h1>
            {
                isLoading? 
                <p className='text-center text-orange-500'>Loading</p> 
                : (
                    <>
                        <form onSubmit={updateProduct}>
                            <div className='p-5'>
                                <label htmlFor="" className='p-2 font-bold'>Name</label>
                                <input type="text" value={result.name} onChange={(e) => setResult({...result, name: e.target.value})} placeholder='Enter product name' className='p-2 outline-none bg-stone-100 w-full rounded' />
                            </div>
                            <div className='flex items-center justify-center'>
                                <div className='p-5'>
                                    <label htmlFor="" className='p-2 font-bold'>Quantity</label>
                                    <input type="number" value={result.quantity} onChange={(e) => setResult({...result, quantity: e.target.value})} placeholder='Enter avaliable quantity' className='p-2 outline-none bg-stone-100 w-full rounded' />
                                </div>
                                <div className='p-5'>
                                    <label htmlFor="" className='p-2 font-bold'>Category</label>
                                    <input type="text" value={result.category} onChange={(e) => setResult({...result, category: e.target.value})} placeholder='Enter product category' className='p-2 outline-none bg-stone-100 w-full rounded' />
                                </div>
                            </div>
                            <div className='flex items-center justify-center'>
                                <div className='p-5'>
                                    <label htmlFor="" className='p-2 font-bold'>Old Price</label>
                                    <input type="number" value={result.oldprice} onChange={(e) => setResult({...result, oldprice: e.target.value})} placeholder='Enter product old price' className='p-2 outline-none bg-stone-100 w-full rounded' />
                                </div>
                                <div className='p-5'>
                                    <label htmlFor="" className='p-2 font-bold'>Current Price</label>
                                    <input type="number" value={result.price} onChange={(e) => setResult({...result, price: e.target.value})} placeholder='Enter product current price' className='p-2 outline-none bg-stone-100 w-full rounded' />
                                </div>
                            </div>
                            <div className='flex items-center justify-center'>
                                <div className='p-5'>
                                    <label htmlFor="" className='p-2 font-bold'>Image url</label>
                                    <input type="text" value={result.image} onChange={(e) => setResult({...result, image: e.target.value})} placeholder='Enter image url' className='p-2 outline-none bg-stone-100 w-full rounded' />
                                </div>
                                <div className='p-5'>
                                    <label htmlFor="" className='p-2 font-bold'>Percentage Off</label>
                                    <input type="number" value={result.percentage} onChange={(e) => setResult({...result, percentage: e.target.value})} placeholder='Enter percentage off' className='p-2 outline-none bg-stone-100 w-full rounded' />
                                </div>
                            </div>
                            <div className='flex justify-center items-center'>
                                <img src={result.image} alt="image" className='max-w-40 max-h-40 object-cover'/>
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
