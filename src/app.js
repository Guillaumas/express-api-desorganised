import express from 'express';
import productRoutes from './routes/productRoutes.js';
import { errorHandler } from './interceptors/errorHandler.js';

const app = express();

app.use(express.json());

// Add root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Products API',
        endpoints: {
            products: {
                GET: '/products',
                POST: '/products',
                PUT: '/products/:id',
                DELETE: '/products/:id'
            }
        }
    });
});

app.use('/products', productRoutes);
app.use(errorHandler);

export default app;
