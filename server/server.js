import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Define your '/api/tasks' route
app.use('/api/tasks', (req, res) => {
  res.json({ message: 'Tasks API endpoint' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://hanoted966:fUIzc8OxbRdR4XEA@cluster0.dq7jj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to MERN Task Manager API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
