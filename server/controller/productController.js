const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')

//create product 
const createProduct = asyncHandler(async (req, res) =>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)

    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

//deleteProduct
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            res.status(404)
            throw new Error(`cannot find the product with the id ${id}`)
        }
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// updateProduct
const updateProduct =  asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product){
            res.status(404)
            throw new Error(`cannot find the product with an ID ${id}`)
        }
        // display updatedProduct
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)

    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

//getAllProducts
const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

//singleProduct
const singleProduct = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})


module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getProducts,
    singleProduct
}