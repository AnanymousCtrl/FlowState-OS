import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/Notes/Sidebar";
import NoteCard from "../components/notes/NoteCard";
import TodoItem from "./TodoItem";

const STORAGE_KEYS = {
  NOTES: "fs_notes_v2",
  TODOS: "fs_todos_v2",
  LAST_SYNC: "fs_last_sync_v2",
};

export default function NotesPage() {
  // GLOBAL DATA
  const [notes, setNotes] = useState([]);
  const [todos, setTodos] = useState([]);
  const [lastSync, setLastSync] = useState(null);

  // UI state
  const [noteForm, setNoteForm] = useState({
    title: "",
    content: "",
    tagsText: "",
  });
  const [editingNoteId, setEditingNoteId] = useState(null);

  const [todoText, setTodoText] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);

  // Filters
  const [activeTag, setActiveTag] = useState(null);
  const [query, setQuery] = useState("");

  const [showArchived, setShowArchived] = useState(false);

  // Drag state
  const dragIndex = useRef(null);

  // TAG LIST
  const tags = React.useMemo(() => {
    const map = {};
    notes.forEach((n) =>
      (n.tags || []).forEach(
        (t) => (map[t] = (map[t] || 0) + 1)
      )
    );
    return Object.keys(map).sort();
  }, [notes]);

  // Load saved data
  useEffect(() => {
    const ns = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTES)) || [];
    const ts = JSON.parse(localStorage.getItem(STORAGE_KEYS.TODOS)) || [];
    const ls = localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
    setNotes(ns);
    setTodos(ts);
    setLastSync(ls);
  }, []);

  // Auto-save
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(todos));
    const now = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, now);
  }, [notes, todos]);

  // ---------------- NOTES CRUD ----------------
  const createNote = (data) => {
    const newNote = {
      id: Date.now(),
      title: data.title,
      content: data.content,
      tags: data.tags || [],
      archived: false,
      createdAt: new Date().toISOString(),
    };
    setNotes((p) => [...p, newNote]);
  };

  const updateNote = (id, patch) => {
    setNotes((p) =>
      p.map((n) => (n.id === id ? { ...n, ...patch } : n))
    );
  };

  const deleteNote = (id) => {
    setNotes((p) => p.filter((n) => n.id !== id));
  };

  const archiveNote = (id) => updateNote(id, { archived: true });
  const restoreNote = (id) => updateNote(id, { archived: false });

  const startEditNote = (note) => {
    setEditingNoteId(note.id);
    setNoteForm({
      title: note.title,
      content: note.content,
      tagsText: (note.tags || []).join(", "),
    });
  };

  const submitNoteForm = (e) => {
    e.preventDefault();
    const tags = noteForm.tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (!noteForm.title.trim() && !noteForm.content.trim()) return;

    if (editingNoteId) {
      updateNote(editingNoteId, {
        title: noteForm.title,
        content: noteForm.content,
        tags,
      });
      setEditingNoteId(null);
    } else {
      createNote({
        title: noteForm.title,
        content: noteForm.content,
        tags,
      });
    }

    setNoteForm({ title: "", content: "", tagsText: "" });
  };

  // ---------------- TODOS CRUD ----------------
  const submitTodoForm = (e) => {
    e.preventDefault();
    if (!todoText.trim()) return;

    if (editingTodoId) {
      setTodos((p) =>
        p.map((t) =>
          t.id === editingTodoId ? { ...t, text: todoText } : t
        )
      );
      setEditingTodoId(null);
    } else {
      setTodos((p) => [
        ...p,
        { id: Date.now(), text: todoText, done: false },
      ]);
    }

    setTodoText("");
  };

  const toggleTodo = (id) => {
    setTodos((p) =>
      p.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((p) => p.filter((t) => t.id !== id));
  };

  const startEditTodo = (todo) => {
    setEditingTodoId(todo.id);
    setTodoText(todo.text);
  };

  // Drag & Drop
  const onDragStart = (idx) => (dragIndex.current = idx);

  const onDropAt = (idx) => {
    const from = dragIndex.current;
    if (from === null) return;

    const copy = [...todos];
    const [moved] = copy.splice(from, 1);
    copy.splice(idx, 0, moved);

    dragIndex.current = null;
    setTodos(copy);
  };

  // ---------------- FILTERS ----------------
  const filteredNotes = notes.filter((n) => {
    if (n.archived) return false;
    if (activeTag && !n.tags.includes(activeTag)) return false;

    if (!query.trim()) return true;

    const q = query.toLowerCase();
    return (
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q)
    );
  });

  const filteredArchived = notes.filter((n) => n.archived);

  const filteredTodos = todos.filter((t) =>
    t.text.toLowerCase().includes(query.toLowerCase())
  );

  // ---------------- RENDER ----------------
  return (
    <div className="min-h-screen bg-black text-white font-[Poppins] flex">

      {/* LEFT SIDEBAR */}
      <div className="w-64 border-r border-purple-800/20 bg-black/60 sticky top-0 h-screen p-6">
        <Sidebar
          tags={tags}
          activeTag={activeTag}
          onSelectTag={(t) => setActiveTag(t)}
          onClearTag={() => setActiveTag(null)}
          allNotesCount={notes.length}
          archivedCount={filteredArchived.length}
          lastSync={lastSync}
        />
      </div>

      {/* MAIN + TASKS */}
      <div className="flex w-full">

        {/* NOTES AREA (65%) */}
        <div className="w-[65%] h-screen overflow-y-auto p-6 custom-scroll">

          {/* Search */}
          <div className="flex items-center gap-3 mb-6">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes..."
              className="w-full px-4 py-3 rounded-xl bg-[#0b0b0b] border border-purple-700/30"
            />
            <button
              onClick={() => setQuery("")}
              className="px-4 py-3 bg-purple-700 rounded-xl"
            >
              Clear
            </button>
          </div>

          {/* NOTE FORM — Wider & Full Size */}
          <form
            onSubmit={submitNoteForm}
            className="bg-[#0b0b0b] p-5 rounded-2xl border border-purple-700/30 mb-8 w-full"
          >
            <h3 className="text-xl font-semibold mb-3">
              {editingNoteId ? "Edit Note" : "New Note"}
            </h3>

            <input
              placeholder="Title"
              value={noteForm.title}
              onChange={(e) =>
                setNoteForm({ ...noteForm, title: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 bg-black border border-purple-700/20 rounded"
            />

            <textarea
              placeholder="Write your note..."
              rows={4}
              value={noteForm.content}
              onChange={(e) =>
                setNoteForm({ ...noteForm, content: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 bg-black border border-purple-700/20 rounded resize-none"
            />

            <input
              placeholder="Tags (comma separated)"
              value={noteForm.tagsText}
              onChange={(e) =>
                setNoteForm({ ...noteForm, tagsText: e.target.value })
              }
              className="w-full mb-4 px-3 py-2 bg-black border border-purple-700/20 rounded"
            />

            <div className="flex gap-3">
              <button className="px-5 py-2 bg-purple-600 rounded">
                {editingNoteId ? "Update Note" : "Add Note"}
              </button>

              {editingNoteId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingNoteId(null);
                    setNoteForm({ title: "", content: "", tagsText: "" });
                  }}
                  className="px-5 py-2 bg-gray-700 rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* NOTES GRID */}
          <h3 className="text-2xl font-semibold mb-4">Notes</h3>

          {filteredNotes.length === 0 ? (
            <div className="text-gray-500">No notes found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
              {filteredNotes.map((n) => (
                <NoteCard
                  key={n.id}
                  note={n}
                  onEdit={() => startEditNote(n)}
                  onDelete={() => deleteNote(n.id)}
                  onArchive={() => archiveNote(n.id)}
                />
              ))}
            </div>
          )}

          {/* ARCHIVED SECTION */}
          <div className="mt-10">
            <button
              onClick={() => setShowArchived((s) => !s)}
              className="px-5 py-2 bg-purple-700 rounded-xl mb-4"
            >
              {showArchived ? "Hide Archived" : "View Archived Notes"}
            </button>

            {showArchived && (
              <>
                <h3 className="text-2xl font-semibold mb-4">
                  Archived Notes
                </h3>

                {filteredArchived.length === 0 ? (
                  <div className="text-gray-500">No archived notes</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                    {filteredArchived.map((n) => (
                      <NoteCard
                        key={n.id}
                        note={n}
                        isArchived
                        onEdit={() => startEditNote(n)}
                        onDelete={() => deleteNote(n.id)}
                        onRestore={() => restoreNote(n.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* TASKS PANEL (35%) */}
        <div className="w-[35%] h-screen overflow-y-auto border-l border-purple-800/20 bg-[#0c0c0c] p-6 custom-scroll">

          <h3 className="text-2xl font-semibold mb-6">Tasks</h3>

          {/* New Task */}
          <form onSubmit={submitTodoForm} className="flex gap-2 mb-6">
            <input
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              placeholder="Add new task..."
              className="flex-1 px-3 py-2 bg-black border border-purple-700/30 rounded"
            />
            <button
              className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-500 transition"
            >
              {editingTodoId ? "Update" : "Add"}
            </button>
          </form>

          {/* Task List */}
          <div className="space-y-3">
            {filteredTodos.length === 0 ? (
              <p className="text-gray-500">No tasks found</p>
            ) : (
              filteredTodos.map((t, i) => (
                <div
                  key={t.id}
                  draggable
                  onDragStart={() => onDragStart(i)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onDropAt(i)}
                >
                  <TodoItem
                    todo={t}
                    toggle={() => toggleTodo(t.id)}
                    onDelete={() => deleteTodo(t.id)}
                    onEdit={() => startEditTodo(t)}
                  />
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}


