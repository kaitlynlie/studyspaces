import React from 'react';

const TodoList = ({ todos, removeTodo }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <div key={index} style={{ marginTop: '10px' }}>
          {todo}
          <button onClick={() => removeTodo(index)}   style={{
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#607D8B',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  }}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;