import React, { useState, useEffect } from 'react';
import { TodoList } from '.';
import axios from 'axios';

const TodoDialog = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');

  useEffect(() => {
    // Fetch todos from the server on component mount
    const fetchTodos = async () => {
      try {
        const response = await axios.get('/api/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    // Update todos on the server whenever todos state changes
    const updateTodos = async () => {
      try {
        await axios.post('/api/todos', { todo: todos });
      } catch (error) {
        console.error('Error updating todos:', error);
      }
    };

    updateTodos();
  }, [todos]);

  const handleTodoInputChange = (event) => {
    setTodoInput(event.target.value);
  };

  const addTodo = () => {
    if (todoInput.trim() !== '') {
      setTodos((prevTodos) => [...prevTodos, todoInput]);
      setTodoInput('');
    }
  };

  const removeTodo = async (index) => {
    try {
      await axios.delete(`/api/todos/${index}`);
      setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  };

  return (
    <div style={{ padding: '10px' }}>
      <h2 style={{ textAlign: 'center', marginTop: '-10px' }}>Todo List</h2>

      <input
        type="text"
        value={todoInput}
        onChange={handleTodoInputChange}
        placeholder="Enter a todo item"
        style={{
          marginTop: '20px',
          marginBottom: '10px',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          width: '200px',
        }}
      />

      <button onClick={addTodo} 
      style={{
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#8D6E63',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
    }}>
        Add Todo
      </button>

      <TodoList todos={todos} removeTodo={removeTodo} />
    </div>
  );
};

export default TodoDialog;