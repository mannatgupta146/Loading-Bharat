import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRoutes from './routes/api.routes.js';

const app = express();

// Allow requests from local dev and the deployed Vercel frontend
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL, // e.g. https://loading-bharat.vercel.app
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. Render health checks)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(morgan('dev'));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Bharat Suffering API is running. Status: PENDING.');
});

export default app;
