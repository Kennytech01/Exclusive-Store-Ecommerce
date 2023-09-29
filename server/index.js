const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const port = 3000
const cors = require('cors')



//convert data in json fomart
const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req,res)=>{
    res.send('hello, we are here again!')
})

// create product in database
app.post('/product', async (req, res) =>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)

    } catch (error) {
        console.log(err.message)
        res.status(500).json({message: error.message})
    }
})

// update product in database
// app.put('/product/:id', async (req, res) => {
//     try {
//         const {id} = req.params;
//         const product = await Product.findByIdAndUpdate(id, req.body)
//         if(!product){
//             return res.status(404).json({message: `cannot find the product with an ID ${id}`})
//         }
//         // display updatedProduct
//         const updatedProduct = await Product.findById(id)
//         res.status(200).json(updatedProduct)
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).json({message: error.message})
//     }
// })

// fetch all produts
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : error.message})
    }
})

mongoose.connect('mongodb+srv://admin:Kennytech@kennytechapi.jjsjs2w.mongodb.net/savemoreAPI?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to savemoreAPI')
    app.listen(port,()=>{
        console.log('server is running!')
    })
})
.catch((err)=> {
    console.log(err.message)
})