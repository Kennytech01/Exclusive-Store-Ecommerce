import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import errorMiddleware from './middleware/errorMiddleware.js'
import productRoute from './routes/productRoute.js'
import authRoute from './routes/authRoute.js'


// console.log(process.env)
const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL
const FRONTEND = process.env.FRONTEND

const corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  
//convert data in json fomart
const app = express()
app.use(express.json())
app.use(cors(corsOptions))

//routes
app.use('/api/products', productRoute)
app.use('/api/auth', authRoute)
app.use(errorMiddleware)



// app.get('/', (req,res)=>{
//     // throw new Error('fakeError')
//     res.send('hello, we are here again!')
// })



// connect to database
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