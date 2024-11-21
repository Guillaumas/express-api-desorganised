import { ProductRepository } from '../repositories/productRepository.js';
import { ProductDto } from '../dto/productDto.js';

class ProductService {
    constructor() {
        this.repository = new ProductRepository();
        this.MINIMAL_NAME_LENGTH = 5;
        this.MINIMAL_PRICE = 4;
    }

    async getAllProducts() {
        const products = await this.repository.findAll();
        return products.map(product => ProductDto.fromEntity(product));
    }

    async createProduct(productData) {
        this.validateProduct(productData);
        const product = await this.repository.create(productData);
        return ProductDto.fromEntity(product);
    }

    async updateProduct(id, productData) {
        this.validateProduct(productData);
        const result = await this.repository.update(id, productData);
        if (result.changes === 0) {
            throw new Error('Product not found');
        }
        return result;
    }

    async deleteProduct(id) {
        return await this.repository.delete(id);
    }

    validateProduct(data) {
        const { name, price } = data;
        if (!name || !price) {
            throw new Error('Name and price are required');
        }
        if (name.length < this.MINIMAL_NAME_LENGTH) {
            throw new Error('Name length must be higher than 5 characters');
        }
        if (price < this.MINIMAL_PRICE) {
            throw new Error('Minimal product price is 4 euros');
        }
    }
}

export default new ProductService();