import productService from '../services/productService.js';
import { asyncHandler } from '../interceptors/asyncHandler.js';

export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await productService.getAllProducts();
    res.send(products);
});

export const createProduct = asyncHandler(async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const result = await productService.updateProduct(id, req.body);
        res.status(200).send(result);
    } catch (error) {
        if (error.message === 'Product not found') {
            res.status(404).send(error.message);
        } else {
            res.status(400).send(error.message);
        }
    }
});

export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await productService.deleteProduct(id);
    if (result.changes === 0) {
        return res.status(404).send('Product not found');
    }
    res.status(204).send();
});
