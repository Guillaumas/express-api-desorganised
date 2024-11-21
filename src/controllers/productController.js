import db from '../config/database.js';

export const getAllProducts = (req, res, next) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) return next(err);
        res.send(rows);
    });
};

export const createProduct = (req, res, next) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).send('Name and price are required');
    }

    const sql = 'INSERT INTO products(name, price) VALUES (?, ?)';
    db.run(sql, [name, price], function(err) {
        if (err) return next(err);
        res.status(201).send({ id: this.lastID, name, price });
    });
};

export const updateProduct = (req, res, next) => {
    const { id } = req.params;
    const { name, price } = req.body;
    
    if (!name || !price) {
        return res.status(400).send('Name and price are required');
    }

    const sql = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
    db.run(sql, [name, price, id], function(err) {
        if (err) return next(err);
        if (this.changes === 0) return res.status(404).send('Product not found');
        res.status(200).send({ id, name, price });
    });
};

export const deleteProduct = (req, res, next) => {
    const { id } = req.params;
    db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
        if (err) return next(err);
        if (this.changes === 0) return res.status(404).send('Product not found');
        res.status(204).send();
    });
};
