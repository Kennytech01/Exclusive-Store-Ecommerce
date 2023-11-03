import axios from 'axios'
import React from 'react'
import {TbCurrencyNaira} from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom' 
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { addToCart } from '../Redux/features/productSlice'

export const Products = ({product, cartQuantity = 0, getProducts}) => {
  const {currentUser} = useSelector((state)=> state.user)
  const dispatch = useDispatch()
  
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

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }
 
  return (
      <div 
        data-aos="fade-up" 
        data-aos-duration="1000"
        data-aos-anchor-placement="top-center"
        className='group h-[24rem] sm:w-[24rem] flex justify-center items-center flex-col bg-white shadow-xl mx-2'
      >
        <Link to={`/product/${product._id}`} className='flex h-1/2 w-full relative'>
          <span className='absolute right-2 bg-orange-400 text-white font-light rounded text-sm px-1'>{product.percentage}%</span>
            <img src={product.image} alt="" className='w-full object-contain group-hover:cursor-pointer' />
        </Link>
        <Link to={`/product/${product._id}`} className='font-bold p-2 capitalize flex flex-wrap cursor-pointer'>{product.name}</Link>
          <div className='flex items-center justify-between w-full p-2'>
            <p className=' w-full flex items-center'>
              <span className='flex items-center text-sm font-bold '><TbCurrencyNaira className='mt-1'/>{product.price.toLocaleString()}</span>
              <span className='ml-2 line-through flex items-center text-[#f33f0df3] text-stone-400 text-sm '><TbCurrencyNaira className='mt-1'/>{product.oldprice.toLocaleString()}</span>
            </p>
            <p className='flex items-center'><span className='text-stone-500 '>Avaliable:</span> {product.quantity.toLocaleString()}</p>
          </div>
          <p>{cartQuantity}</p>
        <div className='w-full'>
          {
            currentUser? (
              <div className='justify-center flex mx-2'>
                <button onClick={()=> handleAddToCart(product)} className='w-full group-hover:cursor-pointer group-hover:bg-[#0D333f] border border-[#0D333f] text-[#0D333f] group-hover:text-white px-3 p-2 rounded hover:opacity-80 transition-all font-bold'>
                  Add to cart
                </button>
              </div>
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
      </div>
  )
}
