import React from 'react';

const TodoList = ({ todos, removeTodo }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <div key={index} style={{ marginTop: '10px' }}>
          {todo}
          <button onClick={() => removeTodo(index)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;