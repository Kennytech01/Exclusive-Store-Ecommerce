import React, { useState , useEffect} from 'react'
import axios from 'axios'
import { Products } from './Products'

export const HomePage = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getProducts = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get("http://localhost:3000/products/")
            console.log(response.data)
            setProducts(response.data )
            // res.status(200).json(response.data)
            setIsLoading(false)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      getProducts()
    }, [])
    
  return (
    <div className=''>
        <div className='flex justify-center items-center p-2 h-[70vh] bg-blue-200'>
            <h1 className='font-bold text-3xl p-2'>welcome to our online store!</h1>
        </div> 
        <div>
            {
                isLoading ? (
                    <span>Loading!</span>
                )
                :
                (
                   <div className='flex space-x-2 flex-wrap justify-center items-center h-full'>
                        {
                            products.length > 0 ? (
                                products.map((product, index) => {
                                    return(
                                    <Products key={index} product={product}/>
                                    )
                                })
                            )
                            :
                            (
                                <div>There is no product</div>
                            )
                        }
                   </div> 
                )
            }
        </div>
        {/* <div>
            {
                products.map((product, index) => {
                    return(
                    <div>
                        <h1>{product.name}</h1>
                    </div>
                    )
                })
            }
        </div> */}
    </div>
  )
}
