import express from 'express'
import mongoose from 'mongoose'
// import data from './data.js'
import productRouter from './routers/productRouter.js'
import userRouter from './routers/userRouter.js'
import dotenv from 'dotenv'
import orderRouter from './routers/orderRouter.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
const port = process.env.PORT||6000


app.get('/', (req,res)=>{
    res.send('Server is ready')
})

// app.get('/api/products', (req,res)=>{
//     res.send(data.products)
// })

// app.get('/api/products/:id', (req,res)=>{
//     const product = data.products.find(x=>x._id === req.params.id)
//     if(product){
//         res.send(product)
//     }else{
//         res.status(404).send({message: 'Product not Found'})
//     }
// })

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)  
app.use('/api/orders', orderRouter)
app.use('/api/config/paypal', (req, res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.use((err, req,res, next)=>{
    res.status(500).send({message: err.message})
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})