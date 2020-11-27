import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js'
import Product from '../models/productModel.js'
import {  isAuth } from '../util.js'

const productRouter = express.Router()

productRouter.get('/', expressAsyncHandler(async (req,res)=>{
    const products = await Product.find({})
    res.send(products)
}))

productRouter.get('/findastronomy', expressAsyncHandler(async(req,res)=>{
    const products = await Product.find({category: 'Astronomy'})
    res.send(products)
    // const book = await Product.find({})
    // res.send({book})
    
}))

productRouter.get('/findscience', expressAsyncHandler(async(req,res)=>{
    const products = await Product.find({category: 'Science'})
    res.send(products)
    // const book = await Product.find({})
    // res.send({book})
    
}))

productRouter.get('/findhorror', expressAsyncHandler(async(req,res)=>{
    const products = await Product.find({category: 'Horror'})
    res.send(products)
    // const book = await Product.find({})
    // res.send({book})
    
}))

productRouter.get('/findbiography', expressAsyncHandler(async(req,res)=>{
    const products = await Product.find({category: 'Biography'})
    res.send(products)
    // const book = await Product.find({})
    // res.send({book})
    
}))

productRouter.get('/finddetective', expressAsyncHandler(async(req,res)=>{
    const products = await Product.find({category: 'Detective'})
    res.send(products)
    // const book = await Product.find({})
    // res.send({book})
    
}))

productRouter.get('/findfiction', expressAsyncHandler(async(req,res)=>{
    const products = await Product.find({category: 'Fiction'})
    res.send(products)
    // const book = await Product.find({})
    // res.send({book})
    
}))

productRouter.get('/findSelfImprovement', expressAsyncHandler(async(req,res)=>{
    const products = await Product.find({category: 'Self Improvement'})
    res.send(products)
    // const book = await Product.find({})
    // res.send({book})
    
}))

productRouter.get('/seed', expressAsyncHandler(async(req, res)=>{
    const createdProducts = await Product.insertMany(data.products)
    res.send({createdProducts})
}))

productRouter.get('/:id', expressAsyncHandler(async (req,res)=>{
    const product = await Product.findById(req.params.id) 
    if(product){
        res.send(product)
    }
    else{
        res.status(404).send({message: 'Product Not Found '})
    }
}))

//For seller account

productRouter.post('/', isAuth,async(req,res)=>{
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        url: req.body.url,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
    })
    const newProduct = await product.save()
    if(newProduct){
        return res.status(201).send({message: 'New Product Created', data: newProduct})
    }
    return res.status(500).send({message: 'Error in creating product'})
})

productRouter.put('/:id', isAuth, async(req,res)=>{
    const productId = req.params.id
    const product = await Product.findById(productId)
    if(product){
        product.name = req.body.name
        product.price = req.body.price
        product.url = req.body.url
        product.brand = req.body.brand
        product.category = req.body.category
        product.countInStock = req.body.countInStock
        product.description = req.body.description

        const updatedProduct = await product.save()
        if(updatedProduct){
            return res.status(200).send({message: 'Product Updated', data: updatedProduct})
        }
       
    }
    return res.status(500).send({message: 'Error in updating product'})
    
})

productRouter.delete("/:id", async(req,res)=>{
    const deletedProduct = await Product.findById(req.params.id)
    if(deletedProduct){
        await deletedProduct.remove()
        res.send({message:"Product Deleted"})
    }else{
        res.send("Error in Deletion")
    }
    
})



export default productRouter