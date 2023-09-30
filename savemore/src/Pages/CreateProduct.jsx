import React from 'react'

export const CreateProduct = () => {
  return (
    <div className='relative flex justify-center items-center h-screen'>
        <div className='absolute -z-10 top-0 right-0 left-0 h-screen bg-black/10'></div>
        <div className='bg-white h-[90vh w-1/2 rounded shadow '>
            <h1 className='text-center font-bold p-5 text-2xl'>Add a Product</h1>
            <form action="" method="post">
                <div className='p-5'>
                    <label htmlFor="" className='p-2 font-bold'>Name</label>
                    <input type="text" placeholder='Enter product name' className='p-2 outline-none bg-stone-100 w-full rounded' />
                </div>
                <div className='p-5'>
                    <label htmlFor="" className='p-2 font-bold'>Quality</label>
                    <input type="number" placeholder='Enter avaliable quantity' className='p-2 outline-none bg-stone-100 w-full rounded' />
                </div>
                <div className='p-5'>
                    <label htmlFor="" className='p-2 font-bold'>Price</label>
                    <input type="number" placeholder='Enter product price' className='p-2 outline-none bg-stone-100 w-full rounded' />
                </div>
                <div className='p-5'>
                    <label htmlFor="" className='p-2 font-bold'>Image url</label>
                    <input type="text" placeholder='Enter product name' className='p-2 outline-none bg-stone-100 w-full rounded' />
                </div>
                <div>{}</div>
                <div className='text-center p-5'>
                    <input type="submit" value="Add Product to Stock" className='bg-green-500 text-stone-100 p-2 rounded font-bold ' />
                </div>
            </form>
        </div>
    </div>
  )
}
