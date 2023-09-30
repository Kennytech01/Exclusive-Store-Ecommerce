import React from 'react'
import {TbCurrencyNaira} from 'react-icons/tb'
import { Link } from 'react-router-dom' 

export const Products = ({product}) => {
  return (
    <div className=' h-80 w-80 flex justify-center items-center flex-col bg-white shadow'>
        <img src={product.image} alt="" className='flex h-1/2 w-full object-contain' />
        <h1 className='font-bold p-2 capitalize'>{product.name}</h1>
        <div className='flex items-center justify-between w-full p-2'>
          <p className=' w-full flex items-center'>
            <span className='flex items-center'><TbCurrencyNaira className='mt-1'/>{product.price.toLocaleString()}</span>
            <span className='ml-2 line-through flex items-center text-stone-400'><TbCurrencyNaira className='mt-1'/>{product.oldprice.toLocaleString()}</span>
          </p>
          <p className='flex items-center'><span className='text-stone-500 '>avaliable:</span> {product.quantity}</p>
        </div>
        <div className='w-full flex justify-between items-center px-2'>
          <Link to='/editproduct'>
            <button className='bg-green-500 text-stone-100 px-2 p-1 rounded flex'>Edit</button>
          </Link>
          <button className='bg-orange-500 text-stone-100 px-2 p-1 rounded'>Delete</button>
        </div>
    </div>
  )
}
