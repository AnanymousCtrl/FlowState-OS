
import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { IndexeddbPersistence } from "y-indexeddb";
import { MonacoBinding } from "y-monaco";

// Helper to generate random color (consistent length)
const randColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");

// get initials from name
const initialsFromName = (name = "") => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

export default function CodeEditor({ roomId, displayName }) {
  const ydocRef = useRef(null);
  const providerRef = useRef(null);
  const modelRef = useRef(null);
  const editorRef = useRef(null);
  const [clients, setClients] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ydoc = new Y.Doc();
    ydocRef.current = ydoc;

    const persistence = new IndexeddbPersistence(`ydoc-${roomId}`, ydoc);
    persistence.on("synced", () => {
      // optional sync indicator
    });

    // Change to your production wss url when deploying
    const wsUrl = `ws://localhost:1234`;
    const provider = new WebsocketProvider(wsUrl, roomId, ydoc, { connect: true });

    providerRef.current = provider;
    provider.awareness.setLocalStateField("user", {
      name: displayName,
      color: randColor(),
    });

    const handleStatus = ({ status }) => setConnected(status === "connected");
    provider.on("status", handleStatus);

    const awarenessChangeHandler = () => {
      const states = [];
      provider.awareness.getStates().forEach((state, clientId) => {
        if (state && state.user) states.push({ clientId, ...state.user });
      });
      setClients(states);
    };
    provider.awareness.on("change", awarenessChangeHandler);
    awarenessChangeHandler();

    return () => {
      provider.awareness.off("change", awarenessChangeHandler);
      provider.off("status", handleStatus);
      provider.destroy();
      ydoc.destroy();
    };
  }, [roomId, displayName]);

  function handleEditorDidMount(monacoEditor, monaco) {
    editorRef.current = monacoEditor;

    const uri = monaco.Uri.parse(`inmemory://${roomId}/file.js`);
    let model = monaco.editor.getModel(uri);
    if (!model) {
      model = monaco.editor.createModel("// FlowstateOS Collaborative file\n", "javascript", uri);
    }
    modelRef.current = model;
    monacoEditor.setModel(model);

    const ydoc = ydocRef.current;
    const provider = providerRef.current;
    if (!ydoc || !provider) {
      console.warn("ydoc/provider not ready");
      return;
    }

    const ytext = ydoc.getText("codetext");
    const binding = new MonacoBinding(ytext, model, new Set([monacoEditor]), provider.awareness);
    model.__yBinding = binding;
  }

  const copyRoomLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}?room=${encodeURIComponent(roomId)}`;
    try {
      await navigator.clipboard.writeText(url);
      alert("Room link copied to clipboard");
    } catch {
      alert(url);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#05040a] text-slate-100">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-white/6 bg-linear-to-b from-black/50 to-transparent backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-lg bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="font-semibold text-white text-sm">FS</span>
          </div>
          <div>
            <div className="text-lg font-semibold">FlowstateOS — Code Editor</div>
            <div className="text-xs text-slate-400">Collaborative editing powered by Yjs</div>
          </div>
        </div>

        <div className="ml-8 flex items-center gap-3">
          <div className="text-xs text-slate-400">You</div>
          <div className="flex items-center gap-2 bg-[#0d0c11] border border-white/6 px-3 py-1.5 rounded-md">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold"
              style={{ backgroundColor: randColor() }}
            >
              {initialsFromName(displayName)}
            </div>
            <div className="text-sm">{displayName}</div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <span className={`h-2.5 w-2.5 rounded-full ${connected ? "bg-green-400" : "bg-red-400"}`} />
            <span>{connected ? "Connected" : "Disconnected"}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#0d0c11] border border-white/6">
            <div className="text-sm text-slate-300">{clients.length} online</div>
            <button
              onClick={copyRoomLink}
              className="text-sm px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 transition text-white"
            >
              Copy link
            </button>
          </div>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex h-full overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 min-w-60 border-r border-white/6 p-5 bg-linear-to-b from-[#07060b] to-[#05040a]">
          <h3 className="text-sm text-slate-300 font-medium mb-4">Collaborators</h3>

          <div className="flex flex-col gap-3 max-h-[calc(100vh-200px)] overflow-auto pr-1">
            {clients.length === 0 && (
              <div className="text-sm text-slate-500">No collaborators yet — share link to invite.</div>
            )}

            {clients.map((c) => (
              <div
                key={c.clientId}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/3 transition"
              >
                <div
                  className="h-11 w-11 rounded-full flex items-center justify-center text-base font-semibold text-black"
                  style={{ backgroundColor: c.color || "#7c7c7c" }}
                >
                  {initialsFromName(c.name)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{c.name}</div>
                  <div className="text-xs text-slate-400">Client: <span className="font-mono text-xs text-indigo-200">{c.clientId}</span></div>
                </div>

                <div className="text-sm text-slate-200">●</div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-sm text-slate-400">
            Room ID
            <div className="mt-2 font-mono text-sm text-indigo-200 break-all bg-[#0c0b10] px-3 py-2 rounded-md border border-white/6">
              {roomId}
            </div>
          </div>
        </aside>

        {/* Editor */}
        <div className="flex-1 relative p-4">
          <div className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl border border-white/5">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              defaultValue={`// FlowstateOS Collaborative file\n// Start typing...`}
              onMount={handleEditorDidMount}
              options={{
                automaticLayout: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 16, // increased font size
                lineHeight: 22,
                glyphMargin: true,
                folding: true,
                wordWrap: "on",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
