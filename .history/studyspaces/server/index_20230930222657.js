import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { Todo } from '..server/mongodb/models/todoModel.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Unable to fetch todos' });
  }
});

// Add a new todo
app.post('/api/todos', async (req, res) => {
  try {
    const { todo } = req.body;
    const newTodo = new Todo({ todo });
    await newTodo.save();
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ error: 'Unable to add todo' });
  }
});

// Remove a todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndRemove(id);
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error('Error removing todo:', error);
    res.status(500).json({ error: 'Unable to remove todo' });
  }
});

const port = 8080; // Adjust the port as needed

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});