import { NotesProvider } from "./context/NotesContext";
import { TodoProvider } from "./context/TodoContext";

import NotesPage from "./components/NotesPage.jsx"; // or correct path

export default function Note() {
  return (
    <NotesProvider>
      <TodoProvider>
        <NotesPage />
      </TodoProvider>
    </NotesProvider>
  );
}