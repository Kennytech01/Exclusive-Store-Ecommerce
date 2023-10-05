const express = require('express')
const Product = require('../models/productModel')
const router = express.Router()


// create product in database
router.post('/products', async (req, res) =>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


//delete product
router.delete('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.send(404).json({message: `cannot find the product with the id ${id}`})
        }
        res.status(200).json(product)
        
    } catch (error) {
       console.log(error.message) 
       res.status(500).json({message : error.message})
    }
})

// update product in database
router.put('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product){
            return res.status(404).json({message: `cannot find the product with an ID ${id}`})
        }
        // display updatedProduct
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


// fetch all produts
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : error.message})
    }
})

//fetch single product
router.get('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

module.exports = router