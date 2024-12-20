import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://hanoted966:fUIzc8OxbRdR4XEA@cluster0.dq7jj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Task model
const taskSchema = new mongoose.Schema({ title: String });
const Task = mongoose.model('Task', taskSchema);

// Routes

// GET /api/tasks: Fetch all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/tasks: Add a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task({ title: req.body.title });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/tasks/:id: Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204).send(); // No Content
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the MERN Task Manager API' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
