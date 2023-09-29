const express = require('express')
const mongoose = require('mongoose')
const port = 3000

//convert data in json fomart
const app = express()
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('hello, we are here again!')
})

// create product in database
app.post('/products', async (req, res) =>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(err.message)
        res.status(500).json({message: error.message})
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
    console.log(err)
})