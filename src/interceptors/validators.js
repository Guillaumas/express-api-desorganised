
export const validateProduct = (req, res, next) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).send('Name and price are required');
    }
    next();
};