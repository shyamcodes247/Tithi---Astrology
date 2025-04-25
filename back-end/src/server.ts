import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import astrologyRoutes from './routes/astrologyRoutes';
import hinduCalendarRoutes from './routes/hinduCalendarRoutes';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/astrology', astrologyRoutes);
app.use('/api/hindu', hinduCalendarRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; 