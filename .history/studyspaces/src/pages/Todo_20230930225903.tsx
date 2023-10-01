import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './TodoList';

const TodoDialog = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');

  useEffect(() => {
    // Fetch todos from the server on component mount
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleTodoInputChange = (event) => {
    setTodoInput(event.target.value);
  };

  const addTodo = async () => {
    try {
      await axios.post('http://localhost:8080/api/todos', { todo: todoInput });
      setTodoInput('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/todos/${id}`);
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

      <button
        onClick={addTodo}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#8D6E63',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Add Todo
      </button>

      <TodoList todos={todos} removeTodo={removeTodo} />
    </div>
  );
};

export default TodoDialog;