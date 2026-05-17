import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRoutes from './routes/api.routes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Bharat Suffering API is running. Status: PENDING.');
});

export default app;
