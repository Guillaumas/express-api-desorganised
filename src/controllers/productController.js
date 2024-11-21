import * as productService from '../services/productService.js';
import { asyncHandler } from '../interceptors/asyncHandler.js';

export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await productService.getAllProducts();
    res.send(products);
});

export const createProduct = asyncHandler(async (req, res) => {
    const { name, price } = req.body;
    const product = await productService.createProduct(name, price);
    res.status(201).send(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const result = await productService.updateProduct(id, name, price);
    
    if (result.changes === 0) {
        return res.status(404).send('Product not found');
    }
    res.status(200).send(result);
});

export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await productService.deleteProduct(id);
    
    if (result.changes === 0) {
        return res.status(404).send('Product not found');
    }
    res.status(204).send();
});
