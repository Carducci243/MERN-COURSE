import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import Product from './models/products.model.js';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

// this a middleware its a function that  runs before sending the response to the client
app.use(express.json());//allows us to accept json data in the body 
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({ sucess: true, data: products })
    } catch (error) {
        console.error('error in fetching products:', error.message)
        res.status(500).json({ success: false, message: 'server error' })
    }
})
app.post("/api/products", async (req, res) => {
    const product = req.body; // user will send this data
    if (!product.name || !product.image || !product.price) {
        return res.status(400).json({
            success: false, message: 'Please fill all the fields'
        })
    }
    const newProduct = new Product(product)
    try {
        await newProduct.save();
        res.status(201).json({
            success: true,
            data: newProduct,
        })
    }
    catch (error) {
        console.error('Error creating Product', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }
})
app.put("/api/products/:id", async (req, res) => {
    const { id } = req.params;

    const product = req.body;
    // 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: 'false', mesage: 'Invalid Product Id' })
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })
        res.status(200).json({ success: true, data: updatedProduct })
    } catch (error) {
        res.status(500).json({ success: true, message: 'Server error' })
    }
})
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ sucess: true, message: "product Deleted" })
        console.log('error in deleting product')
    } catch (error) {
        res.status(404).json({ success: false, message: "Product not found" })
    }
})
console.log(process.env.MONGO_URI);

app.listen(5000, () => {
    connectDB();
    console.log('Server started at http://localhost:5000')
});
