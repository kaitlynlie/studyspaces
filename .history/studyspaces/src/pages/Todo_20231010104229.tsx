import { useState, useEffect } from 'react';
import axios from 'axios';
import { TodoList } from '.';


const TodoDialog = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');

  // fetches the todos from the API when the component mounts
  // GET request
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/todos');
        setTodos(response.data); // Assign fetched data to the todos state
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
  
    fetchTodos();
  }, []);

  // update the `todoInput` state variable with the new value
  const handleTodoInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(event.target.value);
  };

  // POST request 
  const addTodo = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/todos', { todo: todoInput });
      setTodos(response.data);
      setTodoInput('');
      console.log(todos); // check if the new item is included in the todos state
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // DELETE request
  const removeTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id)); // update todos state by filtering out the removed item
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