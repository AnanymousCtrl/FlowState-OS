import React from "react";
import NoteItem from "./NoteItem";

export default function NotesList({ notes, deleteNote }) {
  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      {notes.length === 0 && (
        <p className="text-gray-500">No notes yet. Add one!</p>
      )}

      {notes.map((note) => (
        <NoteItem key={note.id} note={note} deleteNote={deleteNote} />
      ))}
    </div>
  );
}
