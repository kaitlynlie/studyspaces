import React, { useState } from 'react';
import TodoList from './TodoList';

const TimerDialog = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');

  const handleTodoInputChange = (event) => {
    setTodoInput(event.target.value);
  };

  const addTodo = () => {
    if (todoInput.trim() !== '') {
      setTodos((prevTodos) => [...prevTodos, todoInput]);
      setTodoInput('');
    }
  };

  const removeTodo = (index) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
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

      <button onClick={addTodo}>
        Add Todo
      </button>

      <TodoList todos={todos} removeTodo={removeTodo} />
    </div>
  );
};

export default TimerDialog;