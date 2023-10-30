import axios from 'axios'
import React from 'react'

export const ProductDetail = () => {
    // console.log(product)

    const getProduct = async () => {
        try {
            const response = await axios.get(`http://api/products/${id}`)
            
        } catch (error) {
                        
        }
    }
  return (
    <div>
        {product.map((item, _id) => {
            return ( 
                <div key={_id}>
                    <p>{item.name}</p>
                </div>
            )
        })}
    </div>
  )
}
