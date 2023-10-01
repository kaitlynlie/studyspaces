import React, { useState } from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, Button, TextField } from '@material-ui/core';
import { RiCloseLine } from 'react-icons/ri';

const TodoDialog = ({ open, onClose }) => {
  const [todos, setTodos] = useState([]); // State to store the todo list
  const [todoText, setTodoText] = useState(''); // State to manage the input field

  const handleAddTodo = () => {
    if (todoText.trim() !== '') {
      setTodos([...todos, todoText.trim()]); // Add the new todo to the list
      setTodoText(''); // Clear the input field
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1); // Remove the todo at the specified index
    setTodos(updatedTodos);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogActions>
        <RiCloseLine color="#000" size={27} onClick={onClose} />
      </DialogActions>
      <DialogTitle>Todo</DialogTitle>
      <DialogContent>
        {/* Render the todo list */}
        {todos.map((todo, index) => (
          <div key={index}>
            <span>{todo}</span>
            <Button onClick={() => handleDeleteTodo(index)}>Delete</Button>
          </div>
        ))}

        {/* Input field to add new todos */}
        <TextField
          label="Add Todo"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          variant="outlined"
          margin="dense"
          fullWidth
        />
        <Button onClick={handleAddTodo} variant="contained" color="primary">
          Add
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default TodoDialog;