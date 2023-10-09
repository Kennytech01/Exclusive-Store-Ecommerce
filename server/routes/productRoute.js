const express = require('express')
const { 
    createProduct, 
    deleteProduct, 
    updateProduct, 
    getProducts, 
    singleProduct } = require('../controller/productController')
const router = express.Router()

// create product in database
router.post('/', createProduct);

//delete product
router.delete('/:id', deleteProduct);

// update product in database
router.put('/:id', updateProduct);

// fetch all produts
router.get('/', getProducts);

//fetch single product
router.get('/:id', singleProduct);

module.exports = router