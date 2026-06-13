import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

// Helper class for consistent button styling
const ToolbarButton = ({ isActive, onClick, title, children }) => {
  const activeClasses = "bg-indigo-100 text-indigo-700 ring-2 ring-indigo-400/50";
  const inactiveClasses = "bg-white text-gray-700 hover:bg-gray-100";

  return (
    <button
      onClick={onClick}
      className={`
        p-2 rounded-lg transition-colors duration-100 ease-in-out
        ${isActive ? activeClasses : inactiveClasses}
        focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2
      `}
      title={title}
    >
      {children}
    </button>
  );
};

export default function RichEditor() {
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: "Write something amazing..." }),
    ],
    content: "",
    autofocus: true,
  });

  useEffect(() => {
    if (!editor) return;
    // cleanup on unmount
    return () => editor.destroy();
  }, [editor]);

  if (!editor) return <div className="p-6 text-lg text-gray-600">Loading editor…</div>;

  const toggleLink = () => {
    if (editor.isActive("link")) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setShowLinkInput(false);
      setLinkUrl("");
      return;
    }
    setShowLinkInput(true);
  };

  const applyLink = () => {
    if (!linkUrl) return;
    editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run();
    setShowLinkInput(false);
    setLinkUrl("");
  };

  const addImage = () => {
    const url = window.prompt("Image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto shadow-xl rounded-xl bg-gray-50 border border-gray-200">
      
      {/* Toolbar */}
      <div className="bg-white p-3 rounded-t-xl border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Basic marks */}
          <ToolbarButton isActive={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
            <span className="font-bold">B</span>
          </ToolbarButton>

          <ToolbarButton isActive={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
            <span className="italic">I</span>
          </ToolbarButton>

          <ToolbarButton isActive={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline">
            <span className="underline">U</span>
          </ToolbarButton>

          <ToolbarButton isActive={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strike">
            <s className="font-medium">S</s>
          </ToolbarButton>

          <ToolbarButton isActive={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()} title="Inline code">
            {"<>"}
          </ToolbarButton>

          <div className="mx-2 h-6 w-px bg-gray-200"></div>

          {/* Headings */}
          <ToolbarButton isActive={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="Heading 1">
            <span className="font-bold">H1</span>
          </ToolbarButton>
          <ToolbarButton isActive={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2">
            <span className="font-semibold">H2</span>
          </ToolbarButton>

          <div className="mx-2 h-6 w-px bg-gray-200"></div>

          {/* Lists */}
          <ToolbarButton isActive={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bulleted list">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16M14 6h6m-6 6h6m-6 6h6"></path></svg>
          </ToolbarButton>
          <ToolbarButton isActive={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered list">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18M3 6h18M3 18h18M18 6v.01M18 12v.01M18 18v.01"></path></svg>
          </ToolbarButton>

          <div className="mx-2 h-6 w-px bg-gray-200"></div>

          {/* Align */}
          <ToolbarButton isActive={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()} title="Align left">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6M13 12H6M13 19H6M17 5h4M17 12h4M17 19h4"></path></svg>
          </ToolbarButton>
          <ToolbarButton isActive={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()} title="Align center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6M13 12H6M13 19H6M18 5h-4M18 12h-4M18 19h-4"></path></svg>
          </ToolbarButton>
          <ToolbarButton isActive={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()} title="Align right">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5h6M11 12h8M13 19h6M5 5h4M5 12h4M5 19h4"></path></svg>
          </ToolbarButton>

          <div className="mx-2 h-6 w-px bg-gray-200"></div>

          {/* Link / Image / Undo / Redo */}
          <ToolbarButton isActive={editor.isActive("link")} onClick={toggleLink} title="Toggle link">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.56-5.186L18.802 6.5l-1.101 1.102a4 4 0 00-5.656 0l-4 4"></path></svg>
          </ToolbarButton>

          <ToolbarButton isActive={false} onClick={addImage} title="Insert image">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-2-2l2 2m0 0l-2 2m2-2h-8m8 0h4m-4 0v4m0-4V8m0 4h-4m4 0h-4"></path></svg>
          </ToolbarButton>
          
          <ToolbarButton isActive={false} onClick={() => editor.chain().focus().undo().run()} title="Undo" disabled={!editor.can().undo()}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h5M20 20v-5h-5M4 15v5h5M20 9v-5h-5M4 15h4M16 15h4M4 9h4M16 9h4M9 4V4"></path></svg>
          </ToolbarButton>
          <ToolbarButton isActive={false} onClick={() => editor.chain().focus().redo().run()} title="Redo" disabled={!editor.can().redo()}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h5M20 20v-5h-5M4 15v5h5M20 9v-5h-5M4 15h4M16 15h4M4 9h4M16 9h4M9 4V4"></path></svg>
          </ToolbarButton>

          {/* Link input (small inline) */}
          {showLinkInput && (
            <div className="flex items-center ml-4 gap-2 p-2 bg-indigo-50/50 rounded-lg">
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="Paste URL here..."
                className="px-3 py-1.5 border border-indigo-300 rounded-lg text-sm w-56 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
              />
              <button
                onClick={applyLink}
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
              >
                Apply
              </button>
              <button
                onClick={() => { setShowLinkInput(false); setLinkUrl(""); }}
                className="px-3 py-1.5 border border-gray-300 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Editor area */}
      <div className="p-6">
        <div className="bg-white min-h-[420px] rounded-b-xl focus-within:ring-2 focus-within:ring-indigo-500/50 transition">
          <EditorContent editor={editor} 
            className="prose max-w-none p-4 min-h-[420px] rounded-b-xl overflow-y-auto" 
            style={{ minHeight: "820px" }}
          />
        </div>
      </div>
    </div>
  );
}