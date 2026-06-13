import { createContext, useContext, useEffect, useState } from "react";

const NotesContext = createContext();

const STORAGE_NOTES = "fs_notes_v2";
const STORAGE_SYNC = "fs_last_sync_v2";

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [lastSync, setLastSync] = useState(null);

  // Load from storage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem(STORAGE_NOTES)) || [];
    const savedSync = localStorage.getItem(STORAGE_SYNC) || null;

    setNotes(savedNotes);
    setLastSync(savedSync);
  }, []);

  const saveNotes = (newNotes) => {
    setNotes(newNotes);

    localStorage.setItem(STORAGE_NOTES, JSON.stringify(newNotes));

    const now = new Date().toISOString();
    localStorage.setItem(STORAGE_SYNC, now);
    setLastSync(now);
  };

  // CRUD: Create
  const createNote = ({ title, content, tags = [] }) => {
    const newNote = {
      id: Date.now() + Math.random(),
      title,
      content,
      tags,
      archived: false,
      createdAt: new Date().toISOString(),
    };
    saveNotes([...notes, newNote]);
  };

  // CRUD: Update
  const updateNote = (id, patch) => {
    saveNotes(notes.map((n) => (n.id === id ? { ...n, ...patch } : n)));
  };

  // CRUD: Delete
  const deleteNote = (id) => {
    saveNotes(notes.filter((n) => n.id !== id));
  };

  // Archive
  const archiveNote = (id) => updateNote(id, { archived: true });

  // Restore
  const restoreNote = (id) => updateNote(id, { archived: false });

  const value = {
    notes,
    lastSync,
    createNote,
    updateNote,
    deleteNote,
    archiveNote,
    restoreNote,
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export const useNotes = () => useContext(NotesContext);