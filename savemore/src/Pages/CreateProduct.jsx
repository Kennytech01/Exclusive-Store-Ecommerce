import React, {useEffect, useState} from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import {toast} from 'react-toastify'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {LuHome} from 'react-icons/lu'
import Swal from 'sweetalert2'

export const CreateProduct = () => {
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [image, setimage] = useState('')
    const [oldPrice, setOldPrice] = useState("")
    const [category, setCategory] = useState("")
    const [percentage, setPercentage] = useState('')
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
        if(name === '' || quantity === '' || price === '' || image === '' || oldPrice ==='' || category === '' || percentage === ''){
            toast.warn('Pls fill all the input field!')
            return;
        }

        try {
            setIsLoading(true)
            const response = await axios.post('http://localhost:3000/api/products/',{name:name, quantity:quantity, price:price, image:image, oldprice: oldPrice, category: category, percentage: percentage})
            toast.success(`${response.data.name} have been added successfully`)
            setIsLoading(false)
            navigate('/')

        } catch (error) {
            console.log(error.message)
            setIsLoading(false)
        }
      }

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
    <div className='relative flex flex-col justify-center items-center '>
        <div className='absolute -z-10 top-0 right-0 left-0 h-full bg-black/10'></div>
        <div onClick={()=> goHome()} className='flex justify-center items-center m-3 group'>
            <button 
                className='p-3 border bg-white flex items-center justify-center font-semibold rounded-full group-hover:scale-110 ease-out duration-500'>
                <LuHome size={30}/>
            </button>
        </div>
        <div data-aos="fade-left" data-aos-easing="linear"  className='bg-white h-full m-4 lg:w-1/2 sm:2/3 transition-all  rounded shadow' >
            <h1 className='text-center font-bold p-5 text-2xl text-green-500'>Add a new Product</h1>
            <form onSubmit={addProduct}>
                <div className='p-5'>
                    <label htmlFor="" className='p-2 font-bold'>Name</label>
                    <input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Enter product name' className='p-2 outline-none bg-stone-100 w-full rounded' />
                </div>
                <div className='flex items-center justify-center'>
                    <div className='p-5'>
                        <label htmlFor="" className='p-2 font-bold'>Quantity</label>
                        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder='Enter avaliable quantity' className='p-2 outline-none bg-stone-100 w-full rounded' />
                    </div>
                    <div className='p-5'>
                        <label htmlFor="" className='p-2 font-bold'>Category</label>
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Enter product category' className='p-2 outline-none bg-stone-100 w-full rounded' />
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <div className='p-5'>
                        <label htmlFor="" className='p-2 font-bold'>Old Price</label>
                        <input type="number" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} placeholder='Enter product old price' className='p-2 outline-none bg-stone-100 w-full rounded' />
                    </div>
                    <div className='p-5'>
                        <label htmlFor="" className='p-2 font-bold'>Current Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter product current price' className='p-2 outline-none bg-stone-100 w-full rounded' />
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <div className='p-5'>
                        <label htmlFor="" className='p-2 font-bold'>Image url</label>
                        <input type="text" value={image} onChange={(e) => setimage(e.target.value)} placeholder='Enter image url' className='p-2 outline-none bg-stone-100 w-full rounded' />
                    </div>
                    <div className='p-5'>
                        <label htmlFor="" className='p-2 font-bold'>Percentage Off</label>
                        <input type="number" value={percentage} onChange={(e) => setPercentage(e.target.value)} placeholder='Enter percentage off' className='p-2 outline-none bg-stone-100 w-full rounded' />
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <img src={image} alt="" className='max-w-40 max-h-40 object-cover' />
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
