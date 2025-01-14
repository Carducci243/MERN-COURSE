import express, { Router } from 'express';

import { createProducts, deleteProduct, getProoducts, updateProduct } from '../controller/products.controller.js';

const router =express.Router()
router.get("/", getProoducts);

router.post("/",createProducts);

router.put("/:id", updateProduct);

router.delete('/:id',deleteProduct );



export default router;