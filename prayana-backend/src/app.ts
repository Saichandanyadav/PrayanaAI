import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import tripRoutes from './routes/tripRoutes';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// Main App Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

export default app;