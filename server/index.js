import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import cookieparser from 'cookie-parser';
import  connectDB  from "./config/db.js";
connectDB();
// Import the centralized routes
import routes from './routes/index.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));
app.use(cookieparser());
// Use the centralized routes from routes/index.js
app.use('/api', routes);
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});


app.get("/", (req, res, next) => {
    res.json({ message: "hello world" });
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
