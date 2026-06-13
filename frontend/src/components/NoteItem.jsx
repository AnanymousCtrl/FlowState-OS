import React from "react";

export default function NoteItem({ id, title, content, onDelete, onEdit }) {
  return (
    <div className="bg-black border border-purple-700/40 rounded-xl p-4 shadow-md shadow-purple-900/30 hover:-translate-y-1 transition-all">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-300 mt-2 whitespace-pre-wrap">{content}</p>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm"
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}