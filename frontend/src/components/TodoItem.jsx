import React from "react";
import { CheckCircle, Circle, Trash2, Edit3 } from "lucide-react";

export default function TodoItem({ todo, toggle, onDelete, onEdit }) {
  return (
    <div className="flex items-center justify-between bg-[#0f0f0f] border border-purple-700/30 p-3 rounded-xl">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={toggle}
      >
        {todo.done ? (
          <CheckCircle size={22} className="text-purple-500" />
        ) : (
          <Circle size={22} className="text-gray-500" />
        )}

        <span
          className={`${
            todo.done ? "line-through text-gray-500" : "text-gray-200"
          }`}
        >
          {todo.text}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="p-1 hover:bg-purple-700/40 rounded transition"
        >
          <Edit3 size={18} />
        </button>

        <button
          onClick={onDelete}
          className="p-1 hover:bg-red-600/40 rounded transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
