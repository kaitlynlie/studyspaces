import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
});

export const Todo = mongoose.model('Todo', TodoSchema);