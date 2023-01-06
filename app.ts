import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './src/routes/auth.route';
import walletRouter from './src/routes/wallet.route';
import transferRouter from './src//routes/transfer.route';
import errorMiddleware from './src/middlewares/error.middleware';

const app = express();

// Enable CORS
app.use(cors());

// Log requests to console
app.use(morgan('dev'));

// Parse request body as JSON
app.use(express.json());

// Load routes
app.use('/api/auth', authRouter);
app.use('/api/wallet', walletRouter);
app.use('/api/transfer', transferRouter);

// Error handling middleware
app.use(errorMiddleware);

export default app;
