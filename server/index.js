import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import routes from './routes/index.js';

dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Define allowed origins
const allowedOrigins = ['http://localhost:5173'];

// CORS configuration
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Request blocked by CORS policy.'));
        }
    },
    credentials: true, // Enable credentials (cookies, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Serve static files for uploads
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));

// Centralized routes
app.use('/api', routes);

// Home route
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// 404 Route Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


