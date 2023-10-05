const Product = require('../models/productModel')

//create product 
const createProduct = async (req, res) =>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

//deleteProduct
const deleteProduct =  async (req, res) => {
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
}

// updateProduct
const updateProduct =  async (req, res) => {
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
}

//getAllProducts
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : error.message})
    }
}

//singleProduct
const singleProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}


module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getProducts,
    singleProduct
}