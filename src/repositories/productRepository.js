import db from '../config/database.js';

export class ProductRepository {
    async findAll() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM products', (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    async create(productData) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO products(name, price) VALUES (?, ?)';
            db.run(sql, [productData.name, productData.price], function(err) {
                if (err) reject(err);
                resolve({ 
                    id: this.lastID, 
                    name: productData.name, 
                    price: productData.price 
                });
            });
        });
    }

    async update(id, productData) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
            db.run(sql, [productData.name, productData.price, id], function(err) {
                if (err) reject(err);
                resolve({ 
                    changes: this.changes, 
                    id, 
                    name: productData.name, 
                    price: productData.price 
                });
            });
        });
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
                if (err) reject(err);
                resolve({ changes: this.changes });
            });
        });
    }
}