import axios from 'axios'
import React, { useState  } from 'react'
import {TbCurrencyNaira} from 'react-icons/tb'
import { Link } from 'react-router-dom' 
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

export const Products = ({product, getProducts}) => {
  
// delete product from the dashboard
  const deleteProduct = async (id) => {
    const result  = await Swal.fire({
      title: "<p class='text-black text-xl'>Do you really want to delete this Product?</p>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#22c55e',
      focusCancel: true,
      cancelButtonText: "<p class='font-bold'>Cancel!</p>",
      confirmButtonText: "<p class='font-bold'>Yes delete it!</p>"
    })
    if(result.isConfirmed){
      try {
        await axios.delete(`http://localhost:3000/api/products/${id}`)
        toast.success('Product deleted Sucessfully!')
        getProducts()
  
      } catch (error) {
        console.log(error.message)      
      }
    }
  }

  // modal display
  // const productDetail = async (id) => {
  //   const result  = await Swal.fire({
  //     title: 'Sweet!',
  //     text: 'Modal with a custom image.',
  //     imageUrl: `${product.image}`,
  //     imageWidth: 400,
  //     imageHeight: 200,
  //     imageAlt: 'image',
  //     objectFit: 'cover'
  //   })
  //   try {
  //     await axios.get(`http://localhost:3000/products/${id}`)

  //   } catch (error) {
  //     console.log(error.message)      
  //   }
  // }

  return (
      <div
        data-aos="fade-up" 
        data-aos-duration="1500" 
        className=' h-80 w-80 mx-h-96 min-w-96 flex justify-center items-center flex-col bg-white shadow'>
        <div className='flex h-1/2 relative'>
          <span className='absolute right-2 bg-green-400 text-white font-light rounded text-sm px-1'>{product.percentage}%</span>
          <img src={product.image} alt="" className='w-full object-contain' />
        </div>
        <h1 className='font-bold p-2 capitalize flex flex-wrap'>{product.name}</h1>
        <div className='flex items-center justify-between w-full p-2'>
          <p className=' w-full flex items-center'>
            <span className='flex items-center text-sm font-bold '><TbCurrencyNaira className='mt-1'/>{product.price.toLocaleString()}</span>
            <span className='ml-2 line-through flex items-center text-[#f33f0df3] text-stone-400 text-sm '><TbCurrencyNaira className='mt-1'/>{product.oldprice.toLocaleString()}</span>
          </p>
          <p className='flex items-center'><span className='text-stone-500 '>Avaliable:</span> {product.quantity.toLocaleString()}</p>
        </div>
        <div className='w-full flex justify-between items-center px-2'>
          <Link to={`/editproduct/${product._id}`}>
            <button className='bg-green-500 text-stone-100 px-2 p-1 rounded flex'>Edit</button>
          </Link>
          <button onClick={()=> deleteProduct(product._id)} className='bg-red-500 text-stone-100 px-2 p-1 rounded'>Delete</button>
        </div>
      </div>
  )
}
