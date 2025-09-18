import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import session from 'express-session';
import connectDB from './config/db';
import config from './config/config';
import authRoutes from './routes/auth';


const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // React dev server
  credentials: true                // needed for cookies/session
}));

app.use(express.json());
app.use(session({
  name: 'jobfinder.sid',
  secret: process.env.SESSION_SECRET || 'devsecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,       // true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// Routes
app.use('/api/auth', authRoutes);

// Test root
app.get('/', (_req, res) => res.send('Job Finder API running'));
app.post('/', (_req, res) => res.send('Job Finder API running'));

// Start server
mongoose.connect(config.mongoURI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(config.port, () =>
      console.log(`Server running on port ${config.port}`)
    );
  })
  .catch(err => console.error('❌ MongoDB connection failed:', err));
