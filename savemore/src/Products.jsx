import React from 'react'

export const Products = ({product}) => {
  return (
    <div className='border h-80 w-80 flex justify-center items-center flex-col my-4 '>
        <img src={product.image} alt="" className='flex w-1/2 object-cover' />
        <h1>{product.name}</h1>
    </div>
  )
}
