import axios from 'axios'
import React, { useContext, useState } from 'react'
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
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#22c55e',
      focusCancel: true,
      cancelButtonText: "<p class='font-bold'>Cancel!</p>",
      confirmButtonText: "<p class='font-bold'>Yes delete it!</p>"
    })
    if(result.isConfirmed){
      try {
        await axios.delete(`http://localhost:3000/products/${id}`)
        toast.success('Product deleted Sucessfully!')
        getProducts()
  
      } catch (error) {
        console.log(error.message)      
      }
    }
  }

  return (
    <div>
      <div data-aos="fade-in-out" data-aos-duration="3000" className=' h-80 w-80 flex justify-center items-center flex-col bg-white shadow'>
        <img src={product.image} alt="" className='flex h-1/2 w-full object-contain' />
        <h1 className='font-bold p-2 capitalize'>{product.name}</h1>
        <div className='flex items-center justify-between w-full p-2'>
          <p className=' w-full flex items-center'>
            <span className='flex items-center'><TbCurrencyNaira/>{product.price.toLocaleString()}</span>
            <span className='ml-2 line-through flex items-center text-[#f33f0df3] text-stone-400'><TbCurrencyNaira />{product.oldprice.toLocaleString()}</span>
          </p>
          <p className='flex items-center'><span className='text-stone-500 '>avaliable:</span> {product.quantity.toLocaleString()}</p>
        </div>
        <div className='w-full flex justify-between items-center px-2'>
          <Link to={`/editproduct/${product._id}`}>
            <button className='bg-green-500 text-stone-100 px-2 p-1 rounded flex'>Edit</button>
          </Link>
          <button onClick={()=> deleteProduct(product._id)} className='bg-orange-500 text-stone-100 px-2 p-1 rounded'>Delete</button>
        </div>
      </div>
    </div>
  )
}
