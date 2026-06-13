import { createContext, useContext, useEffect, useState, useRef } from "react";

const TodoContext = createContext();

const STORAGE_TODOS = "fs_todos_v2";

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  // DnD state
  const dragIndex = useRef(null);

  // Load todos
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_TODOS)) || [];
    setTodos(savedTodos);
  }, []);

  // Save todos
  const saveTodos = (newTodos) => {
    setTodos(newTodos);
    localStorage.setItem(STORAGE_TODOS, JSON.stringify(newTodos));
  };

  // CRUD: Add
  const addTodo = (text) => {
    const t = {
      id: Date.now() + Math.random(),
      text,
      done: false,
      createdAt: new Date().toISOString(),
    };
    saveTodos([...todos, t]);
  };

  // CRUD: Update
  const updateTodo = (id, patch) => {
    saveTodos(todos.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  };

  // Delete
  const deleteTodo = (id) => {
    saveTodos(todos.filter((t) => t.id !== id));
  };

  // Toggle
  const toggleTodo = (id) => {
    updateTodo(id, { done: !todos.find((t) => t.id === id).done });
  };

  // Drag Start
  const onDragStart = (index) => {
    dragIndex.current = index;
  };

  // Drag Drop
  const onDrop = (index) => {
    const from = dragIndex.current;
    if (from === null) return;

    const copy = [...todos];
    const [moved] = copy.splice(from, 1);
    copy.splice(index, 0, moved);

    dragIndex.current = null;
    saveTodos(copy);
  };

  const value = {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    onDragStart,
    onDrop,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export const useTodos = () => useContext(TodoContext);