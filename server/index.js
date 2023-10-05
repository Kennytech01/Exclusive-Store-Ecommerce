require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const productRoute = require('./routes/productRoute')

// console.log(process.env)
const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

//convert data in json fomart
const app = express()
app.use(express.json())
app.use(cors())

//routes
app.use('/api', productRoute)

app.get('/api', (req,res)=>{
    res.send('hello, we are here again!')
})

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log('connected to savemoreAPI')
    app.listen(PORT,()=>{
        console.log(`server is running! on port ${PORT}`)
    })
})
.catch((err)=> {
    console.log(err.message)
})