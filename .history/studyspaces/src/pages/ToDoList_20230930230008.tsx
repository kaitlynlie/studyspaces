import React from 'react';

const TodoList = ({ todos, removeTodo }) => {
  return (
    <ul>
      {todos.map((todo) => {
        if (typeof todo !== 'object' || !('_id' in todo) || !('todo' in todo)) {
          return null; // Skip rendering invalid todos
        }

        return (
          <li key={todo._id}>
            {todo.todo}
            <button onClick={() => removeTodo(todo._id)}>Remove</button>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;