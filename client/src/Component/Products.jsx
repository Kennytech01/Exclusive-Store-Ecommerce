import axios from 'axios'
import React, { useState  } from 'react'
import {TbCurrencyNaira} from 'react-icons/tb'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom' 
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { ProductDetail } from '../Component/ProductDetail'

export const Products = ({product, getProducts}) => {
  const {currentUser} = useSelector((state)=> state.user)
  
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

 
  return (
      <Link 
        to={`/productdetail/`}
        data-aos="fade-up" 
        data-aos-duration="1500"
        className='group h-[24rem] w-80 mx-h-96 min-w-96 flex justify-center items-center flex-col bg-white shadow'
      >
        <div className='flex h-1/2 w-full relative'>
          <span className='absolute right-2 bg-orange-400 text-white font-light rounded text-sm px-1'>{product.percentage}%</span>
            <img src={product.image} alt="" className='w-full object-contain group-hover:cursor-pointer' />
        </div>
        <h1 className='font-bold p-2 capitalize flex flex-wrap'>{product.name}</h1>
        <div className='flex items-center justify-between w-full p-2'>
          <p className=' w-full flex items-center'>
            <span className='flex items-center text-sm font-bold '><TbCurrencyNaira className='mt-1'/>{product.price.toLocaleString()}</span>
            <span className='ml-2 line-through flex items-center text-[#f33f0df3] text-stone-400 text-sm '><TbCurrencyNaira className='mt-1'/>{product.oldprice.toLocaleString()}</span>
          </p>
          <p className='flex items-center'><span className='text-stone-500 '>Avaliable:</span> {product.quantity.toLocaleString()}</p>
        </div>
        <div>
          {
            currentUser? (
              <button className='group-hover:cursor-pointer group-hover:bg-[#0D333f] border border-[#0D333f] text-[#0D333f] group-hover:text-white px-3 p-2 rounded hover:opacity-80 transition-all font-bold'>
                  Add to cart
              </button>
            )
            :
            <div className='w-full flex justify-between items-center px-2 '>
              <Link to={`/editproduct/${product._id}`}>
                <button className='bg-[#0D333f] text-stone-100 px-2 p-1 rounded flex mx-5'>Edit</button>
              </Link>
              <button onClick={()=> deleteProduct(product._id)} className='bg-red-500 text-stone-100 px-2 p-1 rounded'>Delete</button>
            </div>
          }
        </div>
      </Link>
  )
}
