import mongoose from "mongoose"
import Product from "../models/products.model.js"

export const getProoducts= async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({ sucess: true, data: products })
    } catch (error) {
        console.error('error in fetching products:', error.message)
        res.status(500).json({ success: false, message: 'server error' })
    }
}

export const createProducts= async (req, res) => {
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
}

export const updateProduct=async (req, res) => {
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
};

export const deleteProduct= async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: 'false', mesage: 'Invalid Product Id' })
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ sucess: true, message: "product Deleted" })
        console.log('error in deleting product')
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })
    }
};