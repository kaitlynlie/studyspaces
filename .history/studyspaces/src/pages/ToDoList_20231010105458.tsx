const TodoList = ({ todos, removeTodo }) => {
  // @ts-ignore
  return (
    <ul>
      {todos.map((todo) => {
        if (typeof todo !== 'object' || !('_id' in todo) || !('todo' in todo)) {
          return null; // skip rendering invalid todos
        }

        return (
          <li key={todo._id}>
            {todo.todo}
            <button onClick={() => removeTodo(todo._id)} style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#607D8B',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              marginLeft: '10px',
              marginBottom: '10px'
            }}>Remove</button>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;