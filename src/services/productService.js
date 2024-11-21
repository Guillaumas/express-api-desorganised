
import db from '../config/database.js';

export const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM products', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

export const createProduct = (name, price) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO products(name, price) VALUES (?, ?)';
        db.run(sql, [name, price], function(err) {
            if (err) reject(err);
            resolve({ id: this.lastID, name, price });
        });
    });
};

export const updateProduct = (id, name, price) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
        db.run(sql, [name, price, id], function(err) {
            if (err) reject(err);
            resolve({ changes: this.changes, id, name, price });
        });
    });
};

export const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
            if (err) reject(err);
            resolve({ changes: this.changes });
        });
    });
};