import React from "react";

export default function Sidebar({
  tags = [],
  activeTag = null,
  onSelectTag,
  onClearTag,
  onToggleSidebar,
  allNotesCount = 0,
  archivedCount = 0,
  lastSync = null,
}) {
  return (
    <div className="text-sm text-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">FlowState OS</h2>
        <button
          onClick={onToggleSidebar}
          className="px-2 py-1 bg-purple-700 rounded"
        >
          ≡
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6">
        <div className="text-xs text-gray-400">Notes</div>
        <div className="text-lg font-medium">{allNotesCount}</div>

        <div className="mt-3 text-xs text-gray-400">Archived</div>
        <div>{archivedCount}</div>
      </div>

      {/* Tags */}
      <div className="mb-6">
        <div className="text-xs text-gray-400">Tags</div>

        <div className="mt-2 flex flex-col gap-2">
          {/* ALL BUTTON */}
          <button
            onClick={onClearTag}
            className={`text-left px-2 py-1 rounded ${
              !activeTag ? "bg-purple-600" : "hover:bg-purple-700/40"
            }`}
          >
            All
          </button>

          {/* If no tags */}
          {tags.length === 0 && (
            <div className="text-gray-500 text-xs">No tags yet</div>
          )}

          {/* TAG LIST */}
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => onSelectTag(t)}
              className={`text-left px-2 py-1 rounded ${
                activeTag === t
                  ? "bg-purple-600"
                  : "hover:bg-purple-700/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto text-xs text-gray-400">
        <div>
          Last sync:{" "}
          {lastSync ? new Date(lastSync).toLocaleString() : "Never"}
        </div>
      </div>
    </div>
  );
}
