import React from "react";
import { Archive, Undo2, Edit3, Trash2, Tag } from "lucide-react";

export default function NoteCard({
  note,
  isArchived,
  onEdit,
  onDelete,
  onArchive,
  onRestore,
}) {
  return (
    <div className="bg-[#0f0f0f] border border-purple-700/30 p-5 rounded-xl shadow-purple-900/20 shadow hover:scale-[1.01] transition">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{note.title}</h3>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2">
          {isArchived ? (
            <button
              onClick={onRestore}
              className="p-1 hover:bg-purple-700/40 rounded transition"
            >
              <Undo2 size={18} />
            </button>
          ) : (
            <button
              onClick={onArchive}
              className="p-1 hover:bg-purple-700/40 rounded transition"
            >
              <Archive size={18} />
            </button>
          )}

          <button
            onClick={onEdit}
            className="p-1 hover:bg-purple-700/40 rounded transition"
          >
            <Edit3 size={18} />
          </button>

          <button
            onClick={onDelete}
            className="p-1 hover:bg-red-500/40 rounded transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <p className="text-gray-300 mt-3 whitespace-pre-wrap">{note.content}</p>

      {/* TAGS */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex gap-2 mt-4 flex-wrap">
          {note.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-purple-900/40 border border-purple-700/50 rounded-lg text-xs text-purple-300 flex items-center gap-1"
            >
              <Tag size={12} /> {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}