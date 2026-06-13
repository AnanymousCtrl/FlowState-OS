import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      {todos.length === 0 && (
        <p className="text-gray-500">No tasks yet. Add your first task!</p>
      )}

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}